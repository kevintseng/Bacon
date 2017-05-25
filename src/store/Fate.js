import { observable, action, computed, useStrict, runInAction, autorun } from 'mobx'
import Moment from 'moment'
import geolib from 'geolib'
import GeoFire from 'geofire'

useStrict(false)

class Fate {
  @observable preyList
  @observable prey
  @observable loading
  @observable x
  @observable c

  constructor(firebase,store) {
    this.preyList = []
    this.prey = {}
    this.loading = true
    this.store = store
    this.firebase = firebase
    this.x = null
    this.c = null
  }

  @action initPreyList(){
    this.loading = true
    this.preyList = []
  }
  
  @action async fetchPreyListsByVisitors(){
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
  }

  //@action closeLoading(){
  //  this.loading = false
  //}

  //@action async test(){
    //runInAction("A",() => {this.loading = true})
  //  await this.sleep(2000)
    //this.sleepSynchronize(2000)
  //  runInAction("A",() => {this.loading = false})
  //  await this.sleep(2000)
    //.sleepSynchronize(2000)
  //  runInAction("A",() => {this.x = 'A'})
  //  await this.sleep(2000)
    //this.sleepSynchronize(2000)
  //  runInAction("A",() => {this.loading = true})
  //  await this.sleep(2000)
  //  runInAction("A",() => {this.c = 'A'})
    //this.sleepSynchronize(2000)
    //await this.sleep(2000)
    //this.sleepSynchronize(2000)
  //}

  @action async fetchPreyListsByGoodImpression(){
    this.loading = true
    this.preyList = []
    const query = this.firebase.database().ref("GoodImpression")
    await query.orderByChild("prey").equalTo(this.store.user.uid).once("value", snap => (
       snap.forEach(childsnap => this.setPreyListByKey(childsnap.val().hunter))
      )
    )
    this.loading = false
  }

  @action fetchPreyListsByMate(){
    console.warn('Mate')
  }

  @action fetchPreyListsByCollection(){
    console.warn('Collection')
  }

  @action setPreyListByKey(key){
    this.firebase.database().ref('users/' + key).once('value').then(snap => { this.preyList.push(snap.val()) })
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }  

  sleepSynchronize(milliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
        }
      }
  } 

}

export default Fate;
