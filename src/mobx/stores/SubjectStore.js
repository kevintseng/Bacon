import { observable, action, useStrict } from 'mobx'

useStrict(true)

export default class SubjectStore {

  @observable uid
  @observable displayName

  constructor() {
    this.uid = null
    this.displayName = '同步中...'
  }

  @action setUid = uid => {
    this.uid = uid
  }

  @action setDisplayName = displayName => {
    this.displayName = displayName
  }

}