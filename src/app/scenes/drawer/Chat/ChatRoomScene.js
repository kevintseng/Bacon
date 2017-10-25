import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, InteractionManager } from 'react-native'
import { observer, inject } from 'mobx-react'
import { GiftedChat } from 'react-native-gifted-chat';
import Moment from 'moment'

@inject('firebase','FateStore','SubjectStore') @observer
export default class ChatRoomScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.FateStore = this.props.FateStore
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      messages: [],
    };
  }

  componentWillMount() {
    this.firebase.database().ref('chats/' + 'room_key' + '/messages').on('value', child => {
      this.setMessages(child.val())
    })
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
  }

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

  onSend(messages = []) {
    //this.setState((previousState) => ({
    //  messages: GiftedChat.append(previousState.messages, messages),
    //}));
    this.firebase.database().ref('chats/' + 'room_key' + '/messages/' + this.SubjectStore.uid + '/' + Date.now()).set(messages[0].text)
    //console.log(messages)
  }

  render() {
    return (
      <GiftedChat
        //showUserAvatar
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: this.SubjectStore.uid, // this.SubjectStore.uid
          //avatar: "http://www.teepr.com/wp-content/uploads/2016/12/14909941_1106661159387826_1701114055237368977_n.jpg"
        }}
      />
    );
  }
}