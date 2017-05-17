
import { observable, action, useStrict, autorun } from 'mobx'
import { Actions } from 'react-native-router-flux'
// import autobind from 'autobind-decorator';
useStrict(true)

// @autobind

class AppStore {
  @observable user;
  @observable inSignupProcess;

  constructor(firebase) {
    this.user = null;
    this.inSignupProcess = false;
    this.firebase = firebase
  }

  @action setUser(user) {
    this.user = user;
    // console.log('Current User in AppStore: ' + user.uid);
  }

  @action setAvatar(uri) {
    this.user.photoURL = uri;
  }

  getChatStatus() {
    this.firebase.database().ref('users/' + this.user.uid + '/chatStatus').once('value', snap => {
      if(snap.exists()) {
        return snap.val();
      }
      return null;
    }, err => {
      console.log('AppStore/getChatStatus error: ' +  err);
    });
  }

  @action updateConv(firebase, cid, key, value) {
    const ref = firebase.database().ref('conversations/' + cid + '/' + this.user.uid);
    ref.update({key: value});
  }

  @action signOut() {
    this.user = '';
  }

  @action setView(sceneKey) {
    this.view = sceneKey;
  }

  @action setInSignupProcess(val) {
    this.inSignupProcess = val;
  }

  @action setDisplayName = (val) => {
    this.user.displayName = val
    this.updateToFirebase('displayName', val);
  }

  @action setCity = (val) => {
    this.user.city = val
    this.updateToFirebase('city', val);
  }

  @action setBio = (val) => {
    this.user.bio = val
    this.updateToFirebase('bio', val);
  }

  @action setLang = (val) => {
    this.user.lang = val
    this.updateToFirebase('lang', val)
    //console.log(this.user);
  }

  @action setHobby = (val) => {
    this.user.hobby = val
    this.updateToFirebase('hobby', val)
  }

  @action upgradeMembership(firebase) {
    if(!this.user.vip) {
      this.user.vip = 'vip1';
      this.updateUserAtFirebase(firebase, 'vip', 'vip1');
    } else if(this.user.vip === 'vip1') {
      this.updateUserAtFirebase(firebase, 'vip', 'vip2');
      this.user.vip = 'vip2';
    }

  }

  @action setPhotos(gallery) {
    this.user.photos = gallery;
  }

  @action refreshDrawer = () => {
    Actions.refresh({ key: 'drawer', open: false })
  }

  @action handleOnPress(key) {
    switch (key) {
      case 'meetcute':
        return () => Actions.meetcute({type: 'reset'})
      case 'nearby':
        return () => Actions.nearby({type: 'reset'})
      case 'favorites':
        return () => Actions.favorites({type: 'reset'})
      case 'visitors':
        return () => Actions.visitors({type: 'reset'})
      case 'likesyou':
        return () => Actions.likesyou({type: 'reset'})
      case 'messages':
        return () => Actions.messages({type: 'reset'})
      case 'settings':
        return () => Actions.settings_wrapper({type: 'reset'})
      case 'aboutMeRoutes':
        return () => Actions.aboutMeRoutes({type: 'reset'})
      // Go to profile view only when user data is loaded.
        //if(this.store.user != null && this.store.user != '') {
        //  return () => Actions.aboutMeRoutes({type: 'reset'});
        //}
        //return () => {};
    }
  }

  updateToFirebase(key, val){
    const setFirebase = this.firebase.database().ref('users/' + this.user.uid + '/' + key);
    setFirebase.set(val);
  }

  updateUserAtFirebase(firebase, key, val){
    try {
      const setFirebase = firebase.database().ref('users/' + this.user.uid + '/' + key);
      setFirebase.set(val);
    } catch(err) {
      console.log(err);
    }
  }
}

export default AppStore;
