import { useStrict, observable, action } from 'mobx'

useStrict(true)

export default class ControlStore {

  constructor() {
    this.initialize()
  }

  @action initialize = () => {
    this.authenticateIndicator = null // 註冊 登入
    this.avatarUploadIndicator = null
    this.signUpDataUploadIndicator = null
    this.syncIndicator = null
  }

  @action setAuthenticateIndicator = str => {
    this.authenticateIndicator = str
  }

  @action setAvatarUploadIndicator = str => {
    this.avatarUploadIndicator = str
  }

  @action setSignUpDataUploadIndicator = str => {
    this.signUpDataUploadIndicator = str
  }
}