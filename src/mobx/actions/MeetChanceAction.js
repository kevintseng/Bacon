import { action } from 'mobx'
import GeoFire from 'geofire'
import { Actions } from 'react-native-router-flux'

//useStrict(true)
const MeetChanceAction = {
  
  initMeetChanceAll: action(function initMeetChanceAll(){
    this.loading = true
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
      this.setPreyListByKey(key)
    })
    geoQuery.on("ready", () => {
      this.loading = false
    })
  }),

  setPreyListByKey: action(function setPreyListByKey(key){
    this.firebase.database().ref('users/' + key).once('value').then(snap => { this.preyList.push(snap.val()) })
  }),

  setprey: action(function setprey(prey){
    this.prey = prey
  }),

  onPressButton: action(function onPressButton(prey){
    this.setprey(prey)
    Actions.nearbySingle()
  }),

  handleLike: action(function handleLike(){
    console.warn(this)
  }),

  getNext: action(function handleLike(){
    console.warn(this)
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