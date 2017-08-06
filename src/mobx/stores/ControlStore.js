import { useStrict, observable, action } from 'mobx'

useStrict(true)

export default class ControlStore {

  @observable authenticateIndicator
  @observable avatarUploadIndicator
  @observable signUpDataUploadIndicator
  @observable syncIndicator

  constructor() {
    this.initialize()
  }

  @action initialize = () => {
    this.authenticateIndicator = null // 註冊 登入
    this.avatarUploadIndicator = null // 上傳照片
    this.signUpDataUploadIndicator = null // 上傳資料
    this.syncDetector = false // {true: 同步完成, false: 同步中, }
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

  @action setSyncDetector = boolean => {
    this.syncDetector = boolean
  }
}