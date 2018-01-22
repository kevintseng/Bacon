import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, BackHandler, ToastAndroid, ActivityIndicator } from 'react-native'
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

@inject('firebase','SubjectStore') @observer
export default class InitChatRoomScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.chatRoomQuery = null
    this.interested = null
    this.state = {
      //chats: [],
      showLeftFooter: false,
      showRightFooter: false ,
      loading: true 
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    this.chatRoomQuery = this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/interested')
    this.chatRoomQuery.on('value', child => {
      this.interested = child.val()
      if (this.interested) {
        if (this.interested === 2) {
          // 轉到配對聊天室
          //this.removeChatRoomListener()
          Actions.MatchChatRoom({type: 'replace', title: this.props.Title, chatRoomKey: this.props.chatRoomKey,preyID: this.props.preyID})
        } else {
          this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/chatRoomCreater').once('value',snap => {
            if (this.interested === 1) {
              if (snap.val() === this.SubjectStore.uid) {
                // 轉到Hello聊天室
                //this.removeChatRoomListener()
                Actions.HelloChatRoom({type: 'replace', title: this.props.Title, chatRoomKey: this.props.chatRoomKey,preyID: this.props.preyID})
              } else {
                // 轉到訪客聊天室
                //this.removeChatRoomListener()
                Actions.VisitorChatRoom({type: 'replace', title: this.props.Title, chatRoomKey: this.props.chatRoomKey,preyID: this.props.preyID})
              }
            } else if (child.val() === 0){
              if (snap.val() === this.SubjectStore.uid) {
                // 轉到Hello聊天室
                //this.removeChatRoomListener()
                Actions.HelloChatRoom({type: 'replace', title: this.props.Title, chatRoomKey: this.props.chatRoomKey,preyID: this.props.preyID})
              } else {
                alert('你已對此會員不感興趣')
                //Actions.VisitorChatRoom({title: this.props.tiitle,chatRoomKey: this.props.chatRoomKey,preyID: this.props.preyID})
              }
            }
          })
        }
      } else {
        this.setState({loading: false})
      }
    })
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    this.removeChatRoomListener()
    this.interested = null
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

  onPressAvatar = () => {
    Actions.ChatRoomPreview({uid: this.props.preyID})
  }

  onSendMessage(messages = []) {
    const messages_no_blank = messages[0].text.trim()
    if (messages_no_blank.length > 0) {
      if (!this.interested) {
        this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey).set({
          chatRoomCreater: this.SubjectStore.uid,
          interested: 1, //未處理
          lastMessage: messages[0].text,
          chatRoomRecipient: this.props.preyID,
        })
        this.firebase.database().ref('nonHandleChatRooms/' + this.props.chatRoomKey).set({
          chatRoomCreater: this.SubjectStore.uid,
          //lastMessage: messages[0].text,
          chatRoomRecipient: this.props.preyID,
        })
        this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/chatRoomCreater').set(this.SubjectStore.uid)
        this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/messageSendCount').set(1)
        this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/messages/' + this.SubjectStore.uid + '/' + Date.now()).set(messages[0].text)
        this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/' + this.SubjectStore.uid).transaction(current => {
          if (!current) {
            return 1
          } else {
            return current + 1
          }
        })
      }
    }
  }

  onSendImage = imageURL => {
    if (!this.interested) {
      this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey).set({
        chatRoomCreater: this.SubjectStore.uid,
        interested: 1, //未處理
        lastMessage: '送出一張圖片',
        chatRoomRecipient: this.props.preyID
      })
      this.firebase.database().ref('nonHandleChatRooms/' + this.props.chatRoomKey).set({
        chatRoomCreater: this.SubjectStore.uid,
        //lastMessage: '送出一張圖片',
        chatRoomRecipient: this.props.preyID
      })
      this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/chatRoomCreater').set(this.SubjectStore.uid)
      this.firebase.database().ref('chats/' + this.props.chatRoomKey + '/images/' + this.SubjectStore.uid + '/' + Date.now()).set(imageURL)
      this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/' + this.SubjectStore.uid).transaction(current => {
        if (!current) {
          return 1
        } else {
          return current + 1
        }
      })
    }
  }

  removeChatRoomListener = () => {
    if (this.chatRoomQuery) {
      this.chatRoomQuery.off()
      this.chatRoomQuery = null      
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        { this.state.loading ?
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
        <BaconChatRoom
          messages={[]}
          onSend={messages => this.onSendMessage(messages)}
          user={{
            _id: this.SubjectStore.uid, // this.SubjectStore.uid
          }}
          onPressLeftIcon={this.onPressLeftIcon}
          onPressRightIcon={this.onPressRightIcon}
          onPressAvatar={this.onPressAvatar}
          //showChoose={false}
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