import { observable, action, computed, useStrict } from 'mobx'
import { calculateAge } from '../../app/Utils'

useStrict(true)

export default class SubjectStore {
  // user data
  @observable latitude
  @observable longitude
  @observable photoURL
  @observable uid
  @observable displayName
  @observable sexOrientation
  @observable city
  @observable birthday
  @observable bio
  @observable photos
  @observable vip
  @observable langs
  @observable interests
  @observable emailVerified
  @observable photoVerified
  // hide function
  @observable hideMeetCute
  @observable hideMeetChance
  @observable hideVister
  @observable hideMessage

  constructor() {
    // user data
    this.uid = null // ㄧ登入一定有
    this.email = null // ㄧ登入一定有

    this.latitude = 25.057085, // 巷曲家山東餃子館
    this.longitude = 121.545684 // 巷曲家山東餃子館
    this.displayName = '同步中...'
    this.city = '同步中...'
    this.birthday = '同步中...'
    this.bio = '同步中...'
    this.langs = '同步中...'
    this.interests = '同步中...'
    this.photoURL = 'https://firebasestorage.googleapis.com/v0/b/bacon-dev-tsao.appspot.com/o/loadingIcon.gif?alt=media&token=ec53a3bb-0c32-4590-8621-ba9466e85d02'
    this.emailVerified = true
    this.photoVerified = false
    ///////// 難處理 /////////
    this.vip = false
    this.photos = new Array
    this.sexOrientation = null // 有可能 null -> 萬一上傳失敗拿不到就永遠都是null了 -> 邂逅那邊先做特別處理
    // hide function
    this.hideMeetCute = false
    this.hideMeetChance = false
    this.hideVister = false
    this.hideMessage = false
  }

  // user data

  @computed get profileDisplayName() {
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

  @computed get profileBirthday() {
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

  @computed get profileCity() {
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

  @computed get profileBio() {
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

  @computed get profileLangs() {
    if (this.langs === '同步中...') {
      return '同步中...'
    } else if (typeof(this.langs) === 'object'){
      const string = Object.keys(this.langs).filter(lang => this.langs[lang] === true).join()
      if (string == '') {
        return '您尚未選擇語言能力，點此選擇語言能力！'
      } else {
        return string
      }
    }
  }

  @computed get profileInterests() {
    if (this.interests === '同步中...') {
      return '同步中...'
    } else if (typeof(this.interests) === 'object'){
      if (this.interests.length === 0) {
        return '您尚未編輯興趣愛好，請點此編輯興趣愛好！'
      } else {
        return true
      }
    }
  }
  // FlatList
  @computed get simplePhotos() {
    return this.photos.map((ele,index) => ({ key: index, uri: ele }) )
  }

  @computed get interestsFlatList() {
    return this.interests.map(ele => ({key: ele}))
  }

  // action

  @action initialize = () => {
   
  }

  @action setLatitude = latitude => {
    this.latitude = latitude
  }

  @action setLongitude = longitude => {
    this.longitude = longitude
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
    //this.photos = this.photos.slice()
  }

  @action setVip = vip => {
    this.vip = vip
  }

  @action setLangs = langs => {
    this.langs = langs
  }

  @action setInterests = interests => {
    this.interests = interests
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