import { observable, action, computed, useStrict } from 'mobx'

import { emailFormatChecker } from '../../app/Utils'

useStrict(true)

export default class SignUpInStore {
  // 不能動
  @observable email
  @observable gender
  @observable sexOrientation
  // 可編輯
  @observable password
  @observable displayName
  @observable city
  @observable birthday
  @observable bio
  //
  @observable photoURL
  @observable langs
  @observable interests
  @observable deleteInterests
  // error state
  @observable emailStatus
  @observable passwordStatus
  @observable displayNameStatus

  @observable emailChecker
  @observable passwordChecker
  @observable displayNameChecker
  @observable birthdayChecker
  @observable policyChecker
  //
  @observable UpInStatus
  @observable failureStatus

  constructor(firebase) {
    this.firebase = firebase
    // 不能動
    this.email = ''
    this.gender = true // { true : m, false: f }
    this.sexOrientation = true // { true : 同性, false: 異性 }
    // 可編輯
    this.password = ''
    this.displayName = ''
    this.city = null
    this.birthday = null
    this.bio = null
    this.interests = null
    this.deleteInterests = new Array
    //
    this.photoURL = null
    this.langs = null
    // error state
    this.emailStatus = null // 註冊 登入
    this.passwordStatus = null // 註冊/登入錯誤訊息
    this.displayNameStatus = null
    this.emailChecker = false
    this.passwordChecker = false
    this.displayNameChecker = false
    this.birthdayChecker = false
    this.policyChecker = false
    // 
    this.UpInStatus = null
    this.failureStatus = null
  }

  @computed get simpleLangs() {
    return Object.keys(this.langs).map(lang => ({key: lang, check: this.langs[lang]}))
  }

  @computed get interestsFlatList() {
    return this.interests.map(ele => ({key: ele}))
  }
  // user data

  @action setPhotoURL = url => {
    this.photoURL = url
  }

 // @action setUid = user_id => {
 //   this.uid = user_id
 // }

  @action setEmail = email => {
    this.email = email.trim()
  }

  @action setPassword = password => {
    this.password = password
  }

  @action setDisplayName = displayName => {
    this.displayName = displayName
  }

  @action setGender = () => {
    this.gender = !this.gender
  }

  @action setSexOrientation = () => {
    this.sexOrientation = !this.sexOrientation
  }

  @action setGoogleCity = data => {
    if (data.description) {
      this.city = data.description
    } else if (data.formatted_address) {
      console.log('data')
      this.city = data.formatted_address
    } else {

      this.city = ''
    }
  }

  @action setTextInputCity = city => {
    console.log(city)
    this.city = city
  }

  @action setBirthday = birthday => {
    this.birthday = birthday    
  }

  @action setBio = bio => {
    this.bio = bio
  }

  @action setLangs = object => {
    this.langs = object
  }

  @action setLang = key => {
    //console.log(this.langs[key])
    this.langs[key] = !this.langs[key]
    //this.langs = this.langs.slice()
  }

  @action setInterests = interests => {
    this.interests = interests
  }

  @action cleanDeleteInterests = () => {
    this.deleteInterests = new Array
  }

  @action addBadge = key => {
    if (!(this.interests.indexOf(key) > -1)) {
      this.interests.push(key)
    }
  }

  @action moveToDeleteDeleteInterests = key => {
    this.deleteInterests.push(key)
    this.interests = this.interests.slice()

  }

  @action moveOutDeleteDeleteInterests = key => {
    this.deleteInterests.splice(this.deleteInterests.indexOf(key), 1)
    this.interests = this.interests.slice()
  }

  // error state
  @action setEmailChecker = statu => {
    this.emailChecker = statu 
  }

  @action setEmailStatus = statu => {
    this.emailStatus = statu 
  }

  @action setPasswordChecker = statu => {
    this.passwordChecker = statu 
  }

  @action setPasswordStatus = statu => {
    this.passwordStatus = statu 
  }

  @action setDisplayNameChecker = statu => {
    this.displayNameChecker = statu 
  }

  @action setDisplayNameStatus = statu => {
    this.displayNameStatus = statu 
  }

  @action setBirthdayChecker = statu => {
    this.birthdayChecker = statu 
  }

  @action setPolicyNameChecker = () => {
    this.policyChecker = !this.policyChecker 
  }

  @action setUpInStatus = statu => {
    this.UpInStatus = statu
  }

  @action setFailureStatus = statu => {
    this.failureStatus = statu
  }

  @action checkEmail = () => {
    if (emailFormatChecker(this.email)) {
      this.firebase.auth().fetchProvidersForEmail(this.email).then( providers => {
        if (providers.length === 0) {
          this.setEmailChecker(true)
          this.setEmailStatus('此帳號可以使用')
          return true
        } else {
          this.setEmailChecker(false)
          this.setEmailStatus('此帳號已註冊')
          return false
        }
      }).catch((err) => {
        this.setEmailChecker(false)
        this.setEmailStatus('無法檢查帳號')
        return false
      })
    } else {
      this.setEmailChecker(false)
      this.setEmailStatus('帳號格式錯誤')
      return false 
    }
  }

  @action checkDisplayName = () => {
    if (this.displayName.length < 2) {
      this.setDisplayNameChecker(false)
      this.setDisplayNameStatus('請輸入2個字以上的暱稱')
    } else {
      this.setDisplayNameChecker(true)
      this.setDisplayNameStatus('此暱稱可以使用')
      return true     
    }
    return false   
  }

  @action checkPassword = () => {
    const passw =  /^[A-Za-z0-9]{6,10}$/;
    if (this.password.match(passw)) {
      this.setPasswordChecker(true)
      this.setPasswordStatus('此密碼可以使用')
    } else {
      this.setPasswordChecker(false)
      this.setPasswordStatus('請輸入數字或英文字母組合的6~10字密碼')
      return false    
    }
    return true
  }
}