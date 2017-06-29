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
      const query = this.firebase.database().ref("visitors")
      await query.orderByChild("prey").equalTo(this.store.user.uid).once("value", snap => (
         snap.forEach(childsnap => this.setPreyListByKey(childsnap.val().wooer))
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
    const query = this.firebase.database().ref("goodImpression")
    await query.orderByChild("prey").equalTo(this.store.user.uid).once("value", snap => (
       snap.forEach(childsnap => this.setPreyListByKey(childsnap.val().wooer))
      )
    )
    this.loading = false
  }),

  fetchPreyListsByMate: action(async function fetchPreyListsByMate(){
    this.loading = true
    this.preyList = []
    const who_is_like_me_arr = []
    const peopele_i_like_arr = []
    const query = this.firebase.database().ref("goodImpression")
    await query.orderByChild("prey").equalTo(this.store.user.uid).once("value", snap => (
       snap.forEach(childsnap => who_is_like_me_arr.push(childsnap.val().wooer))
      )
    )
    await query.orderByChild("wooer").equalTo(this.store.user.uid).once("value", snap => (
       snap.forEach(childsnap => peopele_i_like_arr.push(childsnap.val().prey))
      )
    )
    const intersect_arr = this.intersect(who_is_like_me_arr,peopele_i_like_arr)
    intersect_arr.forEach((id) => this.setPreyListByKey(id))
    this.loading = false
  }),

  fetchPreyListsByCollection: action(async function fetchPreyListsByCollection(){
    this.loading = true
    this.preyList = []
    const query = this.firebase.database().ref("collection")
    await query.orderByChild("wooer").equalTo(this.store.user.uid).once("value", snap => (
       snap.forEach(childsnap => this.setPreyListByKey(childsnap.val().prey))
      )
    )
    this.loading = false
  }),

  setPreyListByKey: action(function setPreyListByKey(key){
    this.firebase.database().ref('users/' + key).once('value').then(snap => { this.preyList.push(snap.val()) })
  }),

  goToFateSingle: action(function goToFateSingle(prey){
    //const _index = this.preyList.indexOf(this.prey)
    this.loading = true
    //console.warn(prey)
    this.setprey(prey)
    this.loading = false
    Actions.fateSingle()
  }),

  goToMeetChanceSingle: action(function goToMeetChanceSingle(prey){
    this.meetChance.onPressButton(prey)
  }),

  //goToMeetCute: action(function goToMeetCute(prey){
    //const _index = this.preyList.indexOf(this.prey)
  //  this.loading = false
    //this.setprey(prey)
  //  Actions.meetcute()
  //}),

  setprey: action(function setprey(prey){
    //console.warn(this.prey)
    //console.warn(prey)
    this.prey = prey
  }),

  handleLike: action(function handleLike(){
    //console.warn(this)
  }),

  getNext: action(function handleLike(){
    //console.warn(this)
  }),

  setUser: action(function setUser(){
    this.user = this.store.user
  }),

  intersect: function intersect(a, b) {
    let t
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter((e) => {
        return b.indexOf(e) > -1;
    });
  },
  testFate: async function testFate(){
    await this.sleep(100)
  },

  sleep: function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default FateAction