import React, { Component } from "react"
import {
  Keyboard,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  BackHandler,
  ToastAndroid
} from "react-native"
import { Actions } from "react-native-router-flux"
import { observer, inject } from "mobx-react"
import { GiftedChat, Bubble, MessageImage } from "react-native-gifted-chat"
import ImagePicker from "react-native-image-picker"
import Moment from "moment"
import { Icon, Button } from "react-native-elements"
import Modal from "react-native-modal"
import uuid from 'uuid';
// import ImageResizer from 'react-native-image-resizer'
import { translateChatStatus } from "../../../Utils"
import Stickers from "./components/Stickers"
// import StickerBubble from "./components/StickerBubble"

const { width, height } = Dimensions.get("window") //eslint-disable-line
const DEFAULT_VISITOR_MSG_LIMIT = 2
const DEFAULT_MIN_INPUT_TOOLBAR_HEIGHT = 55
const DEFAULT_INPUT_OFFSET = 140
const PLUS_TOOLBAR_HEIGHT = 160
const STICKER_TOOLBAR_HEIGHT = 240

const LABEL_SEND = "送出"
const LABEL_ALBUM = "相簿"
const LABEL_CAMERA = "拍照"
const LABEL_USE_BONUS = "使用Q點"
const LABEL_CANCEL = "取消"
const PLACEHOLDER = "請輸入..."
const MSG_TOO_MANY_SENT = "超過訪客留言次數限制：請等待對方回覆或是使用Q點繼續留言"
const MSG_PRIORITY = "訊息優先被看到：您可以使用Q點讓您的訊息優先顯示在對方的訊息中心！"

const pngmetadata = {
  contentType: 'image/png',
}

const jpgmetadata = {
  contentType: 'image/jpeg',
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  modalViewContainer: {
    backgroundColor: 'white',
    borderRadius: 26,
    padding: 50,
  },
  modalText: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    color: '#606060',
    fontSize: 18,
  },
  footerText: {
    fontSize: 14,
    color: "#aaa",
  },
  btnUseBonus: {
    marginTop: 20,
    backgroundColor: "transparent",
    padding: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTextUseBonus: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontWeight: '500',
    color: '#606060',
    fontSize: 24,
  },
  btnCancel: {
    backgroundColor: "transparent",
    padding: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTextCancel: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    color: '#606060',
    fontSize: 18,
  },
})

const ImagePickerOptions = {
  title: "請選擇照片",
  // customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
}


