import { useStrict, observable, action } from 'mobx'

useStrict(true)

export default class SignInStore {

  @observable email
  @observable password
  // error handle
  @observable signInIndicator

  constructor() {
    this.initialize()
  }

  @action initialize = () => {
    this.email = null
    this.password = null 
    this.signInIndicator = null   
  }

  @action setEmail = email => {
    this.email = email.trim()
  }

  @action setPassword = password => {
    this.password = password.trim()
  }

  // error handle

  @action setSignInIndicator = str => {
    this.signInIndicator = str
  }
}