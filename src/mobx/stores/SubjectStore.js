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
  @observable bio
  @observable photos
  @observable vip
  // hide function
  @observable hideMeetCute
  @observable hideMeetChance
  @observable hideVister
  @observable hideMessage

  constructor() {
    // user data
    this.uid = null // ㄧ登入一定有
    this.email = null // ㄧ登入一定有

    this.displayName = '同步中...'
    this.city = '同步中...'
    this.birthday = '同步中...'
    this.bio = '同步中...'
    this.photoURL = null
    this.photos = new Array
    this.vip = false
    ///////// 難處理 /////////
    this.sexOrientation = null // 有可能 null -> 萬一上傳失敗拿不到就永遠都是null了 -> 邂逅那邊先做特別處理
    // hide function
    this.hideMeetCute = false
    this.hideMeetChance = false
    this.hideVister = false
    this.hideMessage = false
  }

  // user data

  @computed get simpleDisplayName() {
    if (this.displayName === '同步中...') {
      return '同步中...'
    } else if (this.displayName === '同步失敗...'){
      return '同步失敗...'
    } else if (this.displayName) {
      return this.displayName
    } else {
      return '請輸入暱稱...'
    }
    //return this.birthday ? calculateAge(this.birthday) : '同步中...'
  }

  @computed get age() {
    if (this.birthday === '同步中...') {
      return '同步中...'
    } else if (this.birthday === '同步失敗...'){
      return '同步失敗...'
    } else if (this.birthday) {
      return calculateAge(this.birthday)
    } else {
      return '請輸入生日...'
    }
    //return this.birthday ? calculateAge(this.birthday) : '同步中...'
  }

  @computed get simpleCity() {
    if (this.city === '同步中...') {
      return '同步中...'
    } else if (this.city === '同步失敗...'){
      return '同步失敗...'
    } else if (this.city) {
      return this.city.substring(0,8)
    } else {
      return '請輸入地址...'
    }
  }

  @computed get simpleBio() {
    if (this.bio === '同步中...') {
      return '同步中...'
    } else if (this.bio === '同步失敗...'){
      return '同步失敗...'
    } else if (this.bio) {
      return this.bio
    } else {
      return '您尚未輸入自我介紹，點此輸入自我介紹！'
    }
  }

  @computed get simplePhotos() {
    console.log(this.photos)
    return this.photos.map((ele,index) => ({ key: index, uri: ele }) )
  }

  @action setEmail = email => {
    this.email = email
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

  @action setBio = bio => {
    this.bio = bio    
  }

  @action setPhotos = photos => {
    this.photos = photos
  }

  @action addPhoto = url => {
    this.photos.push(url)
    this.photos = this.photos.slice()
  }

  @action setVip = vip => {
    this.vip = vip
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