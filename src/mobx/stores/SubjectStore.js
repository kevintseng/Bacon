import { observable, action, computed, useStrict } from 'mobx'
import { calculateAge } from '../../app/Utils'

useStrict(true)

export default class SubjectStore {
  // user data
  @observable photoURL
  @observable uid
  @observable displayName
  @observable sexOrientation
  @observable city
  @observable birthday
  @observable photos
  // hide function
  @observable hideMeetCute
  @observable hideMeetChance
  @observable hideVister
  @observable hideMessage

  constructor() {
    // user data
    this.photoURL = null
    this.uid = null
    this.displayName = '同步中...'
    this.sexOrientation = '同步中...' // f m
    this.city = '同步中...'
    this.birthday = '同步中...'
    this.photos = [
      { key: 1, uri: 'https://i.imgur.com/FHxVpN4.jpg' }
    ]
    // hide function
    this.hideMeetCute = false
    this.hideMeetChance = false
    this.hideVister = false
    this.hideMessage = false
  }

  // user data

  @computed get age(){
    return this.birthday ? calculateAge(this.birthday) : '18'
  }

  @action setPhotoURL = url => {
    this.photoURL = url
  }
  
  @action setUid = uid => {
    this.uid = uid
  }

  @action setDisplayName = displayName => {
    this.displayName = displayName
  }

  @action setSexOrientation = sexOrientation => {
    this.sexOrientation = sexOrientation
  }

  @action setCity = city => {
    this.city = city
  }

  @action setBirthday = birthday => {
    this.birthday = birthday    
  }

  @action setPhotos = url => {
     this.photos.push({key: this.photos.length + 1, uri: url})
     this.photos = this.photos.slice()
  }

  // hide function

  @action setHideMeetCute = () => {
    this.hideMeetCute = !this.hideMeetCute
  }

  @action setHideMeetChance = () => {
    this.hideMeetChance = !this.hideMeetChance
  }

  @action setHideVister = () => {
    this.hideVister = !this.hideVister
  }

  @action setHideMessage = () => {
    this.hideMessage = !this.hideMessage
  }

}