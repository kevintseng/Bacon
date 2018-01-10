import { useStrict, observable, action } from 'mobx'

useStrict(true)

export default class SignInStore {

  @observable email
  @observable password
  // error handle
  @observable signInIndicator

  constructor() {
    this.email = null
    this.password = null 
    this.initialize()
  }

  @action initialize = () => {
    this.signInIndicator = null   
  }

  @action setEmail = str => {
    this.email = str.trim()
  }

  @action setPassword = str => {
    this.password = str.trim()
  }

  // error handle

  @action setSignInIndicator = str => {
    this.signInIndicator = str
  }
}