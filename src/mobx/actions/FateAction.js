import { action } from 'mobx'
import { Actions } from 'react-native-router-flux'

//import GeoFire from 'geofire'

//useStrict(true)
const FateAction = {
  
  initPreyList: action(function initPreyList(){
    this.loading = true
    this.preyList = []
  }),
  
  fetchPreyListsByVisitors: action(async function fetchPreyListsByVisitors(){
    try{
      this.loading = true
      this.preyList = []
      const query = this.firebase.database().ref("Visitors")
      await query.orderByChild("prey").equalTo(this.store.user.uid).once("value", snap => (
         snap.forEach(childsnap => this.setPreyListByKey(childsnap.val().hunter))
        )
      ) //|| this.sleep(2000)
      this.loading = false
    } catch(err) {
      console.warn(err);
    }
  }),

  fetchPreyListsByGoodImpression: action(async function functionfetchPreyListsByGoodImpression(){
    this.loading = true
    this.preyList = []
    const query = this.firebase.database().ref("GoodImpression")
    await query.orderByChild("prey").equalTo(this.store.user.uid).once("value", snap => (
       snap.forEach(childsnap => this.setPreyListByKey(childsnap.val().hunter))
      )
    )
    this.loading = false
  }),

  fetchPreyListsByMate: action(function fetchPreyListsByMate(){
    this.loading = false
    //console.warn('Mate')
  }),

  fetchPreyListsByCollection: action(async function fetchPreyListsByCollection(){
    this.loading = true
    this.preyList = []
    const query = this.firebase.database().ref("Collection")
    await query.orderByChild("prey").equalTo(this.store.user.uid).once("value", snap => (
       snap.forEach(childsnap => this.setPreyListByKey(childsnap.val().hunter))
      )
    )
    this.loading = false
  }),

  setPreyListByKey: action(function setPreyListByKey(key){
    this.firebase.database().ref('users/' + key).once('value').then(snap => { this.preyList.push(snap.val()) })
  }),

  goToNearbySingle: action(function goToNearbySingle(prey){
    //const _index = this.preyList.indexOf(this.prey)
    this.loading = false
    //this.setprey(prey)
    Actions.nearbySingle()
  }),

  goToMeetCute: action(function goToMeetCute(prey){
    //const _index = this.preyList.indexOf(this.prey)
    this.loading = false
    //this.setprey(prey)
    Actions.meetcute()
  }),

  setprey: action(function setprey(prey){
    console.warn(this.prey)
    console.warn(prey)
    //this.prey = prey
  })
}

export default FateAction