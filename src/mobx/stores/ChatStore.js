import { observable, action, computed, useStrict, runInAction, toJS } from 'mobx'

useStrict(true)

export default class ChatStore {

  @observable MessagesAndImages
  @observable chatMatchPrey
  @observable chatRoomCreaterPrey
  @observable chatVistorPrey
  @observable chatMatchModal

  constructor(firebase) {
    this.firebase = firebase
    this.initialize()
  }

  @action initialize = () => {
    /////////chat_rooms////////////
    //this.chatMatchPool = new Object
    this.chatRoomCreaterPool = new Object
    this.chatRoomRecipientPool = new Object
    this.chatSendPrey = new Array
    this.chatMatchPrey = new Array
    this.chatVistorPrey = new Array
    /////////chats////////////
    this.chatRoomCreaterQuery = null
    this.messagesQuery = null
    this.imagesQuery = null
    this.chatRoomCreater = null
    this.chatRoomKey = null
    this.preyID = null
    this.MessagesAndImages = new Array
    this.nickname = null
    this.from = null
    this.chatMatchModal = true
  }

  @action addPreyToChatRoomCreaterPool = (uid,interested,prey,name,avatar,lastMessage,age) => {
    this.chatRoomCreaterPool[uid] = { interested: interested, prey: prey, name: name, avatar: avatar, lastMessage: lastMessage, age: age }
  }

  @action changeChatRoomCreaterPoolLastMessage = (uid,message) => {
    this.chatRoomCreaterPool[uid].lastMessage = message
  }

  @action changeChatRoomCreaterPoolInterested = (uid,val) => {
    this.chatRoomCreaterPool[uid].interested = val
  }

  @action addPreyToChatRoomRecipientPool = (uid,interested,prey,name,avatar,lastMessage,age) => {
    this.chatRoomRecipientPool[uid] = { interested: interested, prey: prey, name: name, avatar: avatar, lastMessage: lastMessage, age: age }
  }

  @action changeChatRoomRecipientPoolLastMessage = (uid,message) => {
    this.chatRoomRecipientPool[uid].lastMessage = message
  }

  @action changeChatRoomRecipientPoolInterested = (uid,val) => {
    this.chatRoomRecipientPool[uid].interested = val
  }

  @action setUid = uid => {
    this.uid = uid
  }

  @action setNickname = nickname => {
    this.nickname = nickname
  }

  @action setFrom = str => {
    this.from = str
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
    this.imagesQuery = this.firebase.database().ref('chats/' + this.chatRoomKey + '/images')
    this.messagesQuery.on('value', child => {
      this.setMessages(child.val()) // 改成child_added
    })
    this.imagesQuery.on('value', child => {
      this.setImages(child.val()) // 改成child_added
    })
  }

