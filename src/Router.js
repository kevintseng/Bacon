import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Icon } from 'react-native-elements'
import * as Firebase from 'firebase';  // eslint-disable-line
import Reactotron from 'reactotron-react-native';
import MeetCute from './views/MeetCute';
import Nearby from './views/Nearby';
import Messages from './views/Messages';
import LikesYou from './views/LikesYou';
import Visitors from './views/Visitors';
import Settings from './views/Settings';
import Signin from './views/Signin';
import SessionCheck from './views/SessionCheck';
import { Profile } from './views/Profile';
import Favorites from './views/Favorites';
import { Signup1, Signup2, Signup3, Signup4 } from './views/Signup';
import DrawerPanel from './views/DrawerPanel';
import ErrorView from './views/ErrorView';
import AppStore from './store/AppStore';
import Forgot from './views/Forgot';
import Account from './views/Settings/Account';
import PushNotification from './views/Settings/PushNotification';
import Question from './views/Settings/Question';
import ChangePassword from './views/Settings/ChangePassword';
import Reaction from './views/Settings/Reaction';
import { FirebaseConfig } from './Configs';

// define this based on the styles/dimensions you use
const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 58;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

const storage = new Storage({
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
    sync : {
        // we'll talk about the details later.
    }
});

const firebase = Firebase.initializeApp(FirebaseConfig);

// TODO: Find a way to tie Firestack and mobx store to achieve auto sync
const appstore = new AppStore();

const menuButton = () => (
  <Icon
    name='menu'
    color='#000'
    onPress={() => Actions.refresh({key: 'drawer', open: value => !value }) }
  />
);

@observer
export default class RouterComponent extends Component {
  componentDidMount() {
    let user;
    firebase.auth().onAuthStateChanged(data => {
      if(data) {
        Reactotron.log('Router: Got user data from firebase auth api:');
        Reactotron.log(data);
        const dbRef = firebase.database().ref('/users/' + data.uid);
        user = {
          uid: data.uid,
          displayName: data.displayName,
          photoURL: data.photoURL,
          email: data.email,
          emailVerified: data.emailVerified,
          isAnonymous: data.isAnonymous,
          providerId: data.providerId,
        };

        dbRef.once('value').then(snap => {
          Object.assign(user, user, snap.val());

          // Block incompleted signup users to login
          if(!user.signupCompleted && !appstore.inSignupProcess) {
            this.signOut();
            Reactotron.log('Router: Incomplete sign up.');
            return;
          }

          Reactotron.log(user);
          appstore.setUser(user);
          Reactotron.log('Router: User has been set in appstore');
          Reactotron.log(appstore);
          this.setOnline(appstore.user.uid);
          storage.save({
            key: 'user',
            rawData: appstore.user,
            expires: 1000 * 3600 * 24 * 30, // expires after 30 days
          }).catch(err => {
            Reactotron.log('Router: Saving data to local db failed.');
            Reactotron.log(err);
          });
        }).catch(err => {
          Reactotron.error('Router: Get user data failed.');
          Reactotron.error(err);
        });

      } else {
        this.signOut();
        Reactotron.log('Router: No valid user session.');
      }
    });
  }

  setOnline(uid) {
    const timestamp = Math.floor(Date.now() / 1000);
    const dbRef = firebase.database().ref('/connections/' + uid);
    dbRef.set({
      online: true,
      lastOnline: timestamp,
      location: 'Taipei, Taiwan',
    });
  }

  setOffline(uid) {
    const timestamp = Math.floor(Date.now() / 1000);
    const dbRef = firebase.database().ref('/connections/' + uid);
    dbRef.update({
      online: false,
      lastOnline: timestamp,
    });
  }

  signOut = () => {
    // Clear out appstore's user data
    if(appstore.user) {
      this.setOffline(appstore.user.uid);
    }

    // Sign out from firebase
    firebase.auth().signOut();

    // Clear out local database's user data
    storage.remove({
      key: 'user',
    });

    // Render SessionCheck and redirect to signin view
    Actions.signin({type: 'reset'});
  };

  render() {
    return(
      <Router
        fire={firebase}
        store={appstore}
        localdb={storage}
        getSceneStyle={getSceneStyle} >
          <Scene key='root' hideNavBar>

            <Scene key='sessioncheck' component={SessionCheck} />
            <Scene key='signin' component={Signin} />
            <Scene key='forgot' component={Forgot} title='申請密碼重設' hideNavBar={false} />
            <Scene key='signup' hideNavBar>
              <Scene
                key='signup1'
                component={Signup1} />
              <Scene
                key='signup2'
                component={Signup2} />
              <Scene
                key='signup3'
                component={Signup3} />
              <Scene
                key='signup4'
                component={Signup4} />
            </Scene>
            <Scene key='drawer' component={DrawerPanel} open={false} >
              <Scene key='main' tabs hideNavBar={false}>
                <Scene key='meetcute'
                  component={MeetCute}
                  title='MeetCute'
                  renderLeftButton={menuButton}
                  />
                <Scene key='nearby'
                  component={Nearby}
                  title='Nearby'
                  renderLeftButton={menuButton}
                  />
                <Scene key='favorites'
                  component={Favorites}
                  title='Favorites'
                  renderLeftButton={menuButton} />
                <Scene key='messages'
                  component={Messages}
                  title='Messages'
                  renderLeftButton={menuButton} />
                <Scene key='likesyou'
                  component={LikesYou}
                  title='LikesYou'
                  renderLeftButton={menuButton} />
                <Scene key='visitors'
                  component={Visitors}
                  title='Visitors'
                  renderLeftButton={menuButton} />
                  <Scene key='settings'
                    component={Settings}
                    title='Settings'
                    renderLeftButton={menuButton}/>
                    <Scene key='account'
                      component={Account}
                      title='Account'
                      />
                  <Scene key='settings_wrapper'>
                    <Scene key='settings'
                      component={Settings}
                      title='Settings'
                      renderLeftButton={menuButton}/>
                    <Scene key='account'
                      component={Account}
                      title='Account'
                      />
                    <Scene key='pushnotification'
                      component={PushNotification}
                      title='PushNotification'
                      />
                    <Scene key='question'
                      component={Question}
                      title='Question'
                      />
                    <Scene key='changepassword'
                      component={ChangePassword}
                      title='ChangePassword'
                    />
                    <Scene key='reaction'
                      component={Reaction}
                      title='Reaction'
                    />
                  </Scene>

                <Scene key='profile'
                  component={Profile}
                  title='關於我'
                  renderLeftButton={menuButton}
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
