import { observable, action, useStrict } from 'mobx'
//import autobind from 'autobind-decorator'
//import Moment from 'moment'
//import geolib from 'geolib'
//import GeoFire from 'geofire'

useStrict(false)

//@autobind
class UIStore {
  @observable displayName
  @observable birthday
  @observable city
  @observable bio
  @observable langRaw
  @observable hobby
  @observable hobbyInput
  @observable deleteHobby


  constructor() {
    this.displayName = null
    this.birthday = null
    this.city = null
    this.langRaw = null
    this.hobby = null
    this.hobbyInput = null
    this.deleteHobby = []
  }

  @action setDisplayName(val){
    this.displayName = val
  }

  @action setBirthday(val){
    if (val) {
      this.birthday = val
    }    
  }

  @action setCity(data){
    if (data.description) {
      this.city = data.description
    }
  } 

  @action setBio(val){
    this.bio = val
  } 

  @action setLang(val) {
    this.langRaw[val] = !this.langRaw[val]
  }

  @action setHobby(val) {
    this.hobby = this.hobby || []
    if (val) {
      this.hobby.push(val)
    } else {
      this.hobby.push(this.hobbyInput)
    }
  }

  @action updateHobbyInput(val){
    this.hobbyInput = val
  }

  @action setDeleteHobby(val){
    if (val) {
      this.deleteHobby.push(val)
    }  
  }
}

export default UIStore
