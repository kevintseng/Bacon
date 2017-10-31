import { observable, action, computed, useStrict, runInAction, toJS } from 'mobx'

useStrict(true)

export default class ChatStore {

  @observable messages

  constructor(firebase) {
    this.firebase = firebase
    this.initialize()
  }

  @action initialize = () => {
    this.preyID = null
    this.messagesQuery = null
    this.hunterQuery = null
    this.chatRoomKey = null
    this.messages = new Array
    this.hunter = null
  }

  @action setUid = uid => {
    this.uid = uid
  }

  @action setChatRoomKey = key => {
    this.chatRoomKey = key
  }

  @action listenHunter = () => {
    this.hunterQuery = this.firebase.database().ref('chats/' + this.chatRoomKey + '/hunter')
    this.hunterQuery.on('value', child => {
      //console.warn(child.val())
      this.setHunter(child.val())
    })
  }

  @action fetchMessages = () => {
    this.initMessages()
    this.messagesQuery = this.firebase.database().ref('chats/' + this.chatRoomKey + '/messages')
    this.messagesQuery.on('value', child => {
      this.setMessages(child.val()) // 改成child_added
    })
  }

  @action initMessages = () => {
    this.messages = new Array
    this.slefMessagesArray = new Array
    this.preyMessagesArray = new Array
    this.allMessages = new Array    
  }

  @action removeMessagesListener = () => {
    if (this.messagesQuery) {
      this.messagesQuery.off()
      this.messagesQuery = null
    }
  }

  @action removeHunterListener = () => {
    if (this.hunterQuery) {
      this.hunterQuery.off()
      this.hunterQuery = null
    }
  }

  @action setMessages = messages => {
    if (messages) {

      this.slefMessages = messages[this.uid]
      if (this.slefMessages) {
        this.slefMessagesArray = Object.keys(this.slefMessages).map(time => {
          return(
            {
              _id: time, // 時間越大放越上面
              text: this.slefMessages[time],
              createdAt: new Date(parseInt(time)),
              user: {
                _id: this.uid, 
              },
            }
          )
        })
      }

      this.preyID = Object.keys(messages).find(key => key !== this.uid)
      this.preyMessages = messages[this.preyID] // prey
      if (this.preyMessages) {
        this.firebase.database().ref('users/' + this.preyID + '/avatar').once('value',snap => {
          this.preyMessagesArray = Object.keys(this.preyMessages).map(time => {
            return(
              {
                _id: time, // 時間越大放越上面
                text: this.preyMessages[time],
                createdAt: new Date(parseInt(time)),
                user: {
                  _id: time,
                  avatar: snap.val(), // 補上
                },
              }
            )
          })
          this.combineMessages()
        })
      } else {
        this.combineMessages()
      } 
    }
  }

  @action combineMessages = () => {
    this.allMessages = this.slefMessagesArray.concat(this.preyMessagesArray).sort((a, b) => {
      return a._id < b._id ? 1 : -1
    })
    this.messages = toJS(this.allMessages)   
  }

  @action onSend(messages = []) {
    const messages_no_blank = messages[0].text.trim()
    if (messages_no_blank.length > 0) {
      this.firebase.database().ref('chats/' + this.chatRoomKey + '/messages/' + this.uid + '/' + Date.now()).set(messages[0].text)
      .then(()=>{
        if (!this.hunter) {
          this.firebase.database().ref('chats/' + this.chatRoomKey + '/hunter').set(this.uid)
          alert('你成為訊息發送者(兩次發話限制)')
        }
      })
    }
  }

  @action setHunter = val => {
    this.hunter = val
    //console.warn(val)
  }



}