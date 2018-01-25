import { observable, action, computed, useStrict, runInAction, toJS } from 'mobx'

useStrict(false)

export default class ChatStore {

  @observable chatSendLoading
  @observable chatMatchLoading
  @observable chatVistorLoading

  @observable chatMatchPrey
  @observable chatSendPrey
  @observable chatVistorPrey

  @observable MessagesAndImages
  @observable chatMatchModal
  @observable chatModal

  @observable goToChatTab

  constructor(firebase) {
    this.firebase = firebase
    this.initialize()
  }

  @action initialize = () => {
    /////////loading////////////
    this.chatSendLoading = true
    this.chatMatchLoading = true
    this.chatVistorLoading = true
    /////////chatList////////////
    this.chatSendPrey = new Array
    this.chatMatchPrey = new Array
    this.chatVistorPrey = new Array
    /////////chatRoom////////////
    this.chatRoomCreaterQuery = null
    this.messagesQuery = null
    this.imagesQuery = null
    this.chatRoomCreater = null
    this.chatRoomKey = null
    this.preyID = null
    this.MessagesAndImages = new Array
    this.nickname = null
    this.from = null
    this.goToChatTab = false
    //this.chatMatchModal = true
    //this.chatModal = true
  }

  @action setGoToChatTab = boolean => {
    this.goToChatTab = boolean
  }

  @action startChatSendLoading = () => {
    this.chatSendLoading = true
  }

  @action startChatMatchLoading = () => {
    this.chatMatchLoading = true
  }

  @action startChatVistorLoading = () => {
    this.chatVistorLoading = true
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
  // Chat Lists
  // Match
  @action setMatchChatRooms = arr => {
    this.chatMatchPrey = arr
    this.chatMatchLoading = false
  }

  @action setMatchChatRoomsLastMessage = (chatRoomKey,str) => {
    const obj = this.chatMatchPrey.find(ele => ele.key === chatRoomKey)
    if (obj) {
      obj.lastChatContent = str
    }
  }

  @action setMatchChatRoomsOnline = (chatRoomKey,boolean) => {
    const obj = this.chatMatchPrey.find(ele => ele.key === chatRoomKey)
    if (obj) {
      obj.online = boolean
    }
  }

  @action setMatchChatRoomsChatStatus = (chatRoomKey,chatStatus) => {
    const obj = this.chatMatchPrey.find(ele => ele.key === chatRoomKey)
    if (obj) {
      obj.chatStatus = chatStatus
    }
  }

  @action setMatchChatRoomsNonHandleChatCounts = (chatRoomKey,nonHandleChatCount) => {
    const obj = this.chatMatchPrey.find(ele => ele.key === chatRoomKey)
    if (obj) {
      obj.nonHandleChatCount = nonHandleChatCount
    }     
  }

  // Vistor
  @action setVistorChatRooms = arr => {
    this.chatVistorPrey = arr
    this.chatVistorLoading = false
  }

  @action setVistorChatRoomsLastMessage = (chatRoomKey,str) => {
    const obj = this.chatVistorPrey.find(ele => ele.key === chatRoomKey)
    if (obj) {
      obj.lastChatContent = str
    }
  }

  @action setVistorChatRoomsOnline = (chatRoomKey,boolean) => {
    const obj = this.chatVistorPrey.find(ele => ele.key === chatRoomKey)
    if (obj) {
      obj.online = boolean
    }  
  }

  @action setVistorChatRoomsChatStatus = (chatRoomKey,chatStatus) => {
    const obj = this.chatVistorPrey.find(ele => ele.key === chatRoomKey)
    if (obj) {
      obj.chatStatus = chatStatus
    }  
  }

  @action setVistorChatRoomsNonHandleChatCount = (chatRoomKey,nonHandleChatCount) => {
    const obj = this.chatVistorPrey.find(ele => ele.key === chatRoomKey)
    if (obj) {
      obj.nonHandleChatCount = nonHandleChatCount
    }     
  }

  // Send
  @action setSendChatRooms = arr => {
    this.chatSendPrey = arr
    this.chatSendLoading = false
  }

  @action setSendChatRoomsLastMessage = (chatRoomKey,str) => {
    const obj = this.chatSendPrey.find(ele => ele.key === chatRoomKey)
    if (obj) {
      obj.lastChatContent = str
    }
  }

  @action setSendChatRoomsOnline = (chatRoomKey,boolean) => {
    const obj = this.chatSendPrey.find(ele => ele.key === chatRoomKey)
    if (obj) {
      obj.online = boolean
    }
  }

  @action setSendChatRoomsChatStatus = (chatRoomKey,chatStatus) => {
    const obj = this.chatSendPrey.find(ele => ele.key === chatRoomKey)
    if (obj) {
      obj.chatStatus = chatStatus
    }
  }

  // 配對機制

  @action removeVistorChatRooms = chatRoomKey => {
    this.chatVistorPrey = this.chatVistorPrey.filter(ele => ele.key !== chatRoomKey)
  }

  //@action cleanChatModal = () => {
  //  this.chatModal = true
  //}

  //@action openChatModal = () => {
  //  this.chatModal = false
  //}

}