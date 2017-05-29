import { action } from 'mobx'
import GeoFire from 'geofire'

//useStrict(true)
const MeetChanceAction = {

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
    geoQuery.on("key_entered", (key, location, distance) => {
      this.setPreyListByKey(key)
    })
    geoQuery.on("ready", () => {
      this.loading = false
    })
  }),

  setPreyListByKey: action(function setPreyListByKey(key){
    this.firebase.database().ref('users/' + key).once('value').then(snap => { this.preyList.push(snap.val()) })
  })
  
}

export default MeetChanceAction