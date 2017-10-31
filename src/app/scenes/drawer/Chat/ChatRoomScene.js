import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import BaconChatRoom from '../../../views/BaconChatRoom/BaconChatRoom'

@inject('firebase','FateStore','SubjectStore','ChatStore') @observer
export default class ChatRoomScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.FateStore = this.props.FateStore
    this.SubjectStore = this.props.SubjectStore
    this.ChatStore = this.props.ChatStore
    this.state = {
      messages: []
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    this.ChatStore.listenHunter()
    this.ChatStore.fetchMessages()
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    this.ChatStore.removeHunterListener()
    this.ChatStore.removeMessagesListener()
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  onPressLeftIcon = () => {
    alert('要上傳照片')
  }

  onPressRightIcon = () => {
    alert('要上傳貼圖')
  }

  onPressAvatar = () => {
    alert('點了大頭照')
  }

  render() {
    return (
      <BaconChatRoom
        messages={this.ChatStore.messages}
        onSend={messages => this.ChatStore.onSend(messages)}
        user={{
          _id: this.SubjectStore.uid, // this.SubjectStore.uid
        }}
        onPressLeftIcon={this.onPressLeftIcon}
        onPressRightIcon={this.onPressRightIcon}
        onPressAvatar={this.onPressAvatar}
      />
    )
  }
}


/*
    this.setState({
      messages: [
        {
          _id: 4, // 時間越大放越上面
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 4,
            //name: 'React Native',
            //avatar: 'http://www.teepr.com/wp-content/uploads/2016/12/14909941_1106661159387826_1701114055237368977_n.jpg', // 補上
          },
        },
        {
          _id: 3,
          text: 'Hello',
          createdAt: new Date(),
          user: {
            _id: 'asasas',
            //name: 'React Native',
            //avatar: 'http://www.teepr.com/wp-content/uploads/2016/12/14909941_1106661159387826_1701114055237368977_n.jpg', // 補上
          },
        },
        {
          _id: 2,
          text: 'Hello',
          createdAt: new Date(),
          user: {
            _id: 3,
            //name: 'React Native',
            //avatar: 'http://www.teepr.com/wp-content/uploads/2016/12/14909941_1106661159387826_1701114055237368977_n.jpg', // 補上
          },
        },
        {
          _id: 1,
          text: 'Hello',
          createdAt: new Date(),
          user: {
            _id: 'asasas',
            //name: 'React Native',
            //avatar: 'http://www.teepr.com/wp-content/uploads/2016/12/14909941_1106661159387826_1701114055237368977_n.jpg', // 補上
          },
        }
      ],
    });
*/

/*

  setMessages = async messages => {
    //console.log(messages)//整理成陣列
    this.preyID = Object.keys(messages).find(key => key !== this.SubjectStore.uid)
    const slefMessages = messages[this.SubjectStore.uid] // this.SubjectStore.uid
    const preyMessages = messages[this.preyID] // prey
    const slefMessagesArray = Object.keys(slefMessages).map( time => {
      return(
        {
          _id: time, // 時間越大放越上面
          text: slefMessages[time],
          createdAt: new Date(parseInt(time)),//.toISOString(),
          user: {
            _id: this.SubjectStore.uid, // this.SubjectStore.uid
            //avatar: 'http://www.teepr.com/wp-content/uploads/2016/12/14909941_1106661159387826_1701114055237368977_n.jpg', // 補上
          },
        }
      )
    })
    await this.firebase.database().ref('users/' + this.preyID + '/avatar').once('value',snap => {
      this.avatar = snap.val()
    })
    const preyMessagesArray = Object.keys(preyMessages).map( time => {
      return(
        {
          _id: time, // 時間越大放越上面
          text: preyMessages[time],
          createdAt: new Date(parseInt(time)),//.toISOString(),
          user: {
            _id: time, // this.SubjectStore.uid
            avatar: this.avatar, // 補上
          },
        }
      )
    })
    const allMessages = slefMessagesArray.concat(preyMessagesArray).sort((a, b) => {
      return a._id < b._id ? 1 : -1
    })
    //console.log(allMessages)
    this.setState({messages: allMessages})
  }
*/