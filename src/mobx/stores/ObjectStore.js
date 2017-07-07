import { observable, computed, useStrict } from 'mobx'
//import autobind from 'autobind-decorator'
//import Moment from 'moment'
import geolib from 'geolib'
//import GeoFire from 'geofire'

useStrict(false)

//@autobind
class ObjectStore {
  @observable initialPage
  @observable prey
  @observable preyList
  @observable loading
  @observable age_max
  @observable age_min
  @observable is_coll

  constructor(firebase,store,meetChance) {
    this.initialPage = 0
    this.preyList = []
    this.user = {}
    this.prey = null
    this.loading = false
    this.store = store
    this.firebase = firebase
    this.age_min = 25
    this.age_max = 60
    this.is_coll = false
    this.meetChance = meetChance
  }

  @computed get displayName(){
    return this.prey.displayName ? this.prey.displayName : ""
  }

  @computed get age(){
    return this.prey.birthday ? this.calculateAge() : 18
  }

  @computed get introduce(){
    return this.prey.bio ? this.prey.bio : "您好，我是MeetQ新進會員"
  }

  @computed get interests(){
    //return this.prey.hobby
    //console.warn(Object.prototype.toString.call( this.prey.interests ))
    return Object.prototype.toString.call( this.prey.hobby ) === '[object Object]' ? this.prey.hobby : ["MeetQ"]
  }

  @computed get languages(){
    return Object.prototype.toString.call( this.prey.lang ) === '[object Object]' ? this.prey.lang : { "MeetQ語": true }
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

  @computed get photoURL(){
    return this.prey.photoURL
  }

  @computed get photos(){
   return this.checkObject(this.prey.photos) ? this.prey.photos : []
  }

  checkGeocode(){
    if(this.checkObject(this.prey.geocode) && this.checkObject(this.user.geocode)) {
      if (typeof(this.prey.geocode.lat) === 'number' && typeof(this.prey.geocode.lng) === 'number'){ 
        true
      } else { 
        false
      }
    } else { 
      false
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
   
}

export default ObjectStore
