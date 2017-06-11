import React from 'react'
import { observable, action, computed, useStrict } from 'mobx'
import GeoFire from 'geofire'
import { Actions } from 'react-native-router-flux'
// AboutMe
import NickBirthday from '../../app/views/AboutMe/Edit/NickBirthday'
import Location from '../../app/views/AboutMe/Edit/Location'
import Introduce from '../../app/views/AboutMe/Edit/Introduce'
import Language from '../../app/views/AboutMe/Edit/Language'
import Interests from '../../app/views/AboutMe/Edit/Interests'
// configs
import DefaultLanguages from '../../configs/DefaultLanguages'

useStrict(false)

class SubjectStore {
  @observable user;
  @observable inSignupProcess;
  @observable hobbyInput;
  //@observable sampleArray

  constructor(firebase) {
    this.hobbyInput = null
    this.user = null
    this.inSignupProcess = false
    this.firebase = firebase
  }
  //AboutMe

  @computed get emailVerified(){
    return this.user.emailVerified
  }

  @computed get photoVerified(){
    return this.user.photoVerified
  }

  @computed get photoURL(){
    return this.user.photoURL
    //return this.user.photoURL ? this.user.photoURL : 'hookup/src/images/addImage.png'
  }

  @computed get displayName(){
    return this.user.displayName
  }

  @computed get birthday(){
    return this.user.birthday
  }

  @computed get city(){
    return this.user.city
    //return typeof(this.user.city) === 'string' ? this.user.city : ''
  }

  @computed get vip(){
    return this.user.vip
  }

  @computed get bio(){
    return this.user.bio
  }

  @computed get langRaw(){
    return this.user.lang
    //return this.user.lang ? this.user.lang : this.user.lang = DefaultLanguages
  }

  @computed get lang(){
    return Object.keys(this.user.lang).filter(k => this.user.lang[k]).join(',') || "MeetQ語"
    //return this.user.lang ? Object.keys(this.user.lang).filter(k => this.user.lang[k]).join(',') : ""
  }

  @computed get hobby(){
    return this.user.hobby
    //return this.user.hobby ? this.user.hobby : []
  }  

  //@computed get hobbyInput(){
  //  return this.hobbyInput
  //}

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
  // actions AboutMe

  @action updateHobbyInput(val){
    this.hobbyInput = val
  }

  @action onPressMeetChance(){
    Actions.AboutMe()
    //console.warn("Go to AboutMe")
  }

  @action onpressDisplayName(){
    Actions.AboutMeEdit({ content: <NickBirthday/>, title: '暱稱生日', onRight: this.updateNickBirthday })
  }

  @action onpressLocation(){
    Actions.AboutMeEdit({ content: <Location/>, title: '所在位置', onRight: this.updateCity })
  }

  @action onpressIntroduce() {
    Actions.AboutMeEdit({ content: <Introduce/>, title: '自我介紹', onRight: this.updateBio })
  }

  @action onpressLanguage() {
    Actions.AboutMeEdit({ content: <Language/>, title: '語言能力', onRight: this.updateLang })
  }

  @action onpressInterests() {
    Actions.AboutMeEdit({ content: <Interests/>, title: '興趣愛好', onRight: this.updateHobby })
  }

  @action handleUpgrade() {
    alert('轉跳到升級頁面，施工中...')
    //this.store.upgradeMembership(this.firebase);
  }

  @action handleAddCredit() {
    alert('轉跳到Q點儲值頁面，施工中...')
  }

  @action handleSendVerifyEmail() {
    this.firebase.auth().currentUser.sendEmailVerification().then(() => {
      alert("認證信已寄出")
      console.log('Email verification request sent')
    }, error => {
      console.log(error)
    })
  }

  @action handleVerifyPhoto() {
    alert('轉跳到相片認證頁面，施工中...');
  }

  @action setDisplayName(val){
    if (val.length > 0 ) {
      this.user.displayName = val
    }
  }

