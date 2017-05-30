import { observable, computed, useStrict } from 'mobx'
//import autobind from 'autobind-decorator'
//import Moment from 'moment'
import geolib from 'geolib'
//import GeoFire from 'geofire'

useStrict(false)

//@autobind
class PreyStore {
  @observable prey
  @observable preyList
  @observable loading

  constructor(firebase,store) {
    this.preyList = []
    this.user = {}
    this.prey = {}
    this.loading = false
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

export default PreyStore