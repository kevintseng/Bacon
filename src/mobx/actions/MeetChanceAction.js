import { action } from 'mobx'
import GeoFire from 'geofire'
import { Actions } from 'react-native-router-flux'

//useStrict(true)
const MeetChanceAction = {
  
  initMeetChanceAll: action(function initMeetChanceAll(){
    this.loading = true
    this.setUser()
  }),

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
    this.firebase.database().ref('users/' + key).once('value').then(snap => { this.preyList.push(snap.val()) })
  }),

  onPressButton: action(function onPressButton(prey){
    this.setprey(prey)
    Actions.meetChanceSingle()
  }),

  onPressAboutMe: function onPressAboutMe(){
    Actions.aboutme()
  },

  handleLike: function handleLike(){
    Actions.chat({ uid: this.user.uid, name: this.user.displayName, avatarUrl: this.user.photoURL, birthday: this.user.birthday,  chatType: "visitor" })
  },

  getNext: function getNext(){
    const query = this.firebase.database().ref("collection")
    let conut = 0
    query.orderByChild("prey").equalTo(this.prey.uid).once("value",snap => { 
      //console.warn(snap.asArray().length)
      snap.forEach(() => { conut++ })
      if (conut > 0) {
        alert("已在您的收藏清單中")
      } else {
        this.firebase.database().ref("collection").push({wooer: this.user.uid , prey: this.prey.uid})  
      }
    })
    //this.firebase.database().ref("collection").push({wooer: this.user.uid , prey: this.prey.uid})
    //alert("已收藏")
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