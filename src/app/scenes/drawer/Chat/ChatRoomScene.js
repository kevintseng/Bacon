import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import ImagePicker from "react-native-image-picker"
import ImageResizer from "react-native-image-resizer"

import BaconChatRoom from '../../../views/BaconChatRoom/BaconChatRoom'
import MatchModalContainer from '../../../containers/ChatRoomScene/MatchModalContainer'

const options = {
  title: "傳送照片",
  takePhotoButtonTitle: "使用相機現場拍一張",
  chooseFromLibraryButtonTitle: "從相簿中選擇",
  cancelButtonTitle: "取消",
  mediaType: "photo",
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 1.0,
  noData: false,
  storageOptions: { skipBackup: true, path: "Bacon" }
}

const metadata = {
  contentType: 'image/jpeg'
}

@inject('firebase','SubjectStore','ChatStore','ControlStore') @observer
export default class ChatRoomScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.ChatStore = this.props.ChatStore
    this.ControlStore = this.props.ControlStore
    //this.state = {
    //  messages: []
    //}
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    this.ChatStore.listenChatRoomCreater()
    this.ChatStore.listenMessages()
    if (this.props.from === 'visitors') {
      this.ControlStore.openChatMatchModal()
    }
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    this.ChatStore.removeChatRoomCreaterListener()
    this.ChatStore.removeMessagesListener()
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  onPressLeftIcon = () => {
    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) {
        //
      } else if (res.error) {
        //console.log(res.error);
      } else {
        ImageResizer.createResizedImage(res.uri, 1200, 1200, "JPEG", 100) // (imageUri, newWidth, newHeight, compressFormat, quality, rotation, outputPath)
          .then(image => {
            //console.log(image.uri)
            this.firebase.storage().ref('chats/' + this.ChatStore.chatRoomKey + '/' + Date.now() + '.jpg')
            .putFile(image.uri.replace('file:/',''), metadata)
            .then(uploadedFile => {
              //console.warn(uploadedFile.downloadURL)
              this.ChatStore.onSendImage(uploadedFile.downloadURL)
            })
            .catch(err => {
              alert(err)
            })
          })
          .catch(err => {
            alert(err)
          });
      }
    })
  }

  onPressRightIcon = () => {
    alert('要上傳貼圖')
  }

  onPressAvatar = () => {
    alert('點了大頭照')
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MatchModalContainer/>
        <BaconChatRoom
          messages={this.ChatStore.MessagesAndImages}
          onSend={messages => this.ChatStore.onSend(messages)}
          user={{
            _id: this.SubjectStore.uid, // this.SubjectStore.uid
          }}
          onPressLeftIcon={this.onPressLeftIcon}
          onPressRightIcon={this.onPressRightIcon}
          onPressAvatar={this.onPressAvatar}
        />
      </View>
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