@inject("firebase", "SubjectStore")
@observer
export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore

    this.uid = this.SubjectStore.uid
    this.otherUid = this.props.uid
    this.other = null
    this.convKey = this.props.convKey ? this.props.convKey : null
    this.loadAfterMsgId = 0
    this.title = ""
    this.role = "wooer"
    this.msgSent = 0

    if (this.convKey) {
      if (this.SubjectStore.conversations[this.props.uid].prey == this.uid) {
        this.role = "prey"
      }
    }

    this.visit = true
    if (this.convKey) {
      if (this.SubjectStore.conversations[this.props.uid].visit == false) {
        this.visit = false
      }
    }

    this.state = {
      size: {
        width,
        height,
      },
      messages: [],
      visitorMsgLimit: false,
      typingText: null,
      inputText: '',
      lines: 1,
      inputOffset: DEFAULT_INPUT_OFFSET,
      inputHeight: 55,
      loadEarlier: false,
      isLoadingEarlier: false,
      action: false,
      image: null,
      visit: this.visit,
      showVisitorModal: false,
      showMsgLimitModal: false,
      showPriorityModal: false,
      dontAskPriorityAgain: false,
      minToolBarHeight: DEFAULT_MIN_INPUT_TOOLBAR_HEIGHT,
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentDidMount() {
    this.getUserData(this.otherUid)
    this.visitConvSentTodayUpdate()
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prevState.minToolBarHeight: ", prevState.minToolBarHeight, ", this.state.minToolBarHeight: ", this.state.minToolBarHeight)
    if (prevState.minToolBarHeight != this.state.minToolBarHeight) {
      this.chat.resetInputToolbar()
    }
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  onSend = (messages = []) => {
    if (this.state.inputText == "") {
      return false
    }
    if (!this.meetMsgLimit()) {
      const createdAt = Moment().format()
      const _id = this.genID()
      const msgObj = {
        _id,
        text: this.state.inputText,
        createdAt,
        user: {
          _id: this.uid,
          name: this.SubjectStore.nickname,
          avatar: this.SubjectStore.avatar,
        },
      }
      // console.log("msgObj: ", msgObj)
      // messages[0] = msgObj

      this.syncMsgToFirebase(msgObj)

      // 有發言回應後就取消 priority
      this.updatePriority(this.uid, this.otherUid, false)
      // adds 1 to the other user"s conversation bucket"s unread field
      this.unreadAddOne(this.convKey, this.otherUid)
      // console.log("visitorMsgLimit: ", this.state.visitorMsgLimit)
      if (this.state.visitorMsgLimit > 0) {
        this.visitorMsgLimitDeductOne(this.convKey, this.uid)
      }

      if (!this.state.dontAskPriorityAgain && this.msgSent >= 1) {
        this.msgSent = this.msgSent + 1
        setTimeout(() => {
          this.setState({ showPriorityModal: true })
        }, 1000)
      }

      Keyboard.dismiss()
    } else {
      this.setState({ showMsgLimitModal: true })
    }
  }

  getUserData = uid => {
    const ref = this.firebase.database().ref(`users/${uid}`)
    ref.once("value").then(snap => {
      if (snap.exists()) {
        const user = snap.val()
        // console.log("getUserData: ", user.nickname)
        this.other = user
        return user
      }
    }).then(user => {
      this.refreshHeader(user)
      this.initChatRoom(this.otherUid)
    })
  }

  // update last read and clear unread count
  updateLastRead = (convKey, msgId, uid) => {
    this.firebase
      .database()
      .ref(`conversations/${convKey}/users/${uid}`)
      .update({ lastRead: msgId, unread: 0 })
  }

  loadAndListenMessages = (convKey, startAt, uid) => {
    // Load previous 25 msgs from firebase.
    this.firebase
      .database()
      .ref(`conversations/${convKey}/messages`)
      .orderByChild("_id")
      .startAt(startAt)
      .limitToLast(50)
      .on("child_added", msgSnap => {
        // console.log(`child_added:`, msgSnap.val().user._id)
        // 預防對方馬上回應來訪留言, 原邀請者還沒離開對話但已收到對方回應就不再檢查來訪留言限制
        if (this.uid != msgSnap.val().user._id && this.role == "wooer" && this.state.visit) {
          this.setState({ visit: false })
          this.visit = false
        }
        const msgId = msgSnap.val()._id
        // Update lastRead
        this.updateLastRead(convKey, msgId, uid)
        this.clearUnread(convKey, uid)
        this.setState({
          messages: GiftedChat.append(this.state.messages, msgSnap.val()),
        })
      })
  }

  // update users' profile in conversation data
  updateAndLoad = _convKey => {
    const me = this.uid
    const theOther = this.otherUid
    const visit = this.state.visit
    const role = this.role
    if (!this.state.visit) {
      this.setState({dontAskPriorityAgain: true})
    }
    // load conversation data
    this.firebase
      .database()
      .ref(`conversations/${_convKey}/users`)
      .once("value")
      .then(snap => {
        const users = snap.val()
        // console.log(this.otherUid)
        // If user has changed name and avatar since last time, update.
        users[theOther].name = this.other.nickname
        users[theOther].avatar = this.other.avatar
        users[me].name = this.SubjectStore.nickname
        users[me].avatar = this.SubjectStore.avatar
        this.loadAfterMsgId = users[me].deleted
        this.setState({ visit, role })
        this.firebase
          .database()
          .ref(`conversations/${_convKey}/users`)
          .update(users)
      })
      .then(() => {
        this.loadAndListenMessages(this.convKey, this.loadAfterMsgId, me)
        this.fetchVisitorMsgLimit(this.convKey, this.uid)
        if (visit && role == "prey") {
          this.setState({
            showVisitorModal: true,
          })
        }
      })
  }

  createNewConv = () => {
    this.convKey = this.firebase.database().ref("conversations").push().key
    const visit = true

    const users = {}
    users[this.otherUid] = {
      name: this.other.nickname,
      avatar: this.other.avatar,
      birthday: this.other.birthday,
      unread: 0,
      deleted: false,
      lastRead: 0,
    }

    users[this.uid] = {
      name: this.SubjectStore.nickname,
      avatar: this.SubjectStore.avatar,
      birthday: this.SubjectStore.birthday,
      unread: 0,
      deleted: false,
      lastRead: 0,
      visitorMsgLimit: DEFAULT_VISITOR_MSG_LIMIT,
    }
    const createTime = Moment().unix()
    const convData = {
      users,
      createTime,
    }

    this.setState({ visitorMsgLimit: DEFAULT_VISITOR_MSG_LIMIT, visit })

    // Add new conv to user profile
    this.firebase
      .database()
      .ref(`conversations/${this.convKey}`)
      .update(convData)
      .then(() => {
        const data = {
          convKey: this.convKey,
          wooer: this.uid,
          prey: this.otherUid,
          createTime,
          priority: 99,
          visit,
        }
        if (!this.SubjectStore.conversations) {
          const obj = {}
          this.SubjectStore.setConversations(obj)
        }
        this.SubjectStore.addConv(this.otherUid, data)

        // Add new conversation to my user profile on firebase
        const addToMyConvList = this.firebase.database().ref(`users/${this.uid}/conversations/${this.otherUid}`).set(data)

        data.visit = true
        // Add new conversation to the other person"s user profile on firebase
        const addToOtherConvList = this.firebase.database().ref(`users/${this.otherUid}/conversations/${this.uid}`).set(data)
      })
      .then(
        // update and load conversation and messages
        this.updateAndLoad(this.convKey),
      )
  }

  // reset unread count
  clearUnread = (convKey, uid) => {
    const unreadRef = this.firebase
      .database()
      .ref(`conversations/${convKey}/users/${uid}`)
    unreadRef.update({ unread: 0 })
  }

  updatePriority = (uid, otherUid, absolute) => {
    let pos = -99999999999
    if(!absolute) {
      p = Moment().unix()
      p = -1 * p
    }
    this.firebase
      .database()
      .ref(`users/${otherUid}/conversations/${uid}/priority`).set(p)
    this.firebase
      .database()
      .ref(`users/${uid}/conversations/${otherUid}/priority`).set(p)
    // convRef.update({ priority: 0 })
    this.setState({ dontAskPriorityAgain: true })
  }

  // adds 1 to unread
  unreadAddOne = (convKey, uid) => {
    const convRef = this.firebase
      .database()
      .ref(`conversations/${convKey}/users/${uid}`)
    convRef.once(
      "value",
      snap => {
        const unread = snap.val().unread + 1
        // update new unread count
        convRef.update({ unread })
      },
      err => {
        console.log(`Chat/unreadAddOne error: ${err}`)
      },
    )
  }

  visitorMsgLimitDeductOne = (convKey, uid) => {
    const convRef = this.firebase
      .database()
      .ref(`conversations/${convKey}/users/${uid}/visitorMsgLimit`)
    convRef.once(
      "value",
      snap => {
        const limit = snap.val()
        const newLimit = limit - 1
        // update new unread count
        this.setState({ visitorMsgLimit: newLimit })
        convRef.set(newLimit)
      },
      err => {
        console.log(`Chat/visitorMsgLimitDeductOne error: ${err}`)
      },
    )
  }

  fetchVisitorMsgLimit = (convKey, uid) => {
    const convRef = this.firebase
      .database()
      .ref(`conversations/${convKey}/users/${uid}/visitorMsgLimit`)
    convRef.once(
      "value",
      snap => {
        this.setState({ visitorMsgLimit: snap.val() })
      },
      err => {
        console.log(`Chat/updateVisitorMsgLimit error: ${err}`)
      },
    )
  }

  visitorMsgLimitAddOne = (convKey, uid) => {
    const convRef = this.firebase
      .database()
      .ref(`conversations/${convKey}/users/${uid}/visitorMsgLimit`)
    convRef.once(
      "value",
      snap => {
        const limit = snap.val() + 1
        this.setState({ visitorMsgLimit: limit })
        // update new unread count
        convRef.set(limit)
      },
      err => {
        console.log(`Chat/visitorMsgLimitAddOne error: ${err}`)
      },
    )
  }

  renderFooter = () => {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      )
    }
    return null
  }

  // TODO: Rewrite this when have time
  renderActions = () => {
    if (!this.state.action) {
      return (
        <View
          style={{
            width: 90,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            paddingVertical: 3,
            alignSelf: "center",
          }}
        >
          <Icon
            size={30}
            name="add"
            onPress={() => {
              this.setState({
                action: "plus",
                minToolBarHeight: PLUS_TOOLBAR_HEIGHT,
              })
            }}
          />
          <Icon
            size={30}
            name="mood"
            onPress={() => {
              this.setState({
                action: "smily",
                minToolBarHeight: STICKER_TOOLBAR_HEIGHT,
              })
            }}
          />
        </View>
      )
    }
  }

  handleCameraPicker = () => {
    if (!this.meetMsgLimit()) {
      const msgRef = this.firebase
        .database()
        .ref(`conversations/${this.convKey}/messages`)
      // console.log("handleCameraPicker called")
      ImagePicker.launchCamera(ImagePickerOptions, response => {
        // console.log("Response = ", response)

        if (response.didCancel) {
          console.log("User cancelled image picker")
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error)
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton)
        } else {
          this.setState({ action: "uploading" })
          // console.log("camera response: ", response)
          const _id = this.genID()
          const filename = _id + ".jpg"
          // const imgType = filename.split('.').pop()

          const uri = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri.replace('file:/')
          this.firebase.storage().ref(`chat/${this.convKey}/${this.uid}/${filename}`).putFile(uri, jpgmetadata)
          .then(uploadedFile => {
            // console.log("downloadUrl: ", uploadedFile.downloadUrl)
            const msgObj = {
              _id,
              text: "",
              createdAt: Moment().format(),
              user: {
                _id: this.uid,
                name: this.SubjectStore.nickname,
                avatar: this.SubjectStore.avatar,
              },
              image: uploadedFile.downloadUrl,
            }

            this.syncMsgToFirebase(msgObj)
            // adds 1 to conversation
            this.unreadAddOne(this.convKey, this.otherUid)
            if (this.state.visitorMsgLimit > 0) {
              this.visitorMsgLimitDeductOne(this.convKey, this.uid)
            }

            // 有發言回應後就取消 priority
            this.updatePriority(this.uid, this.otherUid, false)
          }, err => {
            console.error('上傳失敗')
          })
          .then(() => {
            if (!this.state.dontAskPriorityAgain && this.msgSent >= 1) {
              this.msgSent = this.msgSent + 1
              setTimeout(() => {
                this.setState({ showPriorityModal: true })
              }, 1000)
            }
          })
        }
      })
    } else {
      this.setState({ showMsgLimitModal: true })
    }
  }

  handlePhotoPicker = () => {
    if (!this.meetMsgLimit()) {
      const msgRef = this.firebase
        .database()
        .ref(`conversations/${this.convKey}/messages`)
      // console.log("handlePhotoPicker called")
      ImagePicker.launchImageLibrary(ImagePickerOptions, response => {
        // console.log("Response = ", response)

        if (response.didCancel) {
          console.log("User cancelled image picker")
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error)
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton)
        } else {
          this.setState({ action: "uploading" })
          let meta
          const filename = response.fileName
          const imgType = filename.split('.').pop()
          if (imgType == 'PNG' || imgType == 'png') {
            meta = pngmetadata
          }
          if (imgType == 'JPG' || imgType == 'jpg' || imgType == 'jpeg' || imgType == 'JPEG') {
            meta = jpgmetadata
          }
          // console.log("response: ", response)
          // console.log("meta: ", meta)

          const uri = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri.replace('file:/')

          this.firebase.storage().ref(`chat/${this.convKey}/${this.uid}/${filename}`).putFile(uri, meta)
          .then(uploadedFile => {
            // console.log("downloadUrl: ", uploadedFile.downloadUrl)
            const _id = this.genID()
            const msgObj = {
              _id,
              text: "",
              createdAt: Moment().format(),
              user: {
                _id: this.uid,
                name: this.SubjectStore.nickname,
                avatar: this.SubjectStore.avatar,
              },
              image: uploadedFile.downloadUrl,
            }

            this.syncMsgToFirebase(msgObj)
            // adds 1 to conversation
            this.unreadAddOne(this.convKey, this.otherUid)
            if (this.state.visitorMsgLimit > 0) {
              this.visitorMsgLimitDeductOne(this.convKey, this.uid)
            }
            // 有發言回應後就取消 priority
            this.updatePriority(this.uid, this.otherUid, false)
          }, err => {
            console.error('上傳失敗')
            this.setState({ action: false })
          })
          .then(() => {
            if (!this.state.dontAskPriorityAgain && this.msgSent >= 1) {
              this.msgSent = this.msgSent + 1
              setTimeout(() => {
                this.setState({ showPriorityModal: true })
              }, 1000)
            }
          })
        }
      })
    } else {
      this.setState({ showMsgLimitModal: true })
    }
  }

  genID = () => {
    const id = Moment().unix()
    return id
  }

  syncMsgToFirebase = msgObj => {
    this.firebase
      .database()
      .ref(`conversations/${this.convKey}/messages/${msgObj._id}`).set(msgObj)

    this.setState({
      inputText: '',
      minToolBarHeight: DEFAULT_MIN_INPUT_TOOLBAR_HEIGHT,
      action: false,
    })
  }

  // TODO: use custom message obj for stickers with sticker id only and place
  // sticker images in storage to be called as static image source.
  handleStickerPressed = uri => {
    if (!this.meetMsgLimit()) {
      const msgRef = this.firebase
        .database()
        .ref(`conversations/${this.convKey}/messages`)

      const _id = this.genID()
      const msgObj = {
        _id,
        text: "",
        createdAt: Moment().format(),
        user: {
          _id: this.uid,
          name: this.SubjectStore.nickname,
          avatar: this.SubjectStore.avatar,
        },
        sticker: uri,
      }
      // console.log("uri: ", uri)
      this.syncMsgToFirebase(msgObj)
      // adds 1 to conversation
      this.unreadAddOne(this.convKey, this.otherUid)
      if (this.state.visitorMsgLimit > 0) {
        this.visitorMsgLimitDeductOne(this.convKey, this.uid)
      }
      // 有發言回應後就取消 priority
      this.updatePriority(this.uid, this.otherUid, false)
    } else {
      this.setState({ showMsgLimitModal: true })
      if (!this.state.dontAskPriorityAgain && this.msgSent >= 1) {
        this.msgSent = this.msgSent + 1
        setTimeout(() => {
          this.setState({ showPriorityModal: true })
        }, 1000)
      }
    }
  }

  handleActionPressed = () => {
    console.log("Action pressed: ", this.state.action)
  }

  renderComposer = () => {
    // console.log("renderComposer: ", this.state.action)
    switch (this.state.action) {
      case "smily":
        return (
          <ScrollView
            scrollEnabled={false}
            style={{
              flex: 1,
              width,
              height: STICKER_TOOLBAR_HEIGHT,
              borderTopWidth: 0.5,
              borderColor: "#E0E0E0",
            }}
          >
            <View
              style={{
                width,
                marginVertical: 5,
                alignSelf: "center",
              }}
            >
              <Icon
                name="keyboard-hide"
                size={30}
                onPress={() => {
                  this.setState({
                    action: false,
                    minToolBarHeight: DEFAULT_MIN_INPUT_TOOLBAR_HEIGHT,
                    inputOffset: DEFAULT_INPUT_OFFSET,
                  })
                }}
              />
            </View>
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                width,
                alignItems: 'center',
                paddingVertical: 3,
              }}
            >
              <Stickers
                width={width}
                handleStickerPressed={this.handleStickerPressed}
              />
            </ScrollView>
          </ScrollView>
        )
      case "uploading":
        return (
          <View
            style={{
              marginTop: 50,
              width,
              height: 50,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator />
            <Text>照片壓縮處理中...</Text>
          </View>
        )
      case "plus":
        return (
          <ScrollView
            scrollEnabled={false}
            style={{
              width,
              height: STICKER_TOOLBAR_HEIGHT,
              borderTopWidth: 0.5,
              borderColor: "#E0E0E0",
            }}
          >
            <View
              style={{
                width: 60,
                marginVertical: 5,
                alignSelf: "center",
              }}
            >
              <Icon
                name="keyboard-hide"
                size={30}
                onPress={() => {
                  this.setState({
                    action: false,
                    minToolBarHeight: DEFAULT_MIN_INPUT_TOOLBAR_HEIGHT,
                    inputOffset: DEFAULT_INPUT_OFFSET,
                  })
                }}
              />
            </View>
            <View
              style={{
                width,
                height: 120,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ flex: 1, backgroundColor: "#FDFDFD", alignItems: "center", paddingLeft: 20 }}>
                <TouchableOpacity onPress={this.handlePhotoPicker}>
                  <Image
                    style={{ width: 51, height: 39.5 }}
                    source={require('../../../../images/btn_chat_album.png')}
                  />
                  <Text style={{ marginTop: 3, alignSelf: 'center'}}>{LABEL_ALBUM}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, backgroundColor: "#FDFDFD", alignItems: "center", paddingRight: 20 }}>
                <TouchableOpacity onPress={this.handleCameraPicker}>
                  <Image
                    style={{ width: 51, height: 39.5}}
                    source={require('../../../../images/btn_chat_shot.png')}
                  />
                  <Text style={{ marginTop: 3, alignSelf: 'center'}}>{LABEL_CAMERA}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )
      default:
        return (
          // 這裡用 ScrollView 是因為這樣可以讓user在鍵盤出現的時候只要點擊任何一個非鍵盤區域就會收起鍵盤
          <ScrollView
            scrollEnabled={false}
            contentContainerStyle={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: width - this.state.inputOffset
            }}
          >
            <TextInput
              placeholderTextColor="#E0E0E0"
              placeholder={PLACEHOLDER}
              autoFocus
              value={this.state.inputText.toString()}
              style={{
                marginTop: 3,
                maxHeight: 100,
                height: this.state.inputHeight,
                fontSize: 16,
                fontFamily: 'NotoSans',
                color: '#606060',
                width: width - this.state.inputOffset,
                padding: 5,
              }}
              onChangeText={(text) => {
                this.setState({inputText: text})
              }}
            />
            <TouchableOpacity onPress={this.onSend}>
              <Image
                style={{ width: 30, height: 30}}
                source={require('../../../../images/btn_chat_send.png')}
              />
            </TouchableOpacity>
          </ScrollView>
        )
    }
  }

  callbackFunc = (boolean, code) => {
    // console.log("callbackFunc called: ", boolean, " ", code)
    if (boolean) { // true表示已完成扣點
      if (code == 'visitorMsgLimit') {
        // console.log("Add visitor msg limit by 1")
        this.visitorMsgLimitAddOne(this.convKey, this.uid)
      }
      if (code == 'priority') {
        // console.log("Make priority:")
        this.updatePriority(this.uid, this.otherUid, true)
        this.setState({dontAskPriorityAgain: true})
      }
    }
  }

  useBonusForPriority = () => {
    Actions.UseBonus({
      nickname: this.other.nickname,
      avatarUrl: this.other.avatar,
      code: 'priority',
      callback: this.callbackFunc,
    })
  }

  useBonusForMoreMsg = () => {
    Actions.UseBonus({
      nickname: this.other.nickname,
      avatarUrl: this.other.avatar,
      code: 'visitorMsgLimit',
      callback: this.callbackFunc,
    })
  }

  useBonus = (reason, val) => {
    switch (reason) {
      case "visitorMsgLimit":
        this.setState({ showMsgLimitModal: false })
        this.useBonusForMoreMsg()
        break
      case "priority":
        this.setState({ showPriorityModal: false, dontAskPriorityAgain: true })
        this.useBonusForPriority()
        break
      default:
    }
  }

  notInterested = () => {
    this.setState({ showVisitorModal: false, visit: false })
    this.SubjectStore.deleteConv(this.otherUid)
    this.firebase.database().ref(`users/${this.uid}/conversations/${this.otherUid}`).remove()
    Actions.LineList({t: "reset"})
  }

  startChatting = () => {
    this.setState({ showVisitorModal: false, visit: false })
    this.firebase.database().ref(`users/${this.uid}/conversations/${this.otherUid}/visit`).set(false)
    this.firebase.database().ref(`users/${this.otherUid}/conversations/${this.uid}/visit`).set(false)
    this.SubjectStore.setConvVisit(this.otherUid, false)
  }

  cancelSend = () => {
    this.setState({
      dontAskPriorityAgain: true,
      showMsgLimitModal: false,
      showVisitorModal: false,
      showPriorityModal: false,
    })
  }

  initChatRoom = () => {
    if (this.convKey) {
      // convKey is given
      this.updateAndLoad(this.convKey)
    } else if (
      !this.SubjectStore.conversations ||
      !this.SubjectStore.conversations[this.otherUid]
    ) {
      // Create a new conversation
      this.createNewConv()
    } else {
      // convKey not given but theOtherUid is given
      this.convKey = this.SubjectStore.conversations[
        this.otherUid
      ].convKey
      this.updateAndLoad(this.convKey)
    }
  }

  visitConvSentTodayUpdate = () => {
    this.firebase.database().ref(`users/${this.SubjectStore.uid}/visitConvSentToday`).set(this.SubjectStore.visitConvSentToday)
  }

  refreshHeader = (user) => {
    const age = Moment().diff(user.birthday, 'years')
    const name = user.nickname
    const chatStatus = translateChatStatus(this.other.chatStatus)
    if (!chatStatus || chatStatus.length == 0) {
      this.title = `${name}, ${age}`
    } else {
      this.title = `${name}, ${age}, ${chatStatus}`
    }
    Actions.refresh({ title: this.title })
  }

  meetMsgLimit = () => {
    // console.log("this.state.messages: ", this.state.messages)
    // console.log("this.state.visit: ", this.state.visit, " this.role: ", this.role, " this.state.visitorMsgLimit: ", this.state.visitorMsgLimit)
    if (this.state.visit && this.role == "wooer" && this.state.visitorMsgLimit <= 0) {
      return true
    }
    return false
  }

  renderBubble(props) {
    let leftBgColor = "#E7E7E7"
    let rightBgColor = "#F4A764"
    if (props.currentMessage.sticker || props.currentMessage.image) {
      leftBgColor = "transparent"
      rightBgColor = "transparent"
    }
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: leftBgColor,
          },
          right: {
            backgroundColor: rightBgColor,
          } }}
      />
    )
  }

  renderStickerView(props) {
    if (props.currentMessage.sticker) {
      return (
        <Image
          style={{ width: 108, height: 90}}
          source={{uri: props.currentMessage.sticker}}
        />
      );
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          height: (Platform.OS === 'ios') ? height - 80 : height - 90,
          width,
          marginTop: 11,
        }}
      >
        <GiftedChat
          ref={ref => (this.chat = ref)}
          style={{width}}
          messages={this.state.messages}
          messageIdGenerator={this.genID}
          onSend={this.onSend}
          label={LABEL_SEND}
          LoadEarlier={true}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          user={{
            _id: this.uid,
          }}
          onInputTextChanged={() => this.meetMsgLimit()}
          minInputToolbarHeight={this.state.minToolBarHeight}
          placeholder={PLACEHOLDER}
          renderComposer={this.renderComposer}
          renderActions={this.renderActions}
          onPressActionButton={this.handleActionPressed}
          renderFooter={this.renderFooter}
          renderBubble={this.renderBubble}
          renderCustomView={this.renderStickerView}
        />
        <Modal
          isVisible={this.state.showVisitorModal}
          backdropColor="black"
          backdropOpacity={0.7}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Text style={{ margin: 10, color: "white" }}>新的來訪留言</Text>
            <Button
              title="與他/她聊聊"
              buttonStyle={styles.btnUseBonus}
              onPress={this.startChatting}
            />
            <Button
              title="不感興趣"
              buttonStyle={styles.btnCancel}
              onPress={this.notInterested}
            />
          </View>
        </Modal>
        <Modal
          isVisible={this.state.showMsgLimitModal}
          backdropColor="black"
          backdropOpacity={0.7}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              backgroundColor: "white",
              borderRadius: 26,
            }}
          >
            <Text style={{ margin: 10 }}>{MSG_TOO_MANY_SENT}</Text>
            <Button
              title={LABEL_USE_BONUS}
              textStyle={styles.btnTextUseBonus}
              buttonStyle={styles.btnUseBonus}
              onPress={() => this.useBonus("visitorMsgLimit", 30)}
            />
            <Button
              title={LABEL_CANCEL}
              textStyle={styles.btnTextCancel}
              buttonStyle={styles.btnCancel}
              onPress={this.cancelSend}
            />
          </View>
        </Modal>
        <Modal
          isVisible={this.state.showPriorityModal}
          backdropColor="black"
          backdropOpacity={0.7}
        >
          <View
            style={styles.modalViewContainer}
          >
            <Text style={styles.modalText}>
              {MSG_PRIORITY}
            </Text>
            <Button
              title="LABEL_USE_BONUS"
              textStyle={styles.btnTextUseBonus}
              buttonStyle={styles.btnUseBonus}
              onPress={() => this.useBonus("priority", 100)}
            />
            <Button
              title="LABEL_CANCEL"
              textStyle={styles.btnTextCancel}
              buttonStyle={styles.btnCancel}
              onPress={this.cancelSend}
            />
          </View>
        </Modal>
      </View>
    )
  }
}

// <Modal
//   isVisible={this.state.action == "smily"}
//   backdropColor="black"
//   backdropOpacity={0.7}
// >
//   <Stickers
//     width={width}
//     handleStickerPressed={this.handleStickerPressed}
//   />
// </Modal>
