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
const metadata = {
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
      loadEarlier: false,
      isLoadingEarlier: false,
      action: false,
      image: null,
      visit: this.visit,
      showVisitorModal: false,
      showMsgLimitModal: false,
      showPriorityModal: false,
      dontAskPriorityAgain: false,
      minToolBarHeight: 45,
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.getUserData(this.otherUid)
    this.visitConvSentTodayUpdate()
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
      .on("child_added", msgSnap => {
        // console.log(`child_added: ${msgSnap.key}`)
        this.setState(previousState => {
          const msgId = msgSnap.val()._id
          // Update lastRead
          this.updateLastRead(convKey, msgId, uid)
          this.removeConversationPriority(this.uid, this.otherUid)
          this.clearUnread(convKey, uid)
          return {
            messages: GiftedChat.append(previousState.messages, msgSnap.val()),
          }
        })
      })
  }

  // update users' profile in conversation data
  updateAndLoad = _convKey => {
    const me = this.uid
    const theOther = this.otherUid
    const visit = this.state.visit
    const role = this.role
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

  // Only removes the priority of current user"s conversation record
  removeConversationPriority = (uid, otherUid) => {
    const convRef = this.firebase
      .database()
      .ref(`users/${uid}/conversations/${otherUid}`)

    convRef.update({ priority: 99 })
  }

  getPriority = (uid, otherUid) => {
    this.firebase
      .database()
      .ref(`users/${otherUid}/conversations/${uid}/priority`)
      .once(
        "value",
        snap => {
          if (snap.exists()) {
            return snap.val()
          }
          console.log("No such conversation in user conv list")
          return null
        },
        err => {
          console.log(`Chat/getPriority error: ${err}`)
        },
      )
  }

  makeConversationPriority = (uid, otherUid) => {
    this.firebase
      .database()
      .ref(`users/${otherUid}/conversations/${uid}/priority`).set(0)
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

  onSend = (messages = []) => {
    if (!this.meetMsgLimit()) {
      const createdAt = Moment().format()
      messages[0].user.name = this.SubjectStore.nickname
      messages[0].user.avatar = this.SubjectStore.avatar
      messages[0].createdAt = createdAt

      // console.log("onSend: ", messages[0].createdAt)
      const msgObj = messages[0]
      this.syncMsgToFirebase(msgObj)

      // adds 1 to the other user"s conversation bucket"s unread field
      this.unreadAddOne(this.convKey, this.otherUid)
      // console.log("visitorMsgLimit: ", this.state.visitorMsgLimit)
      if (this.state.visitorMsgLimit > 0) {
        this.visitorMsgLimitDeductOne(this.convKey, this.uid)
      }

      if (
        !this.getPriority(this.uid, this.otherUid) &&
        !this.state.dontAskPriorityAgain
      ) {
        this.setState({ showPriorityModal: true })
      }

      Keyboard.dismiss()
    } else {
      this.setState({ showMsgLimitModal: true })
    }
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
  renderActionBar = () => {
    if (!this.state.action) {
      return (
        <View
          style={{
            flex: 0,
            width: 80,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            paddingVertical: 3,
            alignSelf: "center",
          }}
        >
          <Icon
            name="add"
            onPress={() => {
              Keyboard.dismiss()
              this.setState({ action: "plus" })
            }}
          />
          <Icon
            name="mood"
            onPress={() => {
              Keyboard.dismiss()
              this.setState({ action: "smily" })
            }}
          />
        </View>
      )
    } else if (this.state.action == "plus") {
      return (
        <View
          style={{
            flex: 0,
            width: 45,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            paddingVertical: 3,
            alignSelf: "center",
          }}
        >
          <Icon
            name="keyboard-hide"
            onPress={() => {
              this.setState({ action: false })
            }}
          />
        </View>
      )
    } else if (this.state.action == "smily") {
      return (
        <View
          style={{
            flex: 0,
            width: 45,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            paddingVertical: 3,
            alignSelf: "center",
          }}
        >
          <Icon
            name="keyboard-hide"
            onPress={() => {
              this.setState({ action: false })
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
      console.log("handlePhotoPicker called")
      ImagePicker.launchCamera(ImagePickerOptions, async response => {
        console.log("Response = ", response)

        if (response.didCancel) {
          console.log("User cancelled image picker")
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error)
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton)
        } else {
          this.setState({ action: "uploading" })

          const filename = response.fileName.replace("JPG", "jpg")
          console.log("response", filename)

          const uri = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri.replace('file:/')
          this.firebase.storage().ref(`chat/${this.convKey}/${this.uid}/${filename}`).putFile(uri, metadata)
          .then(uploadedFile => {
            console.log("downloadUrl: ", uploadedFile.downloadUrl)
            const _id = uuid.v4()
            const msgObj = {
              _id,
              text: "",
              createdAt: new Date(),
              user: {
                _id: this.uid,
                name: this.SubjectStore.nickname,
                avatar: this.SubjectStore.avatar,
              },
              image: uploadedFile.downloadUrl,
            }
            if (
              !this.getPriority(this.uid, this.otherUid) &&
              !this.state.dontAskPriorityAgain
            ) {
              this.setState({ showPriorityModal: true })
            }
            this.syncMsgToFirebase(msgObj)
            // adds 1 to conversation
            this.unreadAddOne(this.convKey, this.otherUid)
            // 有發言回應後就取消 priority
            this.removeConversationPriority(this.uid, this.otherUid)
          }, err => {
            console.error('上傳失敗')
            this.setState({ action: false })
          })
          .then(() => {
            this.setState({ action: false })
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
      console.log("handlePhotoPicker called")
      ImagePicker.launchImageLibrary(ImagePickerOptions, async response => {
        console.log("Response = ", response)

        if (response.didCancel) {
          console.log("User cancelled image picker")
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error)
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton)
        } else {
          this.setState({ action: "uploading" })

          const filename = response.fileName.replace("JPG", "jpg")
          console.log("response", filename)

          const uri = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri.replace('file:/')
          this.firebase.storage().ref(`chat/${this.convKey}/${this.uid}/${filename}`).putFile(uri, metadata)
          .then(uploadedFile => {
            console.log("downloadUrl: ", uploadedFile.downloadUrl)
            const _id = uuid.v4()
            const msgObj = {
              _id,
              text: "",
              createdAt: new Date(),
              user: {
                _id: this.uid,
                name: this.SubjectStore.nickname,
                avatar: this.SubjectStore.avatar,
              },
              image: uploadedFile.downloadUrl,
            }

            this.setState({ showPriorityModal: true })
            this.syncMsgToFirebase(msgObj)
            // adds 1 to conversation
            this.unreadAddOne(this.convKey, this.otherUid)
            // 有發言回應後就取消 priority
            this.removeConversationPriority(this.uid, this.otherUid)
          }, err => {
            console.error('上傳失敗')
            this.setState({ action: false })
          })
          .then(() => {
            this.setState({ action: false })
          })
        }
      })
    } else {
      this.setState({ showMsgLimitModal: true })
    }
  }

  syncMsgToFirebase = msgObj => {
    this.firebase
      .database()
      .ref(`conversations/${this.convKey}/messages/${msgObj._id}`).set(msgObj)

    this.setState({
      action: false,
    })
  }

  // TODO: use custom message obj for stickers with sticker id only and place
  // sticker images in storage to be called as static image source.
  handleStickerPressed = uri => {
    // https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/16861101/android/sticker.pngcompress=true
    if (!this.meetMsgLimit()) {
      const msgRef = this.firebase
        .database()
        .ref(`conversations/${this.convKey}/messages`)

      const _id = uuid.v4()
      const msgObj = {
        _id,
        text: "",
        createdAt: new Date(),
        user: {
          _id: this.uid,
          name: this.SubjectStore.nickname,
          avatar: this.SubjectStore.avatar,
        },
        sticker: uri,
      }

      if (
        !this.getPriority(this.uid, this.otherUid) &&
        !this.state.dontAskPriorityAgain
      ) {
        this.setState({ showPriorityModal: true })
      }
      this.syncMsgToFirebase(msgObj)
      // adds 1 to conversation
      this.unreadAddOne(this.convKey, this.otherUid)
      // 有發言回應後就取消 priority
      this.removeConversationPriority(this.uid, this.otherUid)
    } else {
      this.setState({ showMsgLimitModal: true })
    }
  }

  renderAccessory = () => {
    // console.log("renderAccessory: ", this.state.action)
    switch (this.state.action) {
      // If height higher than 160, scroll won't work
      case "smily":
        return (
          <View
            style={{
              width,
              height: 200,
              borderTopWidth: 0.5,
              borderColor: "#E0E0E0",
            }}
          >
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                width,
                alignItems: 'center',
                paddingVertical: 5,
              }}
            >
              <Stickers
                width={width}
                handleStickerPressed={this.handleStickerPressed}
              />
            </ScrollView>
          </View>
        )
      case "uploading":
        return (
          <View
            style={{
              width,
              height: 115,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderTopWidth: 0.5,
              borderColor: "#E0E0E0",
            }}
          >
            <ActivityIndicator />
            <Text> 照片壓縮處理中... </Text>
          </View>
        )
      case "plus":
        return (
          <View
            style={{
              width,
              height: 115,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderTopWidth: 0.5,
              borderColor: "#E0E0E0",
            }}
          >
            <View style={{ flex: 1, alignItems: "center", paddingLeft: 20 }}>
              <TouchableOpacity onPress={this.handlePhotoPicker}>
                <Image
                  style={{ width: 51, height: 39 }}
                  source={require('../../../../images/btn_chat_album.png')}
                />
                <Text style={{ marginTop: 3, alignSelf: 'center'}}>相簿</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center", paddingRight: 20 }}>
              <TouchableOpacity onPress={this.handleCameraPicker}>
                <Image
                  style={{ width: 51, height: 39}}
                  source={require('../../../../images/btn_chat_shot.png')}
                />
                <Text style={{ marginTop: 3, alignSelf: 'center'}}>拍照</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      default:

    }
  }

  callbackFunc = (boolean, usageCode) => {
    console.log("callbackFunc called: ", boolean, " ", usageCode)
    if (boolean) { // true表示已完成扣點
      if (usageCode == 'visitorMsgLimit') {
        // console.log("Add visitor msg limit by 1")
        this.visitorMsgLimitAddOne(this.convKey, this.uid)
      }
      if (usageCode == 'priority') {
        // console.log("Make priority:")
        this.makeConversationPriority(this.uid, this.otherUid)
        this.setState({dontAskPriorityAgain: true})
      }
    }
  }

  useBonusForPriority = () => {
    Actions.UseBonus({
      nickname: this.other.nickname,
      avatarUrl: this.other.avatar,
      usageCode: 'priority',
      callback: this.callbackFunc,
    })
  }

  useBonusForMoreMsg = () => {
    Actions.UseBonus({
      nickname: this.other.nickname,
      avatarUrl: this.other.avatar,
      usageCode: 'visitorMsgLimit',
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
    Actions.LineList({type: "reset"})
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

  msgKeyGenerator = () => {
    const key = this.firebase
      .database()
      .ref(`conversations/${this.convKey}/messages`)
      .push().key
    return key
  }

  getToolbarHeight = () => {
    switch (this.state.action) {
      case "plus":
        return 80
      case "smily":
        return 120
      case "uploading":
        return 65
      case false:
        return 42
      default:
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
    if (this.state.visit && this.role == "wooer" && this.state.visitorMsgLimit <= 0) {
      return true
    }
    return false
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: props.currentMessage.sticker ? "transparent" : "#E7E7E7",
          },
          right: {
            backgroundColor: props.currentMessage.sticker ? "transparent" : "#F4A764",
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

        {this.state.action &&
          <GiftedChat
            style={{width}}
            messages={this.state.messages}
            messageIdGenerator={() => uuid.v4()}
            onSend={this.onSend}
            label="送出"
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            user={{
              _id: this.uid,
            }}
            minInputToolbarHeight={this.getToolbarHeight()}
            placeholder="輸入訊息..."
            renderAccessory={this.renderAccessory}
            renderActions={this.renderActionBar}
            renderFooter={this.renderFooter}
            renderBubble={this.renderBubble}
            renderCustomView={this.renderStickerView}
          />}
        {!this.state.action &&
          <GiftedChat
            style={{width}}
            messages={this.state.messages}
            messageIdGenerator={() => uuid.v4()}
            onSend={this.onSend}
            label="送出"
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            user={{
              _id: this.uid,
            }}
            onInputTextChanged={() => this.meetMsgLimit()}
            minInputToolbarHeight={this.getToolbarHeight()}
            imageProps={this.state.image}
            placeholder="輸入訊息..."
            renderActions={this.renderActionBar}
            renderFooter={this.renderFooter}
            renderBubble={this.renderBubble}
            renderCustomView={this.renderStickerView}
          />}
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
            <Text style={{ margin: 10 }}>超過訪客留言次數限制：請等待對方回覆或是使用Q點繼續留言</Text>
            <Button
              title="使用Q點"
              textStyle={styles.btnTextUseBonus}
              buttonStyle={styles.btnUseBonus}
              onPress={() => this.useBonus("visitorMsgLimit", 30)}
            />
            <Button
              title="取消"
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
              訊息優先被看到：您可以使用Q點讓您的訊息優先顯示在對方的訊息中心！
            </Text>
            <Button
              title="使用Q點"
              textStyle={styles.btnTextUseBonus}
              buttonStyle={styles.btnUseBonus}
              onPress={() => this.useBonus("priority", 100)}
            />
            <Button
              title="不用"
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
