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
export default class MatchChatRoomScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.ChatStore = this.props.ChatStore
    this.messagesQuery = null
    this.imagesQuery = null
    this.slefMessagesArray = new Array
    this.preyMessagesArray = new Array
    this.slefImagesArray = new Array
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

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    this.ChatStore.setMatchChatRoomsNonHandleChatCounts(this.props.chatRoomKey,0)
    this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/' + this.props.preyID).set(0)
    this.removeMessagesAndImagesListener()
    this.init()
  }

  setMessages = messages => {
    if (messages) {
      this.slefMessages = messages[this.SubjectStore.uid]
      if (this.slefMessages) {
        this.slefMessagesArray = Object.keys(this.slefMessages).map(time => {
          return(
            {
              _id: time, // 時間越大放越上面
              text: this.slefMessages[time],
              createdAt: new Date(parseInt(time)),
              user: {
                _id: this.SubjectStore.uid, 
              },
            }
          )
        })
      }

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

      this.slefImages = images[this.SubjectStore.uid]
      if (this.slefImages) {
        this.slefImagesArray = Object.keys(this.slefImages).map(time => {
          return(
            {
              _id: time, // 時間越大放越上面
              text: null,
              createdAt: new Date(parseInt(time)),
              user: {
                _id: this.SubjectStore.uid, 
              },
              image: this.slefImages[time]
            }
          )
        })
      }

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
    this.messages = this.slefMessagesArray.concat(this.preyMessagesArray)
    this.images = this.slefImagesArray.concat(this.preyImagesArray)
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
      })
    }
  }

  onSendMessage(messages = []) {
    const messages_no_blank = messages[0].text.trim()
    if (messages_no_blank.length > 0) {
      this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/messages/' + this.SubjectStore.uid + '/' + Date.now()).set(messages[0].text)
      .then(() => {
        this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/lastMessage').set(messages[0].text)
        this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/' + this.SubjectStore.uid).transaction(current => {
          if (!current) {
            return 1
          } else {
            return current + 1
          }
        })
       }
      ) 
    }
  }

  onSendImage = imageURL => {
    this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/images/' + this.SubjectStore.uid + '/' + Date.now()).set(imageURL)
    .then(() => {
        this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/lastMessage').set('傳送了圖片')
        this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/' + this.SubjectStore.uid).transaction(current => {
          if (!current) {
            return 1
          } else {
            return current + 1
          }
        })
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
    this.slefMessagesArray = new Array
    this.preyMessagesArray = new Array
    this.slefImagesArray = new Array
    this.preyImagesArray = new Array
    this.MessagesAndImages = new Array
    this.sortedMessagesAndImages = new Array    
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
        showLeftFooter={this.state.showLeftFooter}
        showRightFooter={this.state.showRightFooter}
        onPressLeftFooterLeftIcon={this.openAlbum}
        onPressLeftFooterRightIcon={this.openCamera}
      />
    )
  }
}