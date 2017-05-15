//TODO: track current scene in store
import { observable, action } from 'mobx';
// import autobind from 'autobind-decorator';


// @autobind
class AppStore {
  @observable user;
  @observable inSignupProcess;

  constructor() {
    this.user = null;
    this.inSignupProcess = false;
  }

  @action setUser(user) {
    this.user = user;
    // console.log('Current User in AppStore: ' + user.uid);
  }

  @action setAvatar(uri) {
    this.user.photoURL = uri;
  }

  @action setChatStatus(firebase, status) {
    this.user.chatStatus = status;
    this.updateUserAtFirebase(firebase, 'chatStatus', status);
    console.log('Updated user chatStatus: ', this.user.chatStatus);
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

  @action setHobby(val) {
    this.user.hobby = val;
  }

  @action setBio(val) {
    this.user.bio = val;
  }

  @action setLang(val) {
    this.user.lang = val;
    console.log(this.user);
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

  updateUserAtFirebase(firebase, key, val) {
    try {
      const setFirebase = firebase.database().ref('users/' + this.user.uid + '/' + key);
      setFirebase.set(val);
    } catch(err) {
      console.log(err);
    }
  }
}

export default AppStore;
