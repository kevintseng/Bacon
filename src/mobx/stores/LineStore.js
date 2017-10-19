import { useStrict, observable, action, computed, runInAction } from 'mobx'
import { calculateAge } from '../../app/Utils'
import localdb from '../../configs/localdb'

export default class LineStore {
  // user data
  @observable conversations

  constructor(firebase) {
    this.firebase = firebase
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
    this.conversations = []
  }

  @action setUid = uid => {
    this.uid = uid
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

  @computed get convListToArray() {
    return Object.keys(this.conversations).map((key) => (this.conversations[key]))
  }

  @action fetchConvList = () => {
    this.fetchList = this.firebase.database().ref('users/' + this.uid + '/conversations').orderByChild("priority")
    this.fetchList.once('value').then(snap => {
      if(snap.val()) {
        console.log("fetchConvList: ", snap.val())
        snap.forEach(child => {
          // console.log("priority: ", child.val().priority)
          const convKey = child.val().convKey
          const theOtherUid = child.key
          const priority = child.val().priority
          const visit = child.val().visit ? child.val().visit : false
          const convRef = this.firebase
            .database()
            .ref(`conversations/${convKey}`)

          let convData = {}

          convRef.once("value").then(s => {
            if (s.exists()) {
              runInAction(() => {
                const myUid = this.uid
                // console.log("s.val(): ", s.val())
                const myData = s.val().users[myUid]
                const theOtherData = s.val().users[theOtherUid]
                // console.log("myData: ", myData)
                // console.log("theOtherData: ", theOtherData)
                convData = {
                  convKey,
                  unread: myData.unread,
                  lastRead: myData.lastRead,
                  visit,
                  uid: theOtherUid,
                  chatStatus: 0,
                  priority,
                  name: theOtherData.name,
                  avatar: theOtherData.avatar,
                  birthday: theOtherData.birthday,
                  online: false,
                  subtitle: null,
                }
                this.addConv(convKey, convData)
                // this.conversations.push(convData)
              })
            }
          })
        })
      }
    })
  }

  // @action onlineListener(userId, key, on) {
  //   const ref = this.firebase.database().ref(`online/${userId}`)
  //   const listen = snap => {
  //     const newConvs = this.state.convs
  //     if (snap.exists()) {
  //       // console.log(newConvs[key].name, " is online")
  //       newConvs[key].online = true
  //       this.setState({ convs: newConvs })
  //     } else {
  //       // console.log(newConvs[key].name, " is offline")
  //       newConvs[key].online = false
  //       this.setState({ convs: newConvs })
  //     }
  //     return newConvs
  //   }
  //
  //   if (on) {
  //     // console.log("onlineListener on: ", userId)
  //     return ref.on("value", listen)
  //   }
  //   // console.log("onlineListener off: ", userId)
  //   return ref.off("value", listen)
  // }

}
