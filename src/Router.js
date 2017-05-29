import React, { Component } from "react";
import { AsyncStorage, AppState } from "react-native";
import Storage from "react-native-storage";
import { Router, Scene, Actions } from "react-native-router-flux";
import { observer, Provider } from "mobx-react/native";
import { Icon } from "react-native-elements";
import Welcome from "./views/Welcome";
import Messages from "./views/MessageCenter/Messages";
import Settings from "./views/Settings";
import Signin from "./views/Signin";
import SessionCheck from "./views/SessionCheck";
import Chat from "./views/MessageCenter/Chat";
import { Signup1, Signup2, Signup3, Signup4 } from "./views/Signup";
import DrawerPanel from "./views/DrawerPanel";
import ErrorView from "./views/ErrorView";
import Forgot from "./views/Forgot";
import Account from "./views/Settings/Account";
import PushNotification from "./views/Settings/PushNotification";
import Question from "./views/Settings/Question";
import ChangePassword from "./views/Settings/ChangePassword";
import FeedBack from "./views/Settings/FeedBack";
// hocs
import ContainerWithProvider from "./hocs/ContainerWithProvider"
// containers
import MeetCuteContainer from "./containers/MeetCuteContainer"
import MeetChanceContainer from "./containers/MeetChanceContainer"
import FateContainer from "./containers/FateContainer"

// define this based on the styles/dimensions you use
const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: "#fff",
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 54;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

const menuButton = () => (
  <Icon
    name="menu"
    color="#000"
    onPress={() => Actions.refresh({ key: "drawer", open: value => !value })}
  />
);

@observer
export default class RouterComponent extends Component {
  constructor(props) {
    super(props);
    const localdb = new Storage({
      // maximum capacity, default 1000
      size: 1000,

      // Use AsyncStorage for RN, or window.localStorage for web.
      // If not set, data would be lost after reload.
      storageBackend: AsyncStorage,

      // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
      // can be null, which means never expire.
      defaultExpires: 1000 * 3600 * 24,

      // cache data in the memory. default is true.
      enableCache: true,

      // if data was not found in storage or expired,
      // the corresponding sync method will be invoked and return
      // the latest data.
      sync: {
        // we'll talk about the details later.
      }
    });
    global.storage = localdb;
    // TODO: Find a way to tie Firestack and mobx store to achieve auto sync
    this.state = {
      localdb,
      appState: AppState.currentState,
    };

    this.authListener(this.props.fire)
  }

  authListener = (fire) => {
    console.log("Initialize authListener .");
    let user;
    fire.auth().onAuthStateChanged(data => {
      if (data) {
        console.log("Router: Got user data from firebase auth api:");
        console.log(data);
        const dbRef = fire.database().ref("/users/" + data.uid);
        user = {
          uid: data.uid,
          displayName: data.displayName,
          photoURL: data.photoURL,
          email: data.email,
          emailVerified: data.emailVerified,
          isAnonymous: data.isAnonymous,
          providerId: data.providerId
        };

        dbRef
          .once("value")
          .then(snap => {
            Object.assign(user, user, snap.val());

            // Block incompleted signup users to login
            if (!user.signupCompleted && !this.props.self.inSignupProcess) {
              const _user = fire.auth().currentUser;
              // In case the user dropped out during sign-up and want to sign-up again
              // TODO: Should also check firebase db to see if there's any other related data needs to be removed too
              if (_user) {
                _user.delete().then(
                  () => {},
                  _err => {
                    console.error(_err);
                  }
                );
              }
              this.signOut();
              console.log("Router: Incomplete sign up.");
              return;
            }

            console.log({ CombinedUserProfile: user });
            this.props.self.setUser(user);
            console.log("Router: User has been set in appstore");
            this.setOnline(this.props.self.user.uid);
            AppState.addEventListener('change', this.handleAppStateChange);
            this.state.localdb
              .save({
                key: "user",
                data: this.props.self.user,
                expires: 1000 * 3600 * 24 * 30 // expires after 30 days
              })
              .catch(err => {
                console.log("Router: Saving data to local db failed.");
                console.log(err);
              });
          })
          .catch(err => {
            console.error("Router: Get user data failed.");
            console.error(err);
          });
      } else {
        this.signOut();
        console.log("Router: No valid user session.");
      }
    });
  }

  setOnline(uid) {
    const timestamp = Math.floor(Date.now() / 1000);
    const dbRef = this.props.fire.database().ref("/online/" + uid);
    dbRef.set({
      lastOnline: timestamp,
      location: "Taipei, Taiwan"
    });
  }

  handleAppStateChange = nextAppState => {
    console.log('AppState listner is on');
    if(this.state.appState.match('active') && (nextAppState === 'inactive' || nextAppState === 'background')) {
      console.log('App is becoming inactive.');
      this.setOffline(this.props.self.user.uid);
    }

    if(nextAppState === 'active') {
      console.log('App is active');
      this.setOnline(this.props.self.user.uid);
    }

    this.setState({appState: nextAppState});
  }

  setOffline(uid) {
    // const timestamp = Math.floor(Date.now() / 1000);
    this.props.fire.database().ref("/online/" + uid).remove();
  }

  signOut = () => {
    // Clear out appstore's user data
    if (this.props.self.user) {
      this.setOffline(this.props.self.user.uid);
    }

    // Sign out from firebase
    this.props.fire.auth().signOut();

    // Clear out local database's user data
    this.state.localdb.remove({
      key: "user"
    });
    this.setState({ user: null });

    // Render SessionCheck and redirect to signin view
    Actions.welcome({ type: "reset" });
  };

  render() {

    const MeetCuteScene = ContainerWithProvider(MeetCuteContainer,{ HunterStore: this.props.self, PreyStore: this.props.meetCute })
    const MeetChanceScene = ContainerWithProvider(MeetChanceContainer,{ HunterStore: this.props.self, PreyStore: this.props.meetChance })
    const FateScene = ContainerWithProvider(FateContainer,{ HunterStore: this.props.self, PreyStore: this.props.fate })

    return (
      <Router
        fire={this.props.fire}
        store={this.props.self}
        localdb={this.state.localdb}
        getSceneStyle={getSceneStyle}
      >

        <Scene key="root" hideNavBar>
          <Scene key="sessioncheck" component={SessionCheck} />
          <Scene key="welcome" component={Welcome} hideTabBar/>
          <Scene key="signin" component={Signin} hideNavBar hideTabBar/>
          <Scene
            key="forgot"
            component={Forgot}
            title="申請密碼重設"
            hideNavBar={false}
          />
          <Scene key="signup" hideNavBar hideTabBar>
            <Scene key="signup1" component={Signup1} />
            <Scene key="signup2" component={Signup2} />
            <Scene key="signup3" component={Signup3} />
            <Scene key="signup4" component={Signup4} />
          </Scene>

          <Scene key="drawer" component={DrawerPanel} open={false}>
            <Scene key="main" hideTabBar hideNavBar={false}>
              {require("./views/AboutMe/Routes")}
              <Scene //邂逅
                key="meetcute"
                component={MeetCuteScene}
                title="邂逅"
                renderLeftButton={menuButton}
                hideTabBar
              />
              <Scene //巧遇
                key="nearby"
                component={MeetChanceScene}
                title="巧遇"
                renderLeftButton={menuButton}
              />
              <Scene //訊息
                key="messages"
                component={Messages}
                title='訊息中心'
                renderLeftButton={menuButton}
                hideTabBar
                hideNavBar
              />
              <Scene //緣分
                key="fate"
                component={FateScene}
                title='緣分'
                renderLeftButton={menuButton}
                hideTabBar
              />
              <Scene
                key="settings"
                component={Settings}
                title="Settings"
                renderLeftButton={menuButton}
              />
              <Scene key="account" component={Account} title="Account" />
              <Scene key="settings_wrapper">
                <Scene
                  key="settings"
                  component={Settings}
                  title="Settings"
                  renderLeftButton={menuButton}
                />
                <Scene key="account" component={Account} title="Account" />
                <Scene
                  key="pushnotification"
                  component={PushNotification}
                  title="PushNotification"
                />
                <Scene key="question" component={Question} title="Question" />
                <Scene
                  key="changepassword"
                  component={ChangePassword}
                  title="ChangePassword"
                />
                <Scene key="feedback" component={FeedBack} title="Feedback" />
              </Scene>
              <Scene
                key="chat"
                component={Chat}
                title="Chat"
                hideNavBar={false}
                hideTabBar
              />
            </Scene>
          </Scene>
          <Scene key="errorview" component={ErrorView} />

        </Scene>
      </Router>
    );
  }
}
