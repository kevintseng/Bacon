import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import { inject, observer } from 'mobx-react'
import { View, ActivityIndicator, InteractionManager } from 'react-native'

import MatchChatContainer from '../../../containers/ChatTabScene/MatchChatContainer'
import VisitorsChatContainer from '../../../containers/ChatTabScene/VisitorsChatContainer'
import SendChatContainer from '../../../containers/ChatTabScene/SendChatContainer'

@inject('ChatStore','SubjectStore','firebase') @observer
export default class ChatTabScene extends Component {

  constructor(props) {
    super(props)
    this.ChatStore = this.props.ChatStore
    this.SubjectStore = this.props.SubjectStore
    this.firebase = this.props.firebase
  }

  componentWillMount () {
    Actions.refresh({ key: 'Drawer', open: false })
    this.ChatStore.cleanChatModal()
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.task)
  }

  componentWillUnmount() {
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
    Promise.all([
      this.firebase.database().ref('matchChatRooms').orderByChild('chatRoomCreater').equalTo(this.SubjectStore.uid).once('value'), 
      this.firebase.database().ref('matchChatRooms').orderByChild('chatRoomRecipient').equalTo(this.SubjectStore.uid).once('value')
    ])
    .then(snap => { 
      const chatRoomCreater = snap[0]._value || new Object
      const chatRoomRecipient = snap[1]._value || new Object
      const chatRoomCreaterKeys = Object.keys(chatRoomCreater)
      const chatRoomRecipientKeys = Object.keys(chatRoomRecipient)
      const chatRoomCreaterPromise = chatRoomCreaterKeys.map(chatRoomKey => this.firebase.database().ref('users/' + chatRoomCreater[chatRoomKey].chatRoomRecipient).once('value'))
      const chatRoomRecipientPromise = chatRoomRecipientKeys.map(chatRoomKey => this.firebase.database().ref('users/' + chatRoomRecipient[chatRoomKey].chatRoomCreater).once('value'))
      
      const chatRoomCreaterLastMessagePromise = chatRoomCreaterKeys.map(chatRoomKey => this.firebase.database().ref('chat_rooms/' + chatRoomKey + '/lastMessage').once('value'))
      const chatRoomRecipientLastMessagePromise = chatRoomRecipientKeys.map(chatRoomKey => this.firebase.database().ref('chat_rooms/' + chatRoomKey + '/lastMessage').once('value'))

      const chatRoomsPromise = chatRoomCreaterPromise.concat(chatRoomRecipientPromise)
      const chatRoomLastMessagePromise = chatRoomCreaterLastMessagePromise.concat(chatRoomRecipientLastMessagePromise)
        
      Promise.all (chatRoomLastMessagePromise)  
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
            chatStatus: data[index].val().chatStatus,
            online: data[index].val().online,
            nonHandleChatCount: 0 
            })              
          })

          this.ChatStore.setMatchChatRooms(chatRooms)

          })
          .catch(err => {
            console.log(err)
          })
        }) 
      })   
  }

  fetchVistorChatRooms = () => {
    let chatRooms = new Array
    Promise.all([
      this.firebase.database().ref('nonHandleChatRooms').orderByChild('chatRoomRecipient').equalTo(this.SubjectStore.uid).once('value')
    ])
    .then(snap => { 
      const chatRoomRecipient = snap[0]._value || new Object
      const chatRoomRecipientKeys = Object.keys(chatRoomRecipient)
      const chatRoomRecipientPromise = chatRoomRecipientKeys.map(chatRoomKey => this.firebase.database().ref('users/' + chatRoomRecipient[chatRoomKey].chatRoomCreater).once('value'))
      const chatRoomRecipientLastMessagePromise = chatRoomRecipientKeys.map(chatRoomKey => this.firebase.database().ref('chat_rooms/' + chatRoomKey + '/lastMessage').once('value'))
          
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
              nonHandleChatCount: 0 
              })              
            })

          this.ChatStore.setVistorChatRooms(chatRooms)

          })
          .catch(err => {
            console.log(err)
          })
        }) 
      })         
  }

  fetchChatSendRooms = () => {
    let chatRooms = new Array
    Promise.all([
      this.firebase.database().ref('nonHandleChatRooms').orderByChild('chatRoomCreater').equalTo(this.SubjectStore.uid).once('value'), 
      this.firebase.database().ref('nonMatchChatRooms').orderByChild('chatRoomCreater').equalTo(this.SubjectStore.uid).once('value')
    ])
    .then(snap => { 
      const chatRoomCreater = snap[0]._value || new Object
      const chatRoomRecipient = snap[1]._value || new Object
      const chatRoomCreaterKeys = Object.keys(chatRoomCreater)
      const chatRoomRecipientKeys = Object.keys(chatRoomRecipient)
      const chatRoomCreaterPromise = chatRoomCreaterKeys.map(chatRoomKey => this.firebase.database().ref('users/' + chatRoomCreater[chatRoomKey].chatRoomRecipient).once('value'))
      const chatRoomRecipientPromise = chatRoomRecipientKeys.map(chatRoomKey => this.firebase.database().ref('users/' + chatRoomRecipient[chatRoomKey].chatRoomCreater).once('value'))
      const chatRoomCreaterLastMessagePromise = chatRoomCreaterKeys.map(chatRoomKey => this.firebase.database().ref('chat_rooms/' + chatRoomKey + '/lastMessage').once('value'))
      const chatRoomRecipientLastMessagePromise = chatRoomRecipientKeys.map(chatRoomKey => this.firebase.database().ref('chat_rooms/' + chatRoomKey + '/lastMessage').once('value'))

      const chatRoomsPromise = chatRoomCreaterPromise.concat(chatRoomRecipientPromise)
      const chatRoomLastMessagePromise = chatRoomCreaterLastMessagePromise.concat(chatRoomRecipientLastMessagePromise)
          
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
            chatStatus: data[index].val().chatStatus,
            online: data[index].val().online,
            nonHandleChatCount: 0 
            })              
          })

          this.ChatStore.setSendChatRooms(chatRooms)

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
        <MatchChatContainer label='MatchChat' tabLabel='好友訊息' />
        <VisitorsChatContainer label='VisitorsChat' tabLabel='來訪訊息' />
        <SendChatContainer label='SendChat' tabLabel='已發招呼' />
      </ScrollableTabView>
      }
    </View>
    )
  }
}

