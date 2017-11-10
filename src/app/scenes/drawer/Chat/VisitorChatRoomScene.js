import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import ImagePicker from "react-native-image-picker"
import ImageResizer from "react-native-image-resizer"

import BaconChatRoom from '../../../views/BaconChatRoom/BaconChatRoom'

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

@inject('firebase','SubjectStore','ChatStore') @observer
export default class VisitorChatRoomScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.messagesQuery = null
    this.imagesQuery = null
    //this.slefMessagesArray = new Array
    this.preyMessagesArray = new Array
    //this.slefImagesArray = new Array
    this.preyImagesArray = new Array
    this.MessagesAndImages = new Array
    this.sortedMessagesAndImages = new Array
    this.state = {
      chats: []
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    this.messagesQuery = this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/messages')
    this.messagesQuery.on('value', child => {
      this.setMessages(child.val()) // 改成child_added
    })
    this.imagesQuery = this.firebase.database().ref('chats/' +  this.props.chatRoomKey + '/images')
    this.imagesQuery.on('value', child => {
      this.setImages(child.val()) // 改成child_added
    })
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    this.removeMessagesAndImagesListener()
    this.init()
  }

  setMessages = messages => {
    if (messages) {
      this.preyMessages = messages[this.props.preyID] // prey
      if (this.preyMessages) {
        this.firebase.database().ref('users/' + this.props.preyID + '/avatar').once('value',snap => {
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

  setImages = images => {
    if (images) {
      this.preyImages = images[this.props.preyID] // prey
      if (this.preyImages) {
        this.firebase.database().ref('users/' + this.props.preyID + '/avatar').once('value',snap => {
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

  combineMessagesAndImages = () => {
    this.messages = this.preyMessagesArray
    this.images = this.preyImagesArray
    this.MessagesAndImages = this.messages.concat(this.images)
    this.sortedMessagesAndImages = this.MessagesAndImages.sort((a, b) => {
      return a._id < b._id ? 1 : -1
    })
    this.setState({chats: this.sortedMessagesAndImages})
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
            this.firebase.storage().ref('chats/' + this.props.chatRoomKey + '/' + Date.now() + '.jpg')
            .putFile(image.uri.replace('file:/',''), metadata)
            .then(uploadedFile => {
              //console.warn(uploadedFile.downloadURL)
              this.onSendImage(uploadedFile.downloadURL)
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

  onSendMessage(messages = []) {
    const messages_no_blank = messages[0].text.trim()
    if (messages_no_blank.length > 0) {
      this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/messages/' + this.SubjectStore.uid + '/' + Date.now()).set(messages[0].text)
      .then(() => {
          this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/lastMessage').set(messages[0].text)
          Actions.MatchChatRoom({type: 'replace', title: this.props.title,chatRoomKey: this.props.chatRoomKey,preyId: this.props.preyId})
        }
      ) 
    }
  }

  onSendImage = imageURL => {
    this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/images/' + this.SubjectStore.uid + '/' + Date.now()).set(imageURL)
    .then(() => {
        this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/lastMessage').set('傳送了圖片')
        Actions.MatchChatRoom({type: 'replace', title: this.props.title,chatRoomKey: this.props.chatRoomKey,preyId: this.props.preyId})
      }
    ) 
  }

  onPressRightIcon = () => {
    alert('要上傳貼圖')
  }

  onPressAvatar = () => {
    alert('預覽')
  }

  removeMessagesAndImagesListener = async () => {
    if (this.messagesQuery) {
      await this.messagesQuery.off()
      this.messagesQuery = null
    }
    if (this.imagesQuery) {
      await this.imagesQuery.off()
      this.imagesQuery = null
    }    
  }

  init = () => {
    //this.slefMessagesArray = new Array
    this.preyMessagesArray = new Array
    //this.slefImagesArray = new Array
    this.preyImagesArray = new Array
    this.MessagesAndImages = new Array
    this.sortedMessagesAndImages = new Array    
  }

  match = () => {
    Actions.MatchChatRoom({ type: 'replace', title: this.props.title, chatRoomKey: this.props.chatRoomKey, preyID: this.props.preyID })
    //alert('配對了轉到配對聊天室')
  }

  noMatch = () => {
    alert('沒配對')
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <BaconChatRoom
          messages={this.state.chats}
          onSend={messages => this.onSendMessage(messages)}
          user={{
            _id: this.SubjectStore.uid,
          }}
          onPressLeftIcon={this.onPressLeftIcon}
          onPressRightIcon={this.onPressRightIcon}
          onPressAvatar={this.onPressAvatar}
          showChoose={true}
          chooseTopOnPress={this.match}
          chooseBottomOnPress={this.noMatch}
        />
      </View>
    )
  }
}