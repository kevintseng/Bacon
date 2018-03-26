import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, BackHandler, ToastAndroid, ActivityIndicator, Keyboard } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import ImagePicker from "react-native-image-picker"
import ImageResizer from "react-native-image-resizer"

import BaconChatRoom from '../../../views/BaconChatRoom/BaconChatRoom'
import BaconActivityIndicator from '../../../views/BaconActivityIndicator'

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

const styles = {
  view: {
    flex: 1
  }
}

@inject('firebase','SubjectStore','ChatStore') @observer
export default class InitChatRoomScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.ChatStore = this.props.ChatStore
    //this.messageSendPeople = 0
    this.chatRoomQuery = null
    this.interested = false
    this.state = {
      showLeftFooter: false,
      showRightFooter: false ,
      loading: true 
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    this.setState({
      loading: true
    })
  }

  componentDidMount() {
    this.chatRoomQuery = this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/interested')
    this.chatRoomQuery.on('value', child => {
      this.interested = child.val().toString() // javascripr 裡 0 為false
      if (this.interested) {
        if (this.interested === '2') {
          //console.warn('轉到配對聊天室')
          Actions.MatchChatRoom({type: 'replace', title: this.props.Title, chatRoomKey: this.props.chatRoomKey,preyID: this.props.preyID})
        } else {
          this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/chatRoomCreater').once('value',snap => {
            if (this.interested === '1') {
              if (snap.val() === this.SubjectStore.uid) {
                //console.warn('轉到Hello聊天室')
                Actions.HelloChatRoom({type: 'replace', title: this.props.Title, chatRoomKey: this.props.chatRoomKey,preyID: this.props.preyID})
              } else {
                //console.warn('轉到訪客聊天室')
                Actions.VisitorChatRoom({type: 'replace', title: this.props.Title, chatRoomKey: this.props.chatRoomKey,preyID: this.props.preyID})
              }
            } else if (this.interested === '0'){
              if (snap.val() === this.SubjectStore.uid) {
                Actions.HelloChatRoom({type: 'replace', title: this.props.Title, chatRoomKey: this.props.chatRoomKey,preyID: this.props.preyID})
              } else {
                Actions.VisitorChatRoom({type: 'replace', title: this.props.Title, chatRoomKey: this.props.chatRoomKey,preyID: this.props.preyID})
                
              }
            }
          })
        }
      } else {
        // 初始聊天室
        
        this.firebase.database().ref('hello_chat_rooms_count/' + this.SubjectStore.uid).once('value',snap => {
          //this.messageSendPeople = snap.val() || 0
          this.ChatStore.setMessageSendPeople(snap.val() || 0)
          //console.warn(this.messageSendPeople)
          this.interested = null
          this.setState({
            loading: false
          })
          //console.warn('初始聊天室')
        })      
      }
    })
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    this.removeChatRoomListener()
  }

  removeChatRoomListener = () => {
    if (this.chatRoomQuery) {
      this.chatRoomQuery.off()
      this.chatRoomQuery = null      
    }
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

  onPressAvatar = () => {
    Actions.ChatRoomPreview({uid: this.props.preyID})
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
          })
      }   
  }

  onSendMessage(messages = []) {
    const messages_no_blank = messages[0].text.trim()
    if (messages_no_blank.length > 0) {
      if (this.ChatStore.messageSendPeople < 10) {
        if (!this.interested) {

          const _messages = new Object
          _messages[this.SubjectStore.uid] = new Object 
          _messages[this.SubjectStore.uid][Date.now()] = messages[0].text
          // 不知道會不會有非同步bug，還沒全部上傳完就轉跳聊天室
          this.firebase.database().ref('chats/' + this.props.chatRoomKey).set({
            chatRoomCreater: this.SubjectStore.uid,
            messageSendCount: 1,
            messages: _messages
          })
          this.firebase.database().ref('nonHandleChatRooms/' + this.props.chatRoomKey).set({
            chatRoomCreater: this.SubjectStore.uid,
            chatRoomRecipient: this.props.preyID,
          })
          this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey).set({
            chatRoomCreater: this.SubjectStore.uid,
            interested: 1, //未處理
            lastMessage: messages[0].text,
            chatRoomRecipient: this.props.preyID,
          })
          this.firebase.database().ref('hello_chat_rooms_count/' + this.SubjectStore.uid).transaction(current => {
           if (!current) {
              return 1
            } else {
              return current + 1
            }
          })
          this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/' + this.SubjectStore.uid).transaction(current => {
            if (!current) {
              return 1
            } else {
              return current + 1
            }
          })
        }        
      } else {
        Keyboard.dismiss()
        Actions.UseBonus({uid: this.props.preyID, _type: 'B'})        
      }
    }
  }

  onSendImage = imageURL => {
    if (this.ChatStore.messageSendPeople < 10) {
      if (!this.interested) {

        const _images = new Object
        _images[this.SubjectStore.uid] = new Object
        _images[this.SubjectStore.uid][Date.now()] = imageURL
        // 不知道會不會有非同步bug，還沒全部上傳完就轉跳聊天室
        this.firebase.database().ref('chats/' + this.props.chatRoomKey).set({
          chatRoomCreater: this.SubjectStore.uid,
          messageSendCount: 1,
          images: _images
        })
        this.firebase.database().ref('nonHandleChatRooms/' + this.props.chatRoomKey).set({
          chatRoomCreater: this.SubjectStore.uid,
          chatRoomRecipient: this.props.preyID
        })
        this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey).set({
          chatRoomCreater: this.SubjectStore.uid,
          interested: 1, //未處理
          lastMessage: '送出一張圖片',
          chatRoomRecipient: this.props.preyID
        })
          this.firebase.database().ref('hello_chat_rooms_count/' + this.SubjectStore.uid).transaction(current => {
           if (!current) {
              return 1
            } else {
              return current + 1
            }
          })
        this.firebase.database().ref('chat_rooms/' + this.props.chatRoomKey + '/' + this.SubjectStore.uid).transaction(current => {
          if (!current) {
            return 1
          } else {
            return current + 1
          }
        })
      }
    } else {
      Keyboard.dismiss()
      Actions.UseBonus({uid: this.props.preyID, _type: 'B'})      
    }
  }

  render() {
    return (
      <View style={styles.view}>
        { this.state.loading ? <BaconActivityIndicator/> :
        <BaconChatRoom
          messages={[]}
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
        }
      </View>
    )
  }
}