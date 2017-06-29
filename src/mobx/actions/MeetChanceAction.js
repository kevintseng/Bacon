import { action } from 'mobx'
import GeoFire from 'geofire'
import { Actions } from 'react-native-router-flux'

//useStrict(true)
const MeetChanceAction = {

  initMeetChanceAll: action(function initMeetChanceAll(){
    this.loading = true
    this.setUser()
  }),

  initMeetChanceSingle: action(function initMeetChanceSingle(){
    this.loading = true
    const query = this.firebase.database().ref("collection")
    query.orderByChild("prey").equalTo(this.prey.uid).once("value",snap => {
      if (snap.val() !== null) {
        this.is_coll = true
      } else {
        this.is_coll = false
      }
    })
    .then(() => {
    }).catch(() => {
     console.warn("Promise Rejected");
    })
    this.loading = false
  }),

  saveVistors: function saveVistors(){
    const query = this.firebase.database().ref("visitors")
    query.orderByChild("prey").equalTo(this.prey.uid).once("value",snap => {
      if (snap.val() == null) {
        this.firebase.database().ref("visitors").push({wooer: this.user.uid , prey: this.prey.uid})
      }
    })
  },

  fetchPreyListsByMeetChance: action(function fetchPreyListsByMeetChance(latitude, longitude){
    this.preyList = []
    const query = this.firebase.database().ref("/user_locations/")
    const geoFire = new GeoFire(query)
    const geoQuery = geoFire.query({
      center: [latitude, longitude],
      radius: 1000
    })
    geoQuery.on("key_entered", (key) => {
      if (!(key === this.user.uid)){
        this.setPreyListByKey(key)
      }
    })
    geoQuery.on("ready", () => {
      this.loading = false
    })
  }),

  setPreyListByKey: action(function setPreyListByKey(key){
    this.firebase.database().ref('users/' + key).once('value').then(snap => { this.preyList.push(snap.val()) }).catch(() =>{
     console.warn("Promise Rejected");
})
  }),

  onPressButton: action(function onPressButton(prey){
    this.setprey(prey)
    Actions.meetChanceSingle()
  }),

  onPressAboutMe: function onPressAboutMe(){
    Actions.aboutme()
  },

  handleLike: function handleLike(){
    Actions.chat({ uid: this.prey.uid, name: this.prey.displayName, avatarUrl: this.prey.photoURL, birthday: this.prey.birthday, chatStatus: this.prey.chatStatus })
  },

  getNext: function saveCollection(){
    const query = this.firebase.database().ref("collection")
    query.orderByChild("prey").equalTo(this.prey.uid).once("value",snap => {
      if (snap.val() == null) {
        this.firebase.database().ref("collection").push({wooer: this.user.uid , prey: this.prey.uid})
      }
    })
    this.is_coll = true
  },

  setprey: action(function setprey(prey){
    this.prey = prey
  }),

  setUser: action(function setUser(){
    this.user = this.store.user
  }),

  setAgeMin: action(function setAgeMin(age_min){
    this.age_min = age_min
  }),

  setAgeMax: action(function setAgeMax(age_max){
    this.age_max = age_max
  }),
}

export default MeetChanceAction
