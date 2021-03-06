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
  @observable bonusPolicyModal
  @observable settingPolicyModal
  @observable settingRuleModal
  @observable deleteAccounrModal
  //
  @observable lineModal
  @observable mateModal
  // bonues
  @observable bonus
  @observable upgrade
  //
  @observable meetCuteRadar
  @observable meetCuteThreePhotos
  @observable meetChanceRadar
  @observable meetChanceOfflineMember
  //
  @observable LineModalUid
  @observable LineModalCode
  @observable LineModalNickname
  @observable LineModalAvatar
  //
  @observable langAdvanced
  //
  @observable lang
  //
  @observable master
  @observable common
  @observable general
  //
  @observable chatMatchModal
  @observable passwordRsetModal
  @observable gotTochatRoom

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
    this.bonus = { 200: true, 600: false, 1200: false }
    this.upgrade = {'3_month': true, '1_year': false}
    // collection
    this.getCollectionMax = false
    //
    this.lineModal = false
    this.mateModal = false
    //
    this.bonusPolicyModal = false
    this.settingPolicyModal = false
    this.settingRuleModal = false
    //
    this.deleteAccounrModal = false
    //
    this.meetCuteRadar = false
    this.meetChanceRadar = false
    this.meetChanceOfflineMember = false
    //
    this.LineModalUid = null
    this.LineModalCode = null
    this.LineModalNickname = null
    this.LineModalAvatar = null
    // 
    this.langAdvanced = false
    //
    this.lang = null
    //
    this.master = true,
    this.common = false,
    this.general = false
    //
    this.chatMatchModal = true
    this.passwordRsetModal = false
    this.drawer = null
    this.gotTochatRoom = false
  }

  @action startGotTochatRoom = () => {
    this.gotTochatRoom = true
  }

  @action finishGotTochatRoom = () => {
    this.gotTochatRoom = false
  }

  @action setDrawer = ref => {
    this.drawer = ref
  }

  @action closeChatMatchModal = () => {
    this.chatMatchModal = false
  }

  @action openChatMatchModal = () => {
    this.chatMatchModal = true
  }

  @action setLineModalUid = str => {
    this.LineModalUid = str
  }

  @action setLineModalNickname = str => {
    this.LineModalNickname = str
  }

  @action setLineModalCode = str => {
    this.LineModalCode = str
  }

  @action setLineModalAvatar = str => {
    this.LineModalAvatar = str
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
    this.bonus = { 200: true, 600: false, 1200: false }
  }

  @action pickFiveHundredBonus = () => {
    this.bonus = { 200: false, 600: true, 1200: false }
  }

  @action pickOneThousandBonus = () => {
    this.bonus = { 200: false, 600: false, 1200: true }
  }

  @action pickThreeMonthUpfrade = () => {
    this.upgrade = {'3_month': true, '1_year': false}
  }

  @action pickOneYearUpfrade = () => {
    this.upgrade = {'3_month': false, '1_year': true}
  }

  @action setGetCollectionMax = () => {
    this.getCollectionMax = !this.getCollectionMax
  }

  @action setLineModal = () => {
    this.lineModal = !this.lineModal
  }

  @action setMateModal = () => {
    this.mateModal = !this.mateModal
  }

  @action setBonusPolicyModal = () => {
    this.bonusPolicyModal = !this.bonusPolicyModal
  }

  @action setSettingPolicyModal = () => {
    this.settingPolicyModal = !this.settingPolicyModal
  }

  @action setSettingRuleModal = () => {
    this.settingRuleModal = !this.settingRuleModal
  }

  @action setDeleteAccounrModal = () => {
    this.deleteAccounrModal = !this.deleteAccounrModal
  }

  @action setPasswordResetModal = () => {
    this.passwordRsetModal = !this.passwordRsetModal
  }

  @action switchMeetCuteRadar = () => {
    this.meetCuteRadar = !this.meetCuteRadar
  }

  @action switchMeetCuteThreePhotos = () => {
    this.meetCuteThreePhotos = !this.meetCuteThreePhotos
  }

  @action switchMeetChanceRadar = () => {
    this.meetChanceRadar = !this.meetChanceRadar
  }

  @action setMeetCuteRadar = boolean => {
    this.meetCuteRadar = boolean
  }

  @action setMeetCuteThreePhotos = boolean => {
    this.meetCuteThreePhotos = boolean
  }

  @action setMeetChanceRadar = boolean => {
    this.meetChanceRadar = boolean
  }

  @action switchMeetChanceOfflineMember = () => {
    this.meetChanceOfflineMember = !this.meetChanceOfflineMember
  }

  @action setMeetChanceOfflineMember = boolean => {
    this.meetChanceOfflineMember = boolean
  }

  @action setlangAdvanced = () => {
    this.langAdvanced = !this.langAdvanced
  }

  @action setlang = lang => {
    this.lang = lang 
  }

  @action initMaster = () => {
    this.master = true,
    this.common = false,
    this.general = false
  }

  @action setMaster = () => {
    this.master = true,
    this.common = false,
    this.general = false    
  }

  @action setCommon = () => {
    this.master = false,
    this.common = true,
    this.general = false     
  }

  @action setGeneral = () => {
    this.master = false,
    this.common = false,
    this.general = true     
  }
}
