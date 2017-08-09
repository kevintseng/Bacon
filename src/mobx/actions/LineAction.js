import { action } from 'mobx'
import { Actions } from 'react-native-router-flux'

const LineAction = {

  initConvList: action(function initConvList(){
    this.loading = true
    this.convList = []
  }),

  fetchConvList: action(async function fetchConvList(){
    try{
      this.loading = true
      this.convList = []
      const query = this.firebase.database().ref("users/" + this.store.user.uid + "/conversations" )
      await query.orderByChild("priority").once("value", snap => (
         snap.forEach(childsnap => {
           // TODO
         })
        )
      ) //|| this.sleep(2000)
      this.loading = false
    } catch(err) {
      console.warn(err);
    }
  }),

  // setPreyListByKey: action(function setPreyListByKey(key){
  //   this.firebase.database().ref('users/' + key).once('value').then(snap => { this.preyList.push(snap.val()) })
  // }),

  goToMeetChanceSingle: action(function goToMeetChanceSingle(prey){
    this.meetChance.onPressButton(prey)
  }),

  //goToMeetCute: action(function goToMeetCute(prey){
    //const _index = this.preyList.indexOf(this.prey)
  //  this.loading = false
    //this.setprey(prey)
  //  Actions.meetcute()
  //}),

  setUser: action(function setUser(){
    this.user = this.store.user
  }),


export default LineAction
