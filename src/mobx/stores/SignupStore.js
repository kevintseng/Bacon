import { observable, action, useStrict } from 'mobx'

useStrict(true)

export default class SignupStore {

  @observable email
  @observable password

  constructor() {
    this.email = ''
    this.password = ''
  }


  @action onChangeEmail = email => {
    this.email = email.trim()
  }

  @action onChangePassword = pass => {
    this.password = pass
  }

}