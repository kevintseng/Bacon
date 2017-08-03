import { useStrict, observable, action } from 'mobx'

useStrict(true)

export default class ControlStore {

  constructor() {
    this.initialize()
  }

  @action initialize = () => {
    this.authenticateIndicator = null
  }

  @action setAuthenticateIndicator = str => {
    this.authenticateIndicator = str
  }
}