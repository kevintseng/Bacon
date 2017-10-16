import { useStrict, observable, action, computed } from 'mobx'
import { calculateAge } from '../../app/Utils'
import localdb from '../../configs/localdb'

export default class LineStore {
  // user data
  @observable avatar
  @observable nickname
  @observable birthday
  @observable vip
  @observable conversations
  @observable chatStatus

  constructor() {
    this.initialize()
  }

  // String to Value

  @computed get age() {
    return calculateAge(this.birthday)
  }

  // Object to Array FlatList

  @computed get conversationsToFlatList() {
    return
  }

  // action

  @action initialize = () => {
    // user data
    this.uid = null
    this.nickname = null
    this.birthday = null
    this.avatar = null
    this.vip = false
    this.conversations = null
    this.chatStatus = null
    this.fetchConvQuery = null
  }

  @action setChatStatus = status => {
    this.chatStatus = status
  }

  @action setConversations = object => {
    this.conversations = object
  }

  @action addConv = (key, data) => {
    this.conversations[key] = data
    this.conversations = Object.assign({}, this.conversations)
  }

  @action deleteConv = (key) => {
    delete this.conversations[key]
    this.conversations = Object.assign({}, this.conversations)
  }

  @action fetchConv = () => {
    this.fetchConvQuery = this.firebase.database().ref('users/' + this.uid + '/conversations')
    this.fetchConvQuery.once('value').then(snap => {
      if(snap.val()) {
        console.log("Conversations: ", snap.val())
      }
    })
  }

}
