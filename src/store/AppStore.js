import { observable, action, useStrict } from 'mobx';
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
    console.log('Current User in AppStore: ' + user.uid);
  }

  @action setAvatar(uri) {
    this.user.photoURL = uri;
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
