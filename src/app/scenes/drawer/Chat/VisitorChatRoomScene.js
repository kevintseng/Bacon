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
  maxWidth: 600,
  maxHeight: 600,
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
    this.ChatStore = this.props.ChatStore
    this.messagesQuery = null
    this.imagesQuery = null
    this.preyMessagesArray = new Array
    this.preyImagesArray = new Array
    this.MessagesAndImages = new Array
    this.sortedMessagesAndImages = new Array
    this.state = {
      chats: [],
      showLeftFooter: false,
      showRightFooter: false 
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
    this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/' + this.props.preyID).set(0)
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
    this.setState({
      showLeftFooter: !this.state.showLeftFooter,
      showRightFooter: false
    })
  }

  onPressRightIcon = () => {
    this.setState({
      showLeftFooter: false,
      showRightFooter: !this.state.showRightFooter,
    })
  }

  openAlbum = () => {
    ImagePicker.launchImageLibrary(options, this.uploadImage)
  }

  openCamera = () => {
    ImagePicker.launchCamera(options, this.uploadImage)
  }

  uploadImage = res => {
      if (res.didCancel) {
        //
      } else if (res.error) {
        //console.log(res.error);
      } else {
        ImageResizer.createResizedImage(res.uri, 600, 600, "JPEG", 100) // (imageUri, newWidth, newHeight, compressFormat, quality, rotation, outputPath)
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
  }

  onSendMessage(messages = []) {
    const messages_no_blank = messages[0].text.trim()
    if (messages_no_blank.length > 0) {
      this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/messages/' + this.SubjectStore.uid + '/' + Date.now()).set(messages[0].text)
      .then(() => {
          this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/lastMessage').set(messages[0].text)
          this.removeMessagesAndImagesListener()
          this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/interested').set(2).then(
            () => {
              //this.ChatStore.setChatVistorRealPrey()
              //this.ChatStore.setChatMatchRealPrey() // 看能不能調成更快的演算法
              Actions.MatchChatRoom({ type: 'replace', title: this.props.title, chatRoomKey: this.props.chatRoomKey, preyID: this.props.preyID })
            }
          )
        }
      ) 
    }
  }

  onSendImage = imageURL => {
    this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/images/' + this.SubjectStore.uid + '/' + Date.now()).set(imageURL)
    .then(() => {
        this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/lastMessage').set('傳送了圖片')
        this.removeMessagesAndImagesListener()
        this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/interested').set(2).then(
          () => {
            //this.ChatStore.setChatVistorRealPrey()
            //this.ChatStore.setChatMatchRealPrey() // 看能不能調成更快的演算法
            Actions.MatchChatRoom({ type: 'replace', title: this.props.title, chatRoomKey: this.props.chatRoomKey, preyID: this.props.preyID })
          }
        )
      }
    ) 
  }

  onPressAvatar = () => {
    alert('預覽')
  }

  removeMessagesAndImagesListener = () => {
    if (this.messagesQuery) {
      this.messagesQuery.off()
      this.messagesQuery = null
    }
    if (this.imagesQuery) {
      this.imagesQuery.off()
      this.imagesQuery = null
    }    
  }

  init = () => {
    this.preyMessagesArray = new Array
    this.preyImagesArray = new Array
    this.MessagesAndImages = new Array
    this.sortedMessagesAndImages = new Array    
  }

  match = async () => {
    await this.removeMessagesAndImagesListener()
    await this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/interested').set(2)
    await this.firebase.database().ref('nonHandleChatRooms/' + this.props.chatRoomKey).once('value',snap => {
      this.firebase.database().ref('matchChatRooms/' + this.props.chatRoomKey).set(snap.val())
    })
    await this.firebase.database().ref('nonHandleChatRooms').child(this.props.chatRoomKey).remove()
    this.ChatStore.removeVistorChatRooms(this.props.chatRoomKey)
    Actions.MatchChatRoom({ type: 'replace', title: this.props.title, chatRoomKey: this.props.chatRoomKey, preyID: this.props.preyID })
  }

  noMatch = async () => {
    await this.removeMessagesAndImagesListener()
    await this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/interested').set(0)
    await this.firebase.database().ref('nonHandleChatRooms/' + this.props.chatRoomKey).once('value',snap => {
      this.firebase.database().ref('nonMatchChatRooms/' + this.props.chatRoomKey).set(snap.val())
    })
    await this.firebase.database().ref('nonHandleChatRooms').child(this.props.chatRoomKey).remove()
    this.ChatStore.removeVistorChatRooms(this.props.chatRoomKey)
    Actions.pop()
  }

  render() {
    return (
      <BaconChatRoom
        messages={this.state.chats}
        onSend={messages => this.onSendMessage(messages)}
        user={{
          _id: this.SubjectStore.uid,
        }}
        onPressLeftIcon={this.onPressLeftIcon}
        onPressRightIcon={this.onPressRightIcon}
        onPressAvatar={this.onPressAvatar}
        showChoose
        chooseTopOnPress={this.match}
        chooseBottomOnPress={this.noMatch}
        showLeftFooter={this.state.showLeftFooter}
        showRightFooter={this.state.showRightFooter}
        onPressLeftFooterLeftIcon={this.openAlbum}
        onPressLeftFooterRightIcon={this.openCamera}
      />
    )
  }
}