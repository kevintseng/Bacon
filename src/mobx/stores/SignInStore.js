import { useStrict, observable, action } from 'mobx'

useStrict(true)

export default class SignInStore {

  @observable email
  @observable password

  constructor(firebase) {
    this.email = null
    this.password = null
  }

  @action initialize = () => {
    this.email = null
    this.password = null    
  }

  @action setEmail = email => {
    this.email = email.trim()
  }

  @action setPassword = password => {
    this.password = password.trim()
  }
}