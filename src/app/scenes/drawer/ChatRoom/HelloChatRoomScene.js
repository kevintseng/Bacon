import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, BackHandler, ToastAndroid, ActivityIndicator, Keyboard } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'

import BaconChatRoom from '../../../views/BaconChatRoom/BaconChatRoom'
import BaconActivityIndicator from '../../../views/BaconActivityIndicator'

const styles = {
  view: {
    flex: 1
  }
}

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
export default class HelloChatRoomScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.ChatStore = this.props.ChatStore
    this.chatRoomQuery = null
    this.imagesQuery = null
    this.messageSendCount = 0
    //this.showChoose = true
    //this.messageSendPeople = 0
    this.slefMessagesArray = new Array
    this.slefImagesArray = new Array
    this.MessagesAndImages = new Array
    this.sortedMessagesAndImages = new Array
    this.state = {
      chats: [],
      showLeftFooter: false,
      showRightFooter: false,
      loading: true  
    }
  }

  componentWillMount() {
    // 改寫成全部promise好才把loading轉成false
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    this.setState({
      loading: true
    })
  }

  componentDidMount() {
    this.chatRoomQuery = this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/interested')
    this.chatRoomQuery.on('value', child => {
      if (child.val() === 2) {
        // 轉到配對聊天室
        Actions.MatchChatRoom({type: 'replace', chatRoomKey: this.props.chatRoomKey,preyID: this.props.preyID})
      } else {
        this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/messageSendCount').once('value', child => {
          this.messageSendCount = child.val()
          this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/cutLine').once('value', child => {
            this.ChatStore.setShowChoose(!(child.val() || false))
            this.messagesQuery = this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/messages')
            this.imagesQuery = this.firebase.database().ref('chats/' +  this.props.chatRoomKey + '/images')
            this.messagesQuery.on('value', child => {
              this.setMessages(child.val()) // 改成child_added
            })
            this.imagesQuery.on('value', child => {
              this.setImages(child.val()) // 改成child_added
            })
          })
        })
      }
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
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
      this.combineMessagesAndImages()
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
      this.combineMessagesAndImages()
    }
  }

  combineMessagesAndImages = () => {
    this.messages = this.slefMessagesArray
    this.images = this.slefImagesArray
    this.MessagesAndImages = this.messages.concat(this.images)
    this.sortedMessagesAndImages = this.MessagesAndImages.sort((a, b) => {
      return a._id < b._id ? 1 : -1
    })
    this.setState({chats: this.sortedMessagesAndImages, loading: false})
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
          if (this.messageSendCount > 1) {
            alert('你已超過兩句限制')
          } else {
            this.firebase.storage().ref('chats/' + this.props.chatRoomKey + '/' + Date.now() + '.jpg')
            .putFile(image.uri.replace('file:/',''), metadata)
            .then(uploadedFile => {
              //console.warn(uploadedFile.downloadURL)
              this.onSendImage(uploadedFile.downloadURL)
            })
            .catch(err => {
              alert(err)
            })
          }
        })
        .catch(err => {
          alert(err)
      })
    }
  }

  onSendMessage(messages = []) {
    const messages_no_blank = messages[0].text.trim()
    if (messages_no_blank.length > 0) {
      if (this.messageSendCount > 1 ) {
        //alert('你已超過兩句限制')
        Keyboard.dismiss()
        Actions.UseBonus({uid: this.props.preyID, _type: 'A'})
      } else {
        this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/messages/' + this.SubjectStore.uid + '/' + Date.now()).set(messages[0].text)
          .then(() => {
            this.messageSendCount = this.messageSendCount + 1
            this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/messageSendCount').set(this.messageSendCount)
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
  }

  onSendImage = imageURL => {
    this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/images/' + this.SubjectStore.uid + '/' + Date.now()).set(imageURL)
    .then(() => {
        this.messageSendCount = this.messageSendCount + 1
        this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/messageSendCount').set(this.messageSendCount)
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
    Actions.ChatRoomPreview({uid: this.props.preyID})
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
    if (this.chatRoomQuery) {
      this.chatRoomQuery.off()
      this.chatRoomQuery = null
    } 
  }

  init = () => {
    this.slefMessagesArray = new Array
    this.slefImagesArray = new Array
    this.MessagesAndImages = new Array
    this.sortedMessagesAndImages = new Array 
    this.messageSendCount = 0   
  }

  cutLine = () => {
    //Keyboard.dismiss()
    Actions.UseBonus({uid: this.props.preyID, _type: 'C'})
  }

  render() {
    return (
      <View style={styles.view}>
        { this.state.loading ? <BaconActivityIndicator/> :
        <BaconChatRoom
          messages={this.state.chats}
          onSend={messages => this.onSendMessage(messages)}
          user={{
            _id: this.SubjectStore.uid,
          }}
          showChoose={this.ChatStore.showChoose}
          showCutLine
          chooseTopOnPress={this.cutLine}
          onPressLeftIcon={this.onPressLeftIcon}
          onPressRightIcon={this.onPressRightIcon}
          onPressAvatar={this.onPressAvatar}
          showLeftFooter={this.state.showLeftFooter}
          showRightFooter={this.state.showRightFooter}
          onPressLeftFooterLeftIcon={this.openAlbum}
          onPressLeftFooterRightIcon={this.openCamera}
        />
        }
      </View>
    )
  }
}