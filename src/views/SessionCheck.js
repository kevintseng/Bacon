import React, { Component } from 'react';
import {
    View,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';
import { observer } from 'mobx-react/native';

const { width, height } = Dimensions.get('window');

@observer
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.firebase = this.props.fire;
    this.store = this.props.store;
    this.db = this.props.localdb;
    this.user = this.props.user;
    this.state = {
      text: '',
    };
  }

  componentWillMount() {
    Reactotron.log('Rendering SessionCheck');
    // this.setUserToStore();
  }

  componentDidMount() {
    Reactotron.log('SessionCheck rendered');
    this.getUser();
  }

  getUser = () => {
    this.db.load({
      key: 'user',
      autoSync: false,
      syncInBackground: false,
    }).then(ret => {
      Reactotron.log('localdb: ');
      // Reactotron.log(ret);
      if(ret) {
        this.store.setUser(ret);
        Actions.drawer();
      } else {
        Reactotron.log('SessionCheck: Rendering signin');
        Actions.signin();
      }
    }).catch(err => {
      Reactotron.log(err.message);
      switch (err.name) {
        case 'NotFoundError':
          Reactotron.log('SessionCheck: Data not found, rendering signin');
          Actions.signin();
          break;
        case 'ExpiredError':
          Reactotron.log('SessionCheck: Data expired, rendering signin');
          Actions.signin();
          break;
        default:
          Reactotron.log(err.name);
          Actions.signin();
      }
    })
  }

  // setUserToStore = () => {
  //   let user;
  //   this.firebase.auth().onAuthStateChanged(data => {
  //     if(data) {
  //       Reactotron.log('Router: Got user data from this.firebase auth api:');
  //       Reactotron.log(data);
  //       const dbRef = this.firebase.database().ref('/users/' + data.uid);
  //       user = {
  //         uid: data.uid,
  //         displayName: data.displayName,
  //         photoURL: data.photoURL,
  //         email: data.email,
  //         emailVerified: data.emailVerified,
  //         isAnonymous: data.isAnonymous,
  //         providerId: data.providerId,
  //       };
  //
  //       dbRef.once('value').then(snap => {
  //         Object.assign(user, user, snap.val());
  //
  //         // Block incompleted signup users to login
  //         if(!user.signupCompleted && !this.store.inSignupProcess) {
  //           this.signOut();
  //           Reactotron.log('Router: Incomplete sign up.');
  //           return;
  //         }
  //
  //         Reactotron.log(user);
  //         this.store.setUser(user);
  //         Reactotron.log('Router: User has been set in this.store');
  //         Reactotron.log(this.store);
  //         this.setOnline(this.store.user.uid);
  //         this.db.save({
  //           key: 'user',
  //           rawData: this.store.user,
  //           expires: 1000 * 3600 * 24 * 30, // expires after 30 days
  //         }).catch(err => {
  //           Reactotron.log('Router: Saving data to local db failed.');
  //           Reactotron.log(err);
  //         });
  //       }).catch(err => {
  //         Reactotron.error('Router: Get user data failed.');
  //         Reactotron.error(err);
  //       });
  //
  //     } else {
  //       this.signOut();
  //       Reactotron.log('Router: No valid user session.');
  //     }
  //   });
  // }
  //
  // setOnline(uid) {
  //   const timestamp = Math.floor(Date.now() / 1000);
  //   const dbRef = this.firebase.database().ref('/connections/' + uid);
  //   dbRef.set({
  //     online: true,
  //     lastOnline: timestamp,
  //     location: 'Taipei, Taiwan',
  //   });
  // }
  //
  // setOffline(uid) {
  //   const timestamp = Math.floor(Date.now() / 1000);
  //   const dbRef = this.firebase.database().ref('/connections/' + uid);
  //   dbRef.update({
  //     online: false,
  //     lastOnline: timestamp,
  //   });
  // }
  //
  // signOut = () => {
  //   // Clear out this.store's user data
  //   if(this.store.user) {
  //     this.setOffline(this.store.user.uid);
  //   }
  //
  //   // Sign out from this.firebase
  //   this.firebase.auth().signOut();
  //
  //   // Clear out local database's user data
  //   this.db.remove({
  //     key: 'user',
  //   });
  //
  //   // Render SessionCheck and redirect to signin view
  //   Actions.signin({type: 'reset'});
  // };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width, height }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
}
