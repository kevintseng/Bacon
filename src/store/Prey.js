import { observable, action, computed, useStrict } from 'mobx'
import Moment from 'moment'
import geolib from 'geolib'
import GeoFire from 'geofire'

useStrict(false)

class Prey {
  @observable prey
  @observable preyList
  @observable loading

  constructor(firebase,store) {
    this.preyList = []
    this.user = {}
    this.prey = {}
    this.loading = true
    this.store = store
    this.firebase = firebase
  }

  @computed get displayName(){
    return this.prey.displayName ? this.prey.displayName : ""
  }

  @computed get age(){
    return this.prey.birthday ? this.calculateAge() : 18
  }

  @computed get introduce(){
    return this.prey.bio ? this.prey.bio : ""
  }

  @computed get interests(){
    //console.warn(Object.prototype.toString.call( this.prey.interests ))
    return Object.prototype.toString.call( this.prey.interests ) === '[object Object]' ? this.prey.interests : []
  }

  @computed get languages(){
    return Object.prototype.toString.call( this.prey.lang ) === '[object Object]' ? this.prey.lang : {}
  }

  @computed get distance(){
    this.setUser()
    return this.checkGeocode() ?
    (geolib.getDistance(
      {latitude: this.user.geocode.lat, longitude: this.user.geocode.lng},
      {latitude: this.prey.geocode.lat, longitude: this.prey.geocode.lng}
    ))/1000
    : 0 //處理
  }

  @computed get emailVerified(){
    return this.prey.emailVerified
    //return typeof(this.prey.emailVerified) === 'boolean' ? this.prey.emailVerified : false
  }

  @computed get photoVerified(){
    return this.prey.photoVerified
    //return typeof(this.prey.photoVerified) === 'boolean' ? this.prey.photoVerified : false
  }

  @computed get photos(){
   return this.checkObject(this.prey.photos) ? this.prey.photos : []
  }

  @action setUser(){
    this.user = this.store.user
  }

  @action initPreyList(){
    this.preyList = []
    this.loading = true
  }

  @action fetchPreyListsByMeetChance(latitude, longitude){
    //console.warn(latitude,longitude)
    this.seekNearBy(latitude, longitude)
  }

  @action seekNearBy(latitude, longitude){
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
  }

  @action setPreyListByKey(key){
    this.firebase.database().ref('users/' + key).once('value').then(snap => { this.preyList.push(snap.val()) })
  }

  @action fetchPreyListsByMeetCute(sexOrientation){
    //const deviceId = DeviceInfo.getUniqueID();
    //const locale = DeviceInfo.getDeviceLocale();
    //const country = DeviceInfo.getDeviceCountry();
    this.seekMeetQs(sexOrientation)
  }

  @action seekMeetQs(sexOrientation) {
    switch (sexOrientation) {
      case "msf":
        this.mq("fsm");
        break;
      case "msm":
        this.mq("msm");
        break;
      case "fsm":
        this.mq("msf");
        break;
      case "fsf":
        this.mq("fsf");
        break;
    }
  }

  @action mq(sexOrientation) {
    sexOrientation = 'test'
    const query = this.firebase.database().ref("users")
      //.database()
      //.ref(`seeking/${this.store.prey.country}/${cond}`);
    //ref.orderByKey().equalTo(cond,"sexOrientation")
    query.orderByChild("sexOrientation").equalTo(sexOrientation).once("value", snap => {
        snap.forEach(childsnap => {
          //if (childsnap.val().country === 'Taiwan')
          //{
            this.preyList.push(childsnap.val());
          //}
        })
      })
      .then(() => {
        this.setprey(this.preyList[0]);
    })
  } 

  @action handleLike = () => {
    const r = this.firebase.database().ref("preys/" + this.prey.uid + "/likes").child(this.prey.uid);
    r.set({time: Moment().unix()});
    this.getNext();
  } 

  @action getNext = async () => {
    this.loading = true
    await this.sleep(1000)
    const _index = this.preyList.indexOf(this.prey) + 1;
    if (this.preyList.length > _index) {
      this.setprey(this.preyList[_index]);
    } else {
      this.loading = false
      alert('這是最後一位了, 在沒有有fu的對象我也沒辦法惹...GG');
    }
  } 

  @action setprey(prey){
    this.prey = prey
    this.loading = false
  } 

  checkGeocode(){
    if(this.checkObject(this.prey.geocode) && this.checkObject(this.user.geocode)) {
      if (typeof(this.prey.geocode.lat) === 'number' && typeof(this.prey.geocode.lng) === 'number'){ 
        return true
      } else { 
      return false
      }
    } else { 
      return false
    }
  }

  calculateAge(){
    const ageDifMs = Date.now() - new Date(this.prey.birthday).getTime()
    const ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  checkObject(object){
    return Object.prototype.toString.call(object) === '[object Object]'
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }     
}

export default Prey;
