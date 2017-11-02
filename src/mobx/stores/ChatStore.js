import { observable, action, computed, useStrict, runInAction, toJS } from 'mobx'

useStrict(true)

export default class ChatStore {

  @observable messages
  @observable chatMatchPrey
  @observable chatRoomCreaterPrey

  constructor(firebase) {
    this.firebase = firebase
    this.initialize()
  }

  @action initialize = () => {
    /////////chat_rooms////////////
    this.chatMatchPool = new Object
    this.chatMatchPrey = new Array
    this.chatRoomCreaterPool = new Object
    this.chatRoomCreaterPrey = new Array
    /////////chats////////////
    this.chatRoomCreaterQuery = null
    this.messagesQuery = null
    this.chatRoomCreater = null
    this.chatRoomKey = null
    this.preyID = null
    this.messages = new Array
  }

  @action addPreyToChatMatchPool = (uid,prey,name,avatar,lastMessage,age) => {
    this.chatMatchPool[uid] = { prey: prey, name: name, avatar: avatar, lastMessage: lastMessage, age: age }
  }

  @action addPreyToChatRoomCreaterPool = (uid,prey,name,avatar,lastMessage,age) => {
    this.chatRoomCreaterPool[uid] = { prey: prey, name: name, avatar: avatar, lastMessage: lastMessage, age: age }
  }

  @action setUid = uid => {
    this.uid = uid
  }

  @action setChatRoomKey = (key,preyID) => {
    this.chatRoomKey = key
    this.preyID = preyID
  }

  @action listenChatRoomCreater = () => {
    this.chatRoomCreaterQuery = this.firebase.database().ref('chats/' + this.chatRoomKey + '/chatRoomCreater')
    this.chatRoomCreaterQuery.on('value', child => {
      this.chatRoomCreater = child.val()
    })
  }

  @action listenMessages = () => {
    this.initMessages()
    this.messagesQuery = this.firebase.database().ref('chats/' + this.chatRoomKey + '/messages')
    this.messagesQuery.on('value', child => {
      this.setMessages(child.val()) // 改成child_added
    })
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

      //this.preyID = Object.keys(messages).find(key => key !== this.uid)
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
    this.sortMessages = this.slefMessagesArray.concat(this.preyMessagesArray).sort((a, b) => {
      return a._id < b._id ? 1 : -1
    })
    this.messages = toJS(this.sortMessages)   
  }

  @action onSend(messages = []) {
    const messages_no_blank = messages[0].text.trim()
    if (messages_no_blank.length > 0) {
      this.firebase.database().ref('chats/' + this.chatRoomKey + '/messages/' + this.uid + '/' + Date.now()).set(messages[0].text)
      .then(
        this.setChatRoomCreater(messages[0].text)
      )
    }
  }

  @action setChatRoomCreater = (text) => {
    if (!this.chatRoomCreater) {
      this.firebase.database().ref('chats/' + this.chatRoomKey + '/chatRoomCreater').set(this.uid)
      this.firebase.database().ref('chat_rooms/' + this.chatRoomKey).set({
        chatRoomCreater: this.uid,
        interested: 0,
        lastMessage: text,
        chatRoomRecipient: this.preyID
      })
      alert('你成為訊息發送者(兩次發話限制)')
    } else {
      this.firebase.database().ref('chat_rooms/' + this.chatRoomKey + '/lastMessage').set(text)
    }  
  }

  @action setChatMatchRealPrey = () => {
    this.chatMatchPrey = Object.keys(this.chatMatchPool).map((key)=>{
      return(
        {
          key: key,
          prey: this.chatMatchPool[key].prey,
          name: this.chatMatchPool[key].name,
          avatar: {uri: this.chatMatchPool[key].avatar},
          age: this.chatMatchPool[key].age,
          lastChatContent: this.chatMatchPool[key].lastMessage,
          userState: '平淡中',
          userStateColor: '#FFD306'          
        }
      )
    })
  }

  @action setchatRoomCreaterRealPrey = () => {
    this.chatRoomCreaterPrey = Object.keys(this.chatRoomCreaterPool).map((key)=>{
      return(
        {
          key: key,
          prey: this.chatRoomCreaterPool[key].prey,
          name: this.chatRoomCreaterPool[key].name,
          avatar: {uri: this.chatRoomCreaterPool[key].avatar},
          age: this.chatRoomCreaterPool[key].age,
          lastChatContent: this.chatRoomCreaterPool[key].lastMessage,
          userState: '平淡中',
          userStateColor: '#FFD306'          
        }
      )
    })
  }

  //// 初始化

  @action initMessages = () => {
    this.slefMessagesArray = new Array
    this.preyMessagesArray = new Array
    this.sortMessages = new Array
    this.messages = new Array
    this.removeMessagesListener()    
  }

  @action removeMessagesListener = () => {
    if (this.messagesQuery) {
      this.messagesQuery.off()
      this.messagesQuery = null
    }
  }

  @action removeChatRoomCreaterListener = () => {
    if (this.chatRoomCreaterQuery) {
      this.chatRoomCreaterQuery.off()
      this.chatRoomCreaterQuery = null
    }
  }

}