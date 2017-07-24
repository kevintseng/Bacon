import { observable, action, useStrict } from 'mobx'

useStrict(true)

export default class SubjectStore {

  @observable uid
  @observable displayName

  // SettingHide
  @observable hideMeetCute
  @observable hideMeetChance
  @observable hideVister
  @observable hideMessage

  constructor() {
    this.uid = null
    this.displayName = '同步中...'
    // SettingHide
    this.hideMeetCute = false
    this.hideMeetChance = false
    this.hideVister = false
    this.hideMessage = false
  }

  @action setUid = uid => {
    this.uid = uid
  }

  @action setDisplayName = displayName => {
    this.displayName = displayName
  }

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