import { useStrict, observable, action } from 'mobx'

useStrict(true)

export default class SignUpStore {

  @observable gender
  @observable sexualOrientation
  @observable address
  @observable email
  @observable password
  @observable nickname
  @observable birthday
  @observable policyDetector
  @observable avatar
  @observable album
  // error handle
  @observable emailIndicator
  @observable passwordIndicator
  @observable nicknameIndicator
  // sign up error
  @observable signUpIndicator
  // modal
  @observable policyModal
  @observable ruleModal

  constructor(firebase) {
    this.firebase = firebase
    this.initialize()
  }

  @action initialize = () => {
    this.gender = true // { true: man, false: female }
    this.sexualOrientation = true // { true : 同性, false: 異性 }
    this.address = null
    this.email = null
    this.password = null
    this.nickname = null
    this.birthday = null
    this.policyDetector = false
    this.avatar = null
    this.album = new Object
    // error handle
    this.emailDetector = false
    this.emailIndicator = null
    this.passwordDetector = false
    this.passwordIndicator = null
    this.nicknameDetector = false
    this.nicknameIndicator = null
    this.birthdayDetector = false
    this.birthdayIndicator = null
    // sign up error
    this.signUpIndicator = null
    // modal
    this.policyModal = false
    this.ruleModal = false
  }

  @action switchGender = () => {
    this.gender = !this.gender
  }

  @action switchSexualOrientation = () => {
    this.sexualOrientation = !this.sexualOrientation
  }

  @action setAddress = str => {
    this.address = str.substring(0,11)
  }

  @action setEmail = str => {
    this.email = str.trim()
  }

  @action setPassword = str => {
    this.password = str.trim()
  }

  @action setNickname = str => {
    this.nickname = str.trim()
  }

  @action setBirthday = str => {
    this.birthday = str
  }

  @action switchPolicyDetector = () => {
    this.policyDetector = !this.policyDetector
  }

  @action setAvatar = url => {
    this.avatar = url
  }

  @action setAlbum = (key,url) => {
    this.album[key] = url
    //this.album = Object.assign({},this.album)
  }

  @action setPolicyModal = () => {
    this.policyModal = !this.policyModal
  }

  @action setRuleModal = () => {
    this.ruleModal = !this.ruleModal
  }

  // Blur

  @action setEmailDetector = boolean => {
    this.emailDetector = boolean
  }

  @action setEmailIndicator = str => {
    this.emailIndicator = str
  }

  @action setPasswordDetector = boolean => {
    this.passwordDetector = boolean
  }

  @action setPasswordIndicator = str => {
    this.passwordIndicator = str
  }

  @action setNicknameDetector = boolean => {
    this.nicknameDetector = boolean
  }

  @action setNicknameIndicator = str => {
    this.nicknameIndicator = str
  }

  @action setSignUpIndicator = str => {
    this.signUpIndicator = str
  }

  @action checkEmail = () => {
    if (this.checkEmailFormat(this.email)) {
      this.firebase.auth().fetchProvidersForEmail(this.email).then( providers => {
        if (providers.length === 0) {
          this.setEmailDetector(true)
          this.setEmailIndicator('此帳號可以使用')
          return true
        } else {
          this.setEmailDetector(false)
          this.setEmailIndicator('此帳號已註冊')
          return false
        }
      }).catch((err) => {
        this.setEmailDetector(false)
        this.setEmailIndicator('無法檢查帳號')
        return false
      })
    } else {
      this.setEmailDetector(false)
      this.setEmailIndicator('帳號格式錯誤')
      return false
    }
  }

  @action checkPassword = () => {
    if (/^[A-Za-z0-9]{6,12}$/.test(this.password)) {
      this.setPasswordDetector(true)
      this.setPasswordIndicator('此密碼可以使用')
    } else {
      this.setPasswordDetector(false)
      this.setPasswordIndicator('請輸入數字或英文字母組合的6~12字密碼')
      return false
    }
    return true
  }

  @action checkNickname = () => {
    if (/^[^null]{2,20}$/.test(this.nickname)) {
      this.setNicknameDetector(true)
      this.setNicknameIndicator('此暱稱可以使用')
    } else {
      this.setNicknameDetector(false)
      this.setNicknameIndicator('請輸入2~20字的暱稱')
      return false
    }
    return true
  }

  checkEmailFormat(email) {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      return true
    }
    return false
  }
}
