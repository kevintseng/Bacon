import { useStrict, observable, action } from 'mobx'

useStrict(true)

export default class PasswordStore {

  @observable email

  constructor() {
    this.initialize()
  }

  @action initialize = () => {
    this.email = null
  }

  @action setEmail = str => {
    this.email = str.trim()
  }
}