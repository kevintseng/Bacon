import { observable, action, computed, useStrict } from 'mobx'
import { calculateAge } from '../../app/Utils'

useStrict(true)

export default class SubjectStore {
  // user data
  @observable photoUrl
  @observable nickname
  @observable sexualOrientation
  @observable address
  @observable birthday
  @observable bio
  @observable photos
  @observable vip
  @observable languages
  @observable hobbies
  @observable emailVerified
  @observable photoVerified
  // hide function
  @observable hideMeetCute
  @observable hideMeetChance
  @observable hideVister
  @observable hideMessage

  constructor() {
    this.initialize()
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
    // user data
    this.uid = null 
    this.email = null
    this.nickname = null
    this.address = null
    this.birthday = null
    this.bio = null
    this.languages = null
    this.hobbies = null
    this.photoUrl = null
    this.emailVerified = false
    this.photoVerified = false
    ///////// 難處理 /////////
    this.vip = false
    this.photos = new Object
    this.sexualOrientation = null // 有可能 null -> 萬一上傳失敗拿不到就永遠都是null了 -> 邂逅那邊先做特別處理
    // hide function
    this.hideMeetCute = false
    this.hideMeetChance = false
    this.hideVister = false
    this.hideMessage = false   
  }

  @action setUid = uid => {
    this.uid = uid
  }

  @action setEmail = str => {
    this.email = str.trim()
  }

  @action setNickName = str => {
    this.nickname = str
  }

  @action setBirthday = str => {
    this.birthday = str    
  }

  @action setAddress = str => {
    this.address = str
  }

  @action setPhotoUrl = url => {
    this.photoURL = url
  }
  
  @action setSexOrientation = sexOrientation => {
    this.sexOrientation = sexOrientation
  }

  @action setBio = bio => {
    this.bio = bio    
  }

  @action setPhotos = photos => {
    this.photos = photos
  }

  @action setVip = vip => {
    this.vip = vip
  }

  @action setLanguages = languages => {
    this.languages = languages
  }

  @action setHobbies = hobbies => {
    this.hobbies = hobbies
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