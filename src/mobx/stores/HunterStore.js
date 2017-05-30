import { observable, action, computed, useStrict } from 'mobx'
import { Actions } from 'react-native-router-flux'
// import autobind from 'autobind-decorator';
useStrict(true)

// @autobind

class HunterStore {
  @observable user;
  @observable inSignupProcess;

  constructor(firebase) {
    this.user = null;
    this.inSignupProcess = false;
    this.firebase = firebase
  }

  // report
  @computed get analysis(){
    return this.user.analysis ? this.user.analysis : { charm: "0", popularity: "0", likeness: "0", friendliness: "0", activity: "0" }
  }

  @computed get charm(){
    return this.user.analysis.charm ? this.user.analysis.charm : 0
  }

  @computed get popularity(){
    return this.user.analysis.popularity ? this.user.analysis.popularity : 0
  }

  @computed get likeness(){
    return this.user.analysis.likeness ? this.user.analysis.likeness : 0
  }

  @computed get friendliness(){
    return this.user.analysis.friendliness ? this.user.analysis.friendliness : 0
  }

  @computed get activity(){
    return this.user.analysis.activity ? this.user.analysis.activity : 0
  }

  // actions
  @action setUser(user) {
    this.user = user;
    console.log('Current User in AppStore: ' + user.uid);
  }

  @action setAvatar(uri) {
    this.user.photoURL = uri;
  }

  @action addNewConv(withUid, convKey) {
    // console.log('AppStore/addNewConv params: withUid: ' + withUid + ', convKey: ' + convKey);
    //Add new conversation to AppStore user profile
    const data = { convKey };
    this.user.conversations = {};
    this.user.conversations[withUid] = data;

    //Add new conversation to my user profile on firebase
    const addToMyConvList = this.firebase.database().ref("users/" + this.user.uid + "/conversations").child(withUid);
    addToMyConvList.set(data);

    //Add new conversation to the other person's user profile on firebase
    const addToOtherConvList = this.firebase.database().ref("users/" + withUid + "/conversations").child(this.user.uid);
    addToOtherConvList.set(data);
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

  @action setChatStatus(val) {
    this.user.chatStatus = val;
    this.updateToFirebase('chatStatus', val);
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
      case 'aboutMeRoutes':
        return () => Actions.aboutMeRoutes({type: 'reset'})
      case 'meetcute':
        return () => Actions.meetcute({type: 'reset'})
      case 'nearby':
        return () => Actions.nearby({type: 'reset'})
      case 'messages':
        return () => Actions.messages({type: 'reset'})
      case 'fate':
        return () => Actions.fate({type: 'reset'})
      case 'settings':
        return () => Actions.settings_wrapper({type: 'reset'})
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

export default HunterStore