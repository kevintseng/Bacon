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
import Vip from '../../app/views/AboutMe/Edit/Vip'
import Credit from '../../app/views/AboutMe/Edit/Credit'
// configs
import DefaultLanguages from '../../configs/DefaultLanguages'

useStrict(false)

class SubjectStore {
  @observable user
  @observable inSignupProcess
  @observable hobbyInput
  @observable onlyShowTherePhotos
  @observable interaction
  @observable showOnline
  @observable loading
  @observable deleteHobby
  @observable creditButton
  //@observable sampleArray

  constructor(firebase) {
    this.loading = false
    this.onlyShowTherePhotos = false
    this.interaction = false
    this.showOnline = false
    this.hobbyInput = null
    this.user = null
    this.inSignupProcess = false
    this.firebase = firebase
    this.deleteHobby = []
    this.creditButton = false
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

  @computed get photos(){
    return this.user.photos || []
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
  }

  @computed get vip(){
    return this.user.vip
  }

  @computed get bio(){
    return this.user.bio
  }

  @computed get langRaw(){
    return this.user.lang
  }

  @computed get lang(){
    //const test = { 國文: false, 英文: true}
    //console.warn(Object.keys(this.user))
    return Object.keys(this.user.lang).filter(k => this.user.lang[k]).join(',') || "MeetQ語"
  }

  @computed get hobby(){
    return this.user.hobby || []
  }  

  @computed get credit(){
    return this.user.credit || 0
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
    //alert('轉跳到升級頁面，施工中...')
    //this.store.upgradeMembership(this.firebase);
    Actions.AboutMeEdit({ content: <Vip/>, title: '會員升級', onRight: this.updateVip })
  }

  @action handleAddCredit() {
    Actions.AboutMeEdit({ content: <Credit/>, title: '儲值Q點', onRight: this.updateCredit })
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
    this.user.hobby = this.user.hobby || []
    if (val) {
      this.user.hobby.push(val)
    } else {
      this.user.hobby.push(this.hobbyInput)
    }
  }

  @action setDeleteHobby(val){
    if (val) {
      this.deleteHobby.push(val)
    }  
  }

  @action setVip() {
    this.user.vip = !this.user.vip
  }

  @action setCredit(){
    this.creditButton = !this.creditButton
  }

  @action setOnlyShowTherePhotos(){
    this.onlyShowTherePhotos = !this.onlyShowTherePhotos
  }

  @action setInteraction(){
    this.interaction = !this.interaction
  }

  @action setShowOnline(){
    this.showOnline = !this.showOnline
  }

  @action async initAboutMeShow(){
    this.loading = true
    const query = this.firebase.database().ref("/user_locations/")
    const geoFire = new GeoFire(query)
    geoFire.set(this.user.uid, [this.user.geocode.lat, this.user.geocode.lng ]).then(() => {
        console.log("Provided key has been added to GeoFire");
      }, (error) => {
        console.log("Error: " + error);
      })
    if (this.user.hobby == null) {
      this.user.hobby = ["Bacon"]
      await this.updateToFirebase('hobby',this.user.hobby)
    }
    if (this.user.lang == null) {
      this.user.lang = DefaultLanguages
      await this.updateToFirebase('lang',this.user.lang)
    } 
    if (this.user.bio == null) {
      this.user.bio = "您好，我是MeetQ新進會員"
      await this.updateToFirebase('bio',this.user.bio)
    }
    if (this.user.photoURL == null) {
      this.user.photoURL = "https://firebasestorage.googleapis.com/v0/b/kjyl-150415.appspot.com/o/addImage.png?alt=media&token=2f51bf34-eeb3-4963-8b79-00d4fadfbd7f"
      await this.updateToFirebase('photoURL',this.user.photoURL)
    }
    if (this.user.vip == null) {
      this.user.vip = false
      await this.updateToFirebase('vip',this.user.vip)
    }
    await this.firebase.database().ref("users/" + this.user.uid).once("value",(snap) => this.setUser(snap.val()) )
    this.loading = false
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
    const filterd_hobby = this.user.hobby.filter( ( el ) => {
      return this.deleteHobby.indexOf( el ) < 0;
    } )
    this.user.hobby = filterd_hobby
    this.updateToFirebase('hobby', this.user.hobby.slice())
    this.deleteHobby = []
    Actions.AboutMeShow({type: 'reset'})   
  }

  @action updateVip(){
    this.updateToFirebase('vip', this.user.vip)
    Actions.AboutMeShow({type: 'reset'}) 
  }

  @action updateCredit(){
    this.user.credit = this.user.credit || 0
    if (this.creditButton) {
      this.user.credit += 100
    }
    this.updateToFirebase('credit', this.user.credit)
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
      case 'aboutme':
        return () => Actions.aboutme({type: 'reset'})
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
