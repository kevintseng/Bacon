import { useStrict, observable, action } from 'mobx'

useStrict(true)

export default class ControlStore {

  @observable authenticateIndicator
  @observable avatarUploadIndicator
  @observable signUpDataUploadIndicator
  @observable syncIndicator
  @observable meetCuteMinAge
  @observable meetCuteMaxAge
  @observable meetChanceMinAge
  @observable meetChanceMaxAge
  @observable getCollectionMax
  @observable lineModal
  // bonues
  @observable bonus
  
  constructor() {
    this.initialize()
  }

  @action initialize = () => {
    this.authenticateIndicator = null // 註冊 登入
    this.avatarUploadIndicator = null // 上傳照片
    this.signUpDataUploadIndicator = null // 上傳資料
    this.syncDetector = false // {true: 同步完成, false: 同步中, }
    //
    this.meetCuteMinAge = 18
    this.meetCuteMaxAge = 99
    this.meetChanceMinAge = 18
    this.meetChanceMaxAge = 99
    // bonues
    this.bonus = { 200: true, 500: false, 1000: false }
    // collection
    this.getCollectionMax = false
    this.lineModal = false
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

  @action setMeetCuteMinAge = int => {
    this.meetCuteMinAge = int
  }

  @action setMeetCuteMaxAge = int => {
    this.meetCuteMaxAge = int
  }

  @action setMeetChanceMinAge = int => {
    this.meetChanceMinAge = int
  }

  @action setMeetChanceMaxAge = int => {
    this.meetChanceMaxAge = int
  }

  @action pickTwoHundredBonus = () => {
    this.bonus = { 200: true, 500: false, 1000: false }
  }

  @action pickFiveHundredBonus = () => {
    this.bonus = { 200: false, 500: true, 1000: false }
  }

  @action pickOneThousandBonus = () => {
    this.bonus = { 200: false, 500: false, 1000: true }
  }

  @action setGetCollectionMax = () => {
    this.getCollectionMax = !this.getCollectionMax
  }

  @action setLineModal = () => {
    this.lineModal = !this.lineModal
  }
}