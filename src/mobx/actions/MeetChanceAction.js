import { action } from 'mobx'
import GeoFire from 'geofire'
import { Actions } from 'react-native-router-flux'

//useStrict(true)
const MeetChanceAction = {

  setUser: action(function setUser(){
    this.user = this.store.user
  }),
  
  initPreyList: action(function initPreyList(){
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
    //  console.warn(this.preyList.length)
      //this.setprey(this.preyList[0])
    })
    //console.warn(this.preyList.length)
    //console.warn(this.preyList.length)
  }),

  setPreyListByKey: action(function setPreyListByKey(key){
    this.firebase.database().ref('users/' + key).once('value').then(snap => { this.preyList.push(snap.val()) })
  }),

  setprey: action(function setprey(prey){
    this.prey = prey
  }),

  onPressButton: action(function onPressButton(prey){
    //const _index = this.preyList.indexOf(this.prey)
    this.setprey(prey)
    Actions.nearbySingle()
  }),

  handleLike: action(function handleLike(){
    console.warn(this)
  }),

  getNext: action(function handleLike(){
    console.warn(this)
  }) 
}

export default MeetChanceAction