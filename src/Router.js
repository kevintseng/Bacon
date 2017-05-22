import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import Storage from "react-native-storage";
import { Router, Scene, Actions } from "react-native-router-flux";
import { observer } from "mobx-react/native";
import { Icon } from "react-native-elements";
import * as Firebase from "firebase"; // eslint-disable-line
import Welcome from "./views/Welcome";
import MeetCute from "./views/MeetCute";
import Nearby from "./views/Nearby";
import Messages from "./views/Messages";
import LikesYou from "./views/LikesYou";
import Visitors from "./views/Visitors";
import Settings from "./views/Settings";
import Signin from "./views/Signin";
import SessionCheck from "./views/SessionCheck";
import { Profile } from "./views/Profile";
import Chat from "./views/Chat";
import Favorites from "./views/Favorites";
import { Signup1, Signup2, Signup3, Signup4 } from "./views/Signup";
import DrawerPanel from "./views/DrawerPanel";
import ErrorView from "./views/ErrorView";
import AppStore from "./store/AppStore";
import Forgot from "./views/Forgot";
import Account from "./views/Settings/Account";
import PushNotification from "./views/Settings/PushNotification";
import Question from "./views/Settings/Question";
import ChangePassword from "./views/Settings/ChangePassword";
import FeedBack from "./views/Settings/FeedBack";
import { FirebaseConfig } from "./Configs";

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
    style.marginTop = computedProps.hideNavBar ? 0 : 58;
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
  constructor() {
    super();
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

    const fire = Firebase.initializeApp(FirebaseConfig);

    // TODO: Find a way to tie Firestack and mobx store to achieve auto sync
    const store = new AppStore();

    this.state = {
      store,
      fire,
      localdb,
    };

    this.authListener(fire);
  }

  componentWillMount() {
    console.log("Router will mount.");
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
            if (!user.signupCompleted && !this.state.store.inSignupProcess) {
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
            this.state.store.setUser(user);
            console.log("Router: User has been set in appstore");
            this.setOnline(this.state.store.user.uid);
            console.log('frank V: ' + JSON.stringify(this.state.store.user));
            this.state.localdb
              .save({
                key: "user",
                data: this.state.store.user,
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
    const dbRef = this.state.fire.database().ref("/online/" + uid);
    dbRef.set({
      lastOnline: timestamp,
      location: "Taipei, Taiwan"
    });
  }

  setOffline(uid) {
    // const timestamp = Math.floor(Date.now() / 1000);
    this.state.fire.database().ref("/online/" + uid).remove();
  }

  signOut = () => {
    // Clear out appstore's user data
    if (this.state.store.user) {
      this.setOffline(this.state.store.user.uid);
    }

    // Sign out from firebase
    this.state.fire.auth().signOut();

    // Clear out local database's user data
    this.state.localdb.remove({
      key: "user"
    });
    this.setState({ user: null });

    // Render SessionCheck and redirect to signin view
    Actions.welcome({ type: "reset" });
  };

  render() {
    return (
      <Router
        fire={this.state.fire}
        store={this.state.store}
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
              <Scene
                key="meetcute"
                component={MeetCute}
                title="MeetCute"
                renderLeftButton={menuButton}
                hideTabBar
              />
              <Scene
                key="nearby"
                component={Nearby}
                title="Nearby"
                renderLeftButton={menuButton}
              />
              <Scene
                key="favorites"
                component={Favorites}
                title="Favorites"
                renderLeftButton={menuButton}
              />
              <Scene
                key="messages"
                component={Messages}
                title="Messages"
                renderLeftButton={menuButton}
                hideTabBar
              />
              <Scene
                key="likesyou"
                component={LikesYou}
                title="LikesYou"
                renderLeftButton={menuButton}
              />
              <Scene
                key="visitors"
                component={Visitors}
                title="Visitors"
                renderLeftButton={menuButton}
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
                key="profile"
                component={Profile}
                title="關於我"
                renderLeftButton={menuButton}
                hideTabBar
              />
              <Scene
                key="chat"
                component={Chat}
                title="Chat"
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
