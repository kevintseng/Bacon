import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import { inject, observer } from 'mobx-react'
import { View, ActivityIndicator, InteractionManager } from 'react-native'

import MatchChatTab from './tabs/MatchChatTab'
import VisitorsChatTab from './tabs/VisitorsChatTab'
import SendChatTab from './tabs/SendChatTab'

@inject('ChatStore','SubjectStore','firebase') @observer
export default class ChatTabScene extends Component {

  constructor(props) {
    super(props)
    this.ChatStore = this.props.ChatStore
    this.SubjectStore = this.props.SubjectStore
    this.firebase = this.props.firebase
    this.matchChatRoomsLastMessageListener = new Array
    this.matchChatRoomsNonHandleChatCountListener = new Array
    this.matchChatRoomsOlineListener = new Array
    this.matchChatRoomsChatStatusListener = new Array
    this.vistorChatRoomsLastMessageListener = new Array
    this.vistorChatRoomsNonHandleChatCountListener = new Array
    this.vistorChatRoomsOlineListener = new Array
    this.vistorChatRoomsChatStatusListener = new Array
    this.sendChatRoomsLastMessageListener = new Array
    this.sendChatRoomsOlineListener = new Array
    this.sendChatRoomsChatStatusListener = new Array
  }

  componentWillMount () {
    Actions.refresh({ key: 'Drawer', open: false })
    this.ChatStore.cleanChatModal()
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.task)
  }

  componentWillUnmount() {
    this.matchChatRoomsLastMessageListener.map(ref => ref.off())
    this.matchChatRoomsNonHandleChatCountListener.map(ref => ref.off())
    this.matchChatRoomsOlineListener.map(ref => ref.off())
    this.matchChatRoomsChatStatusListener.map(ref => ref.off())
    this.vistorChatRoomsLastMessageListener.map(ref => ref.off())
    this.vistorChatRoomsNonHandleChatCountListener.map(ref => ref.off())
    this.vistorChatRoomsOlineListener.map(ref => ref.off())
    this.vistorChatRoomsChatStatusListener.map(ref => ref.off())
    this.sendChatRoomsLastMessageListener.map(ref => ref.off())
    this.sendChatRoomsOlineListener.map(ref => ref.off())
    this.sendChatRoomsChatStatusListener.map(ref => ref.off())
  }

  task = async () => {
    await this.fetchChatMatchRooms()
    this.ChatStore.openChatModal()
  }

  onChangeTab = (index) => {
    switch(index) {
      case 0:
        this.fetchChatMatchRooms()
        break;
      case 1:
        this.fetchVistorChatRooms()
        break;
      case 2:
        this.fetchChatSendRooms()
        break;
      default:
      //
    }
  }

  fetchChatMatchRooms = () => {
    let chatRooms = new Array
    return Promise.all([
      this.firebase.database().ref('matchChatRooms').orderByChild('chatRoomCreater').equalTo(this.SubjectStore.uid).once('value'), 
      this.firebase.database().ref('matchChatRooms').orderByChild('chatRoomRecipient').equalTo(this.SubjectStore.uid).once('value')
    ])
    .then(snap => { 
      const chatRoomCreater = snap[0]._value || new Object
      const chatRoomRecipient = snap[1]._value || new Object

      const chatRoomCreaterKeys = Object.keys(chatRoomCreater)
      const chatRoomRecipientKeys = Object.keys(chatRoomRecipient)

      const chatRoomAllKeys = chatRoomCreaterKeys.concat(chatRoomRecipientKeys)

      const chatRoomLastMessagePromise = chatRoomAllKeys.map(chatRoomKey => this.firebase.database().ref('chat_rooms/' + chatRoomKey + '/lastMessage').once('value'))

      const chatRoomCreaterUids = chatRoomCreaterKeys.map(chatRoomKey => chatRoomCreater[chatRoomKey].chatRoomRecipient)
      const chatRoomRecipientUids = chatRoomRecipientKeys.map(chatRoomKey => chatRoomRecipient[chatRoomKey].chatRoomCreater)

      const chatRoomAllUids = chatRoomCreaterUids.concat(chatRoomRecipientUids)

      const chatRoomsPromise = chatRoomAllUids.map(uid => this.firebase.database().ref('users/' + uid).once('value'))

      const chatRoomNonHandleChatCountPromise = chatRoomAllKeys.map((chatRoomKey,index) => this.firebase.database().ref('chat_rooms/' + chatRoomKey + '/' + chatRoomAllUids[index]).once('value'))

      Promise.all(chatRoomNonHandleChatCountPromise)
      .then(nonHandleChatCounts => {
        Promise.all(chatRoomLastMessagePromise)  
        .then(lastMessages => {
          Promise.all(chatRoomsPromise)
          .then(data => {
            chatRoomCreaterKeys.map((chatRoomKey,index) => {
              chatRooms.push({
                key: chatRoomKey,
                prey: chatRoomCreater[chatRoomKey].chatRoomRecipient,
                name: data[index].val().nickname,
                avatar: data[index].val().avatar,
                age: 18,
                lastChatContent: lastMessages[index].val(),
                chatStatus: data[index].val().chatStatus,
                online: data[index].val().online,
                nonHandleChatCount: nonHandleChatCounts[index].val()
                })              
              })

            const chatRoomCreaterKeysSize = chatRoomCreaterKeys.length

            chatRoomRecipientKeys.map((chatRoomKey,index) => {
            chatRooms.push({
              key: chatRoomKey,
              prey: chatRoomRecipient[chatRoomKey].chatRoomCreater,
              name: data[chatRoomCreaterKeysSize + index].val().nickname,
              avatar: data[chatRoomCreaterKeysSize + index].val().avatar,
              age: 18,
              lastChatContent: lastMessages[chatRoomCreaterKeysSize + index].val(),
              chatStatus: data[chatRoomCreaterKeysSize + index].val().chatStatus,
              online: data[chatRoomCreaterKeysSize + index].val().online,
              nonHandleChatCount: nonHandleChatCounts[chatRoomCreaterKeysSize + index].val()
              })              
            })

            this.ChatStore.setMatchChatRooms(chatRooms)

            })
            .then(() => {
              this.matchChatRoomsLastMessageListener = chatRoomAllKeys.map(chatRoomKey => this.firebase.database().ref('chat_rooms/').child(chatRoomKey + '/lastMessage'))
              this.matchChatRoomsNonHandleChatCountListener = chatRoomAllKeys.map((chatRoomKey,index) => this.firebase.database().ref('chat_rooms/').child(chatRoomKey + '/' + chatRoomAllUids[index]))
              this.matchChatRoomsOlineListener = chatRoomAllUids.map(uid => this.firebase.database().ref('users/').child(uid + '/online'))
              this.matchChatRoomsChatStatusListener = chatRoomAllUids.map(uid => this.firebase.database().ref('users/').child(uid + '/chatStatus'))
              this.matchChatRoomsLastMessageListener.map((ref,index) => ref.on('value',snap => {
                  this.ChatStore.setMatchChatRoomsLastMessage(chatRoomAllKeys[index],snap.val())
                })
              )
              this.matchChatRoomsOlineListener.map((ref,index) => ref.on('value',snap => {
                  this.ChatStore.setMatchChatRoomsOnline(chatRoomAllKeys[index],snap.val())
                })
              )
              this.matchChatRoomsChatStatusListener.map((ref,index) => ref.on('value',snap => {
                  this.ChatStore.setMatchChatRoomsChatStatus(chatRoomAllKeys[index],snap.val())
                })
              )
              this.matchChatRoomsNonHandleChatCountListener.map((ref,index) => ref.on('value',snap => {
                  this.ChatStore.setMatchChatRoomsNonHandleChatCounts(chatRoomAllKeys[index],snap.val())
                })
              )
            })
            .catch(err => {
              console.log(err)
            })
          }) 
        }) 
      })  
  }

  fetchVistorChatRooms = () => {
    let chatRooms = new Array
    return Promise.all([
      this.firebase.database().ref('nonHandleChatRooms').orderByChild('chatRoomRecipient').equalTo(this.SubjectStore.uid).once('value')
    ])
    .then(snap => { 
      const chatRoomRecipient = snap[0]._value || new Object
      const chatRoomRecipientKeys = Object.keys(chatRoomRecipient)
      const chatRoomRecipientUids = chatRoomRecipientKeys.map(chatRoomKey => chatRoomRecipient[chatRoomKey].chatRoomCreater)
      // Promise
      const chatRoomRecipientPromise = chatRoomRecipientUids.map(uid => this.firebase.database().ref('users/' + uid).once('value'))
      const chatRoomRecipientLastMessagePromise = chatRoomRecipientKeys.map(chatRoomKey => this.firebase.database().ref('chat_rooms/' + chatRoomKey + '/lastMessage').once('value'))
      const chatRoomRecipientNonHandleChatCountPromise = chatRoomRecipientKeys.map((chatRoomKey,index) => this.firebase.database().ref('chat_rooms/' + chatRoomKey + '/' + chatRoomRecipientUids[index]).once('value'))

      Promise.all(chatRoomRecipientNonHandleChatCountPromise).then(
        nonHandleChatCounts => {
          Promise.all(chatRoomRecipientLastMessagePromise) 
          .then(lastMessages => {
            Promise.all(chatRoomRecipientPromise)
            .then(data => {
              chatRoomRecipientKeys.map((chatRoomKey,index) => {
                chatRooms.push({
                  key: chatRoomKey,
                  prey: chatRoomRecipient[chatRoomKey].chatRoomCreater,
                  name: data[index].val().nickname,
                  avatar: data[index].val().avatar,
                  age: 18,
                  lastChatContent: lastMessages[index].val(),
                  chatStatus: data[index].val().chatStatus,
                  online: data[index].val().online,
                  nonHandleChatCount: nonHandleChatCounts[index].val()
                  })              
                })

              this.ChatStore.setVistorChatRooms(chatRooms)

              })
              .then(() => {
                this.vistorChatRoomsLastMessageListener = chatRoomRecipientKeys.map(chatRoomKey => this.firebase.database().ref('chat_rooms/').child(chatRoomKey + '/lastMessage'))
                this.vistorChatRoomsNonHandleChatCountListener = chatRoomRecipientKeys.map((chatRoomKey,index) => this.firebase.database().ref('chat_rooms/').child(chatRoomKey + '/' + chatRoomRecipientUids[index]))
                this.vistorChatRoomsOlineListener = chatRoomRecipientUids.map(uid => this.firebase.database().ref('users/').child(uid + '/online'))
                this.vistorChatRoomsChatStatusListener = chatRoomRecipientUids.map(uid => this.firebase.database().ref('users/').child(uid + '/chatStatus'))

                this.vistorChatRoomsLastMessageListener.map((ref,index) => ref.on('value',snap => {
                    this.ChatStore.setVistorChatRoomsLastMessage(chatRoomRecipientKeys[index],snap.val())
                  })
                )
                this.vistorChatRoomsOlineListener.map((ref,index) => ref.on('value',snap => {
                    this.ChatStore.setVistorChatRoomsOnline(chatRoomRecipientKeys[index],snap.val())
                  })
                )
                this.vistorChatRoomsChatStatusListener.map((ref,index) => ref.on('value',snap => {
                    this.ChatStore.setVistorChatRoomsChatStatus(chatRoomRecipientKeys[index],snap.val())
                  })
                )
                this.vistorChatRoomsNonHandleChatCountListener.map((ref,index) => ref.on('value',snap => {
                    this.ChatStore.setVistorChatRoomsNonHandleChatCount(chatRoomRecipientKeys[index],snap.val())
                  })
                )
              })
              .catch(err => {
                console.log(err)
              })
            }) 
          })           
        }
      )        
  }

  fetchChatSendRooms = () => {
    let chatRooms = new Array
    return Promise.all([
      this.firebase.database().ref('nonHandleChatRooms').orderByChild('chatRoomCreater').equalTo(this.SubjectStore.uid).once('value'), 
      this.firebase.database().ref('nonMatchChatRooms').orderByChild('chatRoomCreater').equalTo(this.SubjectStore.uid).once('value')
    ])
    .then(snap => { 
      const chatRoomCreater = snap[0]._value || new Object
      const chatRoomRecipient = snap[1]._value || new Object

      const chatRoomCreaterKeys = Object.keys(chatRoomCreater)
      const chatRoomRecipientKeys = Object.keys(chatRoomRecipient)

      const chatRoomAllKeys = chatRoomCreaterKeys.concat(chatRoomRecipientKeys)

      const chatRoomLastMessagePromise = chatRoomAllKeys.map(chatRoomKey => this.firebase.database().ref('chat_rooms/' + chatRoomKey + '/lastMessage').once('value'))

      const chatRoomCreaterUids = chatRoomCreaterKeys.map(chatRoomKey => chatRoomCreater[chatRoomKey].chatRoomRecipient)
      const chatRoomRecipientUids = chatRoomRecipientKeys.map(chatRoomKey => chatRoomRecipient[chatRoomKey].chatRoomCreater)

      const chatRoomAllUids = chatRoomCreaterUids.concat(chatRoomRecipientUids)

      const chatRoomsPromise = chatRoomAllUids.map(uid => this.firebase.database().ref('users/' + uid).once('value'))
          
      Promise.all(chatRoomLastMessagePromise)
      .then(lastMessages => {
        Promise.all(chatRoomsPromise)
        .then(data => {
          chatRoomCreaterKeys.map((chatRoomKey,index) => {
            chatRooms.push({
              key: chatRoomKey,
              prey: chatRoomCreater[chatRoomKey].chatRoomRecipient,
              name: data[index].val().nickname,
              avatar: data[index].val().avatar,
              age: 18,
              lastChatContent: lastMessages[index].val(),
              chatStatus: data[index].val().chatStatus,
              online: data[index].val().online,
              nonHandleChatCount: 0 
              })              
            })

          const chatRoomCreaterKeysSize = chatRoomCreaterKeys.length

          chatRoomRecipientKeys.map((chatRoomKey,index) => {
          chatRooms.push({
            key: chatRoomKey,
            prey: chatRoomRecipient[chatRoomKey].chatRoomCreater,
            name: data[chatRoomCreaterKeysSize + index].val().nickname,
            avatar: data[chatRoomCreaterKeysSize + index].val().avatar,
            age: 18,
            lastChatContent: lastMessages[chatRoomCreaterKeysSize + index].val(),
            chatStatus: data[chatRoomCreaterKeysSize + index].val().chatStatus,
            online: data[chatRoomCreaterKeysSize + index].val().online,
            nonHandleChatCount: 0 
            })              
          })

          this.ChatStore.setSendChatRooms(chatRooms)

          })
          .then(() => {
            this.sendChatRoomsLastMessageListener = chatRoomAllKeys.map(chatRoomKey => this.firebase.database().ref('chat_rooms/').child(chatRoomKey + '/lastMessage'))
            this.sendChatRoomsOlineListener = chatRoomAllUids.map(uid => this.firebase.database().ref('users/').child(uid + '/online'))
            this.sendChatRoomsChatStatusListener = chatRoomAllUids.map(uid => this.firebase.database().ref('users/').child(uid + '/chatStatus'))
            this.sendChatRoomsLastMessageListener.map((ref,index) => ref.on('value',snap => {
                this.ChatStore.setSendChatRoomsLastMessage(chatRoomAllKeys[index],snap.val())
              })
            )
            this.sendChatRoomsOlineListener.map((ref,index) => ref.on('value',snap => {
                this.ChatStore.setSendChatRoomsOnline(chatRoomAllKeys[index],snap.val())
              })
            )
            this.sendChatRoomsChatStatusListener.map((ref,index) => ref.on('value',snap => {
                this.ChatStore.setSendChatRoomsChatStatus(chatRoomAllKeys[index],snap.val())
              })
            )
          })
          .catch(err => {
            console.log(err)
          })
        })
      }) 
  }

  render() {
    return(
     <View style={{flex: 1}}>
        { this.ChatStore.chatModal ?
        <View style={{flex: 1,justifyContent: 'center'}}>
          <ActivityIndicator
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              paddingBottom: 110
            }}
            size="large"
            color='#d63768'
          />
        </View> :
      <ScrollableTabView
        initialPage = { this.props.initialPage || 0 }
        tabBarPosition='top'
        renderTabBar={() => <DefaultTabBar />}
        tabBarUnderlineStyle={{ backgroundColor: '#d63768' }}
        tabBarBackgroundColor='white'
        tabBarActiveTextColor='#d63768'
        tabBarInactiveTextColor='#606060'
        onChangeTab={tab => {
          this.onChangeTab(tab.i)
        }}
        ref={ (tabView) => { this.tabView = tabView } }
        >
        <MatchChatTab label='MatchChat' tabLabel='好友訊息' />
        <VisitorsChatTab label='VisitorsChat' tabLabel='來訪訊息' />
        <SendChatTab label='SendChat' tabLabel='已發招呼' />
      </ScrollableTabView>
      }
    </View>
    )
  }
}

