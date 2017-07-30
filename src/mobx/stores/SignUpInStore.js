import { observable, action, useStrict } from 'mobx'

useStrict(true)

export default class SignUpInStore {
  // user data
  @observable photoURL
  @observable email
  @observable password
  @observable displayName
  @observable gender
  @observable sexOrientation
  @observable city
  @observable birthday
  // error state
  @observable UpInStatus
  @observable UpInError

  @observable emailStatus
  @observable passwordStatus
  @observable displayNameStatus

  @observable emailChecker
  @observable passwordChecker
  @observable displayNameChecker
  @observable birthdayChecker
  @observable policyChecker

  constructor() {
    // user data
    this.photoURL = null
    this.email = ''
    this.password = ''
    this.displayName = ''
    this.gender = true // { true : m, false: f }
    this.sexOrientation = true // { true : 同性, false: 異性 }
    this.city = null
    this.birthday = null
    // error state
    this.emailStatus = null // 註冊 登入
    this.passwordStatus = null // 註冊/登入錯誤訊息
    this.displayNameStatus = null
    this.emailChecker = false
    this.passwordChecker = false
    this.displayNameChecker = false
    this.birthdayChecker = false
    this.policyChecker = false
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
    }
  }

  @action setTextInputCity = city => {
    this.city = city
  }

  @action setBirthday = birthday => {
    this.birthday = birthday    
  }

  // error state

  @action setEmailChecker = state => {
    this.emailChecker = state 
  }

  @action setEmailStatus = state => {
    this.emailStatus = state 
  }

  @action setPasswordChecker = state => {
    this.passwordChecker = state 
  }

  @action setPasswordStatus = state => {
    this.passwordStatus = state 
  }

  @action setDisplayNameChecker = state => {
    this.displayNameChecker = state 
  }

  @action setDisplayNameStatus = state => {
    this.displayNameStatus = state 
  }

  @action setBirthdayChecker = state => {
    this.birthdayChecker = state 
  }

  @action setPolicyNameChecker = () => {
    this.policyChecker = !this.policyChecker 
  }
}