  @action setMessages = (messages) => {
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
          this.combineMessagesAndImages()
        })
      } else {
        this.combineMessagesAndImages()
      } 
    }
  }

  @action setImages = (images) => {
    if (images) {

      this.slefImages = images[this.uid]
      if (this.slefImages) {
        this.slefImagesArray = Object.keys(this.slefImages).map(time => {
          return(
            {
              _id: time, // 時間越大放越上面
              text: null,
              createdAt: new Date(parseInt(time)),
              user: {
                _id: this.uid, 
              },
              image: this.slefImages[time]
            }
          )
        })
      }

      this.preyImages = images[this.preyID] // prey
      if (this.preyImages) {
        this.firebase.database().ref('users/' + this.preyID + '/avatar').once('value',snap => {
          this.preyImagesArray = Object.keys(this.preyImages).map(time => {
            return(
              {
                _id: time, // 時間越大放越上面
                text: null,
                createdAt: new Date(parseInt(time)),
                user: {
                  _id: time,
                  avatar: snap.val(), // 補上
                },
                image: this.preyImages[time]
              }
            )
          })
          this.combineMessagesAndImages()
        })
      } else {
        this.combineMessagesAndImages()
      } 
    }
  }

  @action combineMessagesAndImages = () => {
    this.messages = this.slefMessagesArray.concat(this.preyMessagesArray)
    this.images = this.slefImagesArray.concat(this.preyImagesArray)
    this.combined = this.messages.concat(this.images)
    this.sorted = this.combined.sort((a, b) => {
      return a._id < b._id ? 1 : -1
    })
    this.MessagesAndImages = toJS(this.sorted)   
  }

  @action onSend(messages = []) {
    const messages_no_blank = messages[0].text.trim()
    if (messages_no_blank.length > 0) {
      if (this.from === 'visitors') {
        this.matchAndSendMessage(messages)
      } else {
        this.sendMessage(messages)
      }
    }
  }

  @action onSendImage = imageURL => {
    if (this.from === 'visitors') {
      this.matchAndSendImage(imageURL)
    } else {
      this.sendImage(imageURL)
    }
  }

  @action setChatRoomCreater = (text) => {
    if (!this.chatRoomCreater) {
      this.firebase.database().ref('chats/' + this.chatRoomKey + '/chatRoomCreater').set(this.uid)
      this.firebase.database().ref('chat_rooms/' + this.chatRoomKey).set({
        chatRoomCreater: this.uid,
        interested: 1, //未處理
        lastMessage: text,
        chatRoomRecipient: this.preyID
      })
      alert('你成為訊息發送者(兩次發話限制)')
    } else {
      this.firebase.database().ref('chat_rooms/' + this.chatRoomKey + '/lastMessage').set(text)
    }  
  }

  @action setChatMatchRealPrey = () => {
    const chatRoomCreaterMatch = Object.keys(this.chatRoomCreaterPool).filter(key => this.chatRoomCreaterPool[key].interested === 2).map((key)=>{
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

    const chatRoomRecipientMatch = Object.keys(this.chatRoomRecipientPool).filter(key => this.chatRoomRecipientPool[key].interested === 2).map((key)=>{
      return(
        {
          key: key,
          prey: this.chatRoomRecipientPool[key].prey,
          name: this.chatRoomRecipientPool[key].name,
          avatar: {uri: this.chatRoomRecipientPool[key].avatar},
          age: this.chatRoomRecipientPool[key].age,
          lastChatContent: this.chatRoomRecipientPool[key].lastMessage,
          userState: '平淡中',
          userStateColor: '#FFD306'          
        }
      )
    })

    this.chatMatchPrey = chatRoomCreaterMatch.concat(chatRoomRecipientMatch)

    // 還要合併另外一個
  }

  @action setChatSendRealPrey = () => {
    this.chatSendPrey = Object.keys(this.chatRoomCreaterPool).filter(key => this.chatRoomCreaterPool[key].interested !== 2).map((key)=>{
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

  @action setChatVistorRealPrey = () => {
    this.chatVistorPrey = Object.keys(this.chatRoomRecipientPool).filter(key => this.chatRoomRecipientPool[key].interested === 1).map((key)=>{
      return(
        {
          key: key,
          prey: this.chatRoomRecipientPool[key].prey,
          name: this.chatRoomRecipientPool[key].name,
          avatar: {uri: this.chatRoomRecipientPool[key].avatar},
          age: this.chatRoomRecipientPool[key].age,
          lastChatContent: this.chatRoomRecipientPool[key].lastMessage,
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
    this.slefImagesArray = new Array
    this.preyImagesArray = new Array
    this.messages = null
    this.images = null
    this.combined = null
    this.sorted = null
    this.MessagesAndImages = new Array
    this.removeMessagesListener()    
  }

  @action removeMessagesListener = () => {
    if (this.messagesQuery) {
      this.messagesQuery.off()
      this.messagesQuery = null
    }
    if (this.imagesQuery) {
      this.imagesQuery.off()
      this.imagesQuery = null
    }
  }

  @action removeChatRoomCreaterListener = () => {
    if (this.chatRoomCreaterQuery) {
      this.chatRoomCreaterQuery.off()
      this.chatRoomCreaterQuery = null
    }
  }

  @action closeChatMatchModal = () => {
    this.chatMatchModal = false
  }

  @action openChatMatchModal = () => {
    this.chatMatchModal = true
  }

  @action matchAndSendMessage = messages => {
    this.firebase.database().ref('chat_rooms/' + this.chatRoomKey + '/interested').set(2).then(
      () => {
        this.setChatVistorRealPrey()
        this.setChatMatchRealPrey() // 看能不能調成更快的演算法
        this.closeChatMatchModal()
        this.sendMessage(messages)
      }
    )    
  }

  @action matchAndSendImage = imageURL => {
    this.firebase.database().ref('chat_rooms/' + this.chatRoomKey + '/interested').set(2).then(
      () => {
        this.setChatVistorRealPrey()
        this.setChatMatchRealPrey() // 看能不能調成更快的演算法
        this.closeChatMatchModal()
        this.sendImage(imageURL)
      }
    )     
  }

  @action sendMessage = messages => {
    this.firebase.database().ref('chats/' + this.chatRoomKey + '/messages/' + this.uid + '/' + Date.now()).set(messages[0].text)
    .then(
      this.setChatRoomCreater(messages[0].text)
    )    
  }

  @action sendImage = imageURL => {
    this.firebase.database().ref('chats/' + this.chatRoomKey + '/images/' + this.uid + '/' + Date.now()).set(imageURL)
      .then(
        this.setChatRoomCreater('傳送了圖片')
    )    
  }
}