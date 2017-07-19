import { observable, action, useStrict } from 'mobx'

useStrict(true)

export default class SignUpInStore {

  @observable email
  @observable password
  @observable displayName
  @observable UpInStatus

  constructor() {
    this.UpInStatus = null
    this.uid = null
    this.email = ''
    this.password = ''
    this.displayName = ''
  }

  @action setUpInStatus = statu => {
    this.UpInStatus = statu
  }

  @action onChangeEmail = email => {
    this.email = email.trim()
  }

  @action onChangePassword = password => {
    this.password = password
  }

  @action onChangeDisplayName = displayName => {
    this.displayName = displayName
  }

  @action setUid = user_id => {
    this.uid = user_id
  }
}