  @action setBirthday(val){
    if (val) {
      this.user.birthday = val
    }    
  }

  @action setCity(data){
    if (data.description) {
      this.user.city = data.description
    }
  } 

  @action setBio(val){
    if (val) {
      this.user.bio = val
    }  
  } 

  @action setLang(val) {
    this.user.lang[val] = !this.user.lang[val]
  }

  @action setHobby(val) {
    if (val) {
      this.user.hobby.push(val)
    } else {
      this.user.hobby.push(this.hobbyInput)
    }
  }

  @action initAboutMeShow(){
    if (this.user.hobby == null) {
      this.user.hobby = ["MeetQ"]
      this.updateToFirebase('hobby',this.user.hobby)
    }
    if (this.user.lang == null) {
      this.user.lang = DefaultLanguages
      this.updateToFirebase('lang',this.user.lang)
    } 
    if (this.user.bio == null) {
      this.user.bio = "您好，我是MeetQ新進會員"
      this.updateToFirebase('bio',this.user.bio)
    }
    if (this.user.photoURL == null) {
      this.user.photoURL = "https://firebasestorage.googleapis.com/v0/b/kjyl-150415.appspot.com/o/addImage.png?alt=media&token=2f51bf34-eeb3-4963-8b79-00d4fadfbd7f"
      this.updateToFirebase('photoURL',this.user.photoURL)
    }
    const query = this.firebase.database().ref("/user_locations/")
    const geoFire = new GeoFire(query)
    //geoFire.setLocation(this.user.id, new GeoLocation(this.user.geocode.lat, this.user.geocode.lng))
    //this.user.meetCuteHistory = [this.user.uid]
    //this.updateToFirebase("meetCuteHistory",[this.user.uid])
    geoFire.set(this.user.uid, [this.user.geocode.lat, this.user.geocode.lng ]).then(() => {
        console.log("Provided key has been added to GeoFire");
      }, (error) => {
        console.log("Error: " + error);
      })
  }

  @action updateNickBirthday(){
    this.updateToFirebase('displayName', this.user.displayName)
    this.updateToFirebase('birthday', this.user.birthday)
    Actions.AboutMeShow({type: 'reset'})    
  }

  @action updateCity(){
    this.updateToFirebase('city', this.user.city)
    Actions.AboutMeShow({type: 'reset'})    
  }

  @action updateBio(){
    this.updateToFirebase('bio', this.user.bio)
    Actions.AboutMeShow({type: 'reset'})    
  }

  @action updateLang(){
    //console.log(this.user.lang)
    this.updateToFirebase('lang', this.user.lang)
    Actions.AboutMeShow({type: 'reset'})     
  }

  @action updateHobby(){
    this.hobbyInput = null
    this.updateToFirebase('hobby', this.user.hobby.slice())
    Actions.AboutMeShow({type: 'reset'})   
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
    //console.warn(key)
    switch (key) {
      case 'AboutMe':
        return () => Actions.AboutMe({type: 'reset'})
      case 'meetcute':
        return () => Actions.meetcute({type: 'reset'})
      case 'meetchance':
        return () => Actions.meetchance({type: 'reset'})
      case 'messages':
        return () => Actions.messages({type: 'reset'})
      case 'fate':
        return () => Actions.fate({type: 'reset'})
      case 'settings':
        return () => Actions.settings_wrapper({type: 'reset'})
      //default:
        //Actions.refresh({ key: 'drawer', open: false })
      // Go to profile view only when user data is loaded.
        //if(this.store.user != null && this.store.user != '') {
        //  return () => Actions.aboutMeRoutes({type: 'reset'});
        //}
        //return () => {};
    }
  }

  //updateToFirebase2(key, val){
  //  this.firebase.database().ref('users/' + this.user.uid + '/' + key).push(val)
  //}

  updateToFirebase(key, val){
    this.firebase.database().ref('users/' + this.user.uid + '/' + key).set(val)
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

export default SubjectStore
