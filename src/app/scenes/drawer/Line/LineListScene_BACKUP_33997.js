import React, { Component } from "react"
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native"
import { observer, inject } from "mobx-react"
import { List, Icon, Button } from "react-native-elements"
import { Actions } from "react-native-router-flux"
import Modal from "react-native-modal"
import DropdownMenu from "react-native-dropdown-menu"

<<<<<<< HEAD
import { calculateAge } from '../../../Utils'
import Cookie from '../../../views/Cookie'
=======
import { calculateAge } from "../../../Utils"
import Conversation from "./components/Conversation"

const noMsg = "沒有訊息"
const { width, height } = Dimensions.get("window") //eslint-disable-line
const menuData = [["所有訊息", "未讀訊息", "訪客訊息"]]
>>>>>>> dev_re_kt

const styles = {
  child: {
    backgroundColor: "transparent",
    letterSpacing: 3,
    fontFamily: "NotoSans",
    color: "#b3b3b3",
    fontSize: 15,
  },
  headView: {
    alignItems: "flex-end",
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
  },
  count: {
    paddingRight: 20,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
}

@inject("firebase", "FateStore", "SubjectStore")
@observer
export default class LineListScene extends Component {
  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.FateStore = this.props.FateStore

    this.uid = this.SubjectStore.uid
    console.log("this.uid")
    this.convNum = 0
    this.state = {
      size: {
        width,
        height,
      },
      convs: [],
      myStatus: this.SubjectStore.chatStatus ? this.SubjectStore.chatStatus : 1,
      isLoading: true,
      pickerShow: false,
      listFilter: "all",
      noData: false,
      statusModalShow: false,
      selfInputChatStatus: "",
      upgradeModalShow: false,
      selfInputModalShow: false,
    }
  }

  componentWillMount() {
    Actions.refresh({ key: "Drawer", open: false })
  }

  componentDidMount() {
    this.getUserConvs(true)
  }

  componentWillUnmount() {
    this.stopListener()
  }

  onPress = () => {
    Actions.Line()
  }

  onlineListener(userId, key, on) {
    const ref = this.firebase.database().ref(`online/${userId}`)
    const listen = snap => {
      const newConvs = this.state.convs
      if (snap.exists()) {
        console.log(newConvs[key].name, " is online")
        newConvs[key].online = true
        this.setState({ convs: newConvs })
      } else {
        console.log(newConvs[key].name, " is offline")
        newConvs[key].online = false
        this.setState({ convs: newConvs })
      }
      return newConvs
    }

    if (on) {
      // console.log("onlineListener on: ", userId)
      return ref.on("value", listen)
    }
    // console.log("onlineListener off: ", userId)
    return ref.off("value", listen)
  }

  onChatStatusPressed = () => {
    this.setState({ statusModalShow: true })
  }

  getUserData = uid => {
    const ref = this.firebase.database().ref(`users/${uid}`)
    ref.once("value").then(snap => {
      if (snap.exists()) {
        console.log("getUserData: ", snap.val())
      }
    })
  }

  getUserConvs = on => {
    const myConvListRef = this.firebase
      .database()
      .ref(`users/${this.uid}/conversations`)
      .orderByChild("priority")

    const listen = convSnap => {
      this.setState({ isLoading: true })
      const convs = []
      // console.log('CHECK: ', convSnap.val())
      if (convSnap.exists()) {
        this.convNum = convSnap.numChildren()
        convSnap.forEach(childConv => {
          // console.log("priority: ", childConv.val().priority)
          const convKey = childConv.val().convKey
          const theOtherUid = childConv.key
          const priority = childConv.val().priority
          const visit = childConv.val().visit ? childConv.val().visit : false
          const convRef = this.firebase
            .database()
            .ref(`conversations/${convKey}`)

          let convData = {}

          convRef.once("value").then(snap => {
            const data = snap.val()
            const myUid = this.SubjectStore.uid
            const myData = data.users[myUid]
            const theOtherData = data.users[theOtherUid]
            convData = {
              convKey,
              unread: myData.unread,
              lastRead: myData.lastRead,
              visit,
              uid: theOtherUid,
              chatStatus: 0,
              priority,
              name: theOtherData.name,
              avatar: theOtherData.avatar,
              birthday: theOtherData.birthday,
              online: false,
              subtitle: null,
            }

            convs.push(convData)
            // console.log("CHECK convs: ", this.state.convs)
            this.setState({ noData: false, isLoading: false, convs })
            this.startListener()
          })
        })
      } else {
        this.setState({ convs: [], noData: true, isLoading: false })
      }
    }

    if (on) {
      return myConvListRef.on("value", listen)
    }
    return myConvListRef.off("value", listen)
  }

  getChatStatus = status => {
    switch (status) {
      case 0:
        return "我的狀態"
      case 1:
        return "放空中"
      case 2:
        return "忙碌中"
      case 3:
        return "低潮中"
      default:
        return status
    }
  }

  startListener() {
    // console.log("startListener: ", this.state.convs[0])
    this.state.convs.map((conv, key) => {
      this.unreadListener(conv.convKey, this.uid, key, true)
      this.chatStatusListener(conv.uid, key, true)
      this.onlineListener(conv.uid, key, true)
      this.lastSentenceListener(conv.convKey, key, true)
      return 0
    })
  }

  stopListener() {
    // console.log("stopListener: ", this.state.convs[0])
    this.state.convs.map((conv, key) => {
      this.unreadListener(conv.convKey, this.uid, key, false)
      this.chatStatusListener(conv.uid, key, false)
      this.onlineListener(conv.uid, key, false)
      this.lastSentenceListener(conv.convKey, key, false)
      return 0
    })
  }

  unreadListener(convKey, uid, key, on) {
    const ref = this.firebase
      .database()
      .ref(`conversations/${convKey}/users/${uid}/unread`)
    const listen = snapshot => {
      if (snapshot.exists()) {
        const newConvs = this.state.convs
        // console.log("listenUnread on uid: ", uid, " val: ", snapshot.val())
        newConvs[key].unread = snapshot.val()
        this.setState({
          convs: newConvs,
        })
      } else {
        const newConvs = this.state.convs
        // console.log("listenUnread on uid: ", uid, " val: ", snapshot.val())
        newConvs[key].unread = 0
        this.setState({
          convs: newConvs,
        })
        return newConvs
      }
    }

    if (on) {
      // console.log("unreadListener on: ", convKey)
      // ref.on("value", listen)
      return ref.on("value", listen)
    }
    // console.log("unreadListener off: ", convKey)
    ref.off("value", listen)
  }

  chatStatusListener(userId, key, on) {
    const ref = this.firebase.database().ref(`users/${userId}/chatStatus`)
    const listen = snapshot => {
      if (snapshot.exists()) {
        // console.log("listenChatStatus: ", snapshot.val())
        // console.log("key: ", key)
        const newConvs = this.state.convs
        newConvs[key].chatStatus = snapshot.val()
        this.setState({
          convs: newConvs,
        })
        return newConvs
      }
      // console.log("this.state.convs: ", this.state.convs)
    }

    if (on) {
      // console.log("chatStatusListener on: ", userId)
      return ref.on("value", listen)
    }
    // console.log("chatStatusListener off: ", userId)
    return ref.off("value", listen)
  }

  lastSentenceListener = (cid, key, on) => {
    const ref = this.firebase
      .database()
      .ref(`conversations/${cid}/messages`)
      .limitToLast(1)
    const listen = snap => {
      if (snap.exists()) {
        const newConvs = this.state.convs
        snap.forEach(obj => {
          // console.log("last message: ", obj.val().text)
          const text = obj.val().text ? obj.val().text : "傳送了一張圖像"
          newConvs[key].subtitle = text
          this.setState({
            convs: newConvs,
          })
          return newConvs
        })
      }
    }

    if (on) {
      // console.log("lastSentenceListener on: ", key)
      return ref.on("value", listen)
    }
    // console.log("lastSentenceListener off: ", key)
    return ref.off("value", listen)
  }

  lastSentenceListener = (cid, key, on) => {
    const ref = this.firebase
      .database()
      .ref(`conversations/${cid}/messages`)
      .limitToLast(1)
    const listen = snap => {
      if (snap.exists()) {
        const newConvs = this.state.convs
        snap.forEach(obj => {
          // console.log("last message: ", obj.val().text)
          const text = obj.val().text ? obj.val().text : "傳送了一張圖像"
          newConvs[key].subtitle = text
          this.setState({
            convs: newConvs,
          })
          return newConvs
        })
      }
    }

    if (on) {
      // console.log("lastSentenceListener on: ", key)
      return ref.on("value", listen)
    }
    // console.log("lastSentenceListener off: ", key)
    return ref.off("value", listen)
  }

  handleFilterChange = (val, selection, row) => {
    let convs = this.state.convs
    if (selection === 0) {
      switch (row) {
        // all
        case 0:
          this.getUserConvs(false)
          this.getUserConvs(true)
          break
        // unread
        case 1:
          convs = convs.filter(conv => {
            return conv.unread > 0
          })
          if (convs.length == 0) {
            this.setState({ convs, noData: true })
          } else {
            this.setState({ convs })
          }
          break
        // visitor
        case 2:
          convs = convs.filter(conv => {
            return conv.visit
          })
          if (convs.length == 0) {
            this.setState({ convs, noData: true })
          } else {
            this.setState({ convs })
          }
          break
        default:
      }
    }
  }

  showUpgradeModal = () => {
    this.setState({
      isLoading: false,
      upgradeModalShow: true,
    })
  }

  selfInputModal = () => {
    this.setState({
      isLoading: false,
      selfInputModalShow: true,
    })
  }

  goToMemberUpgrade = () => {
    Actions.upgrade()
  }

  handleSelfInputSubmit = () => {
    // console.log("SelfInput submit pressed, myStatus: ", this.state.selfInputChatStatus)
    this.setState({
      selfInputModalShow: false,
      myStatus: this.state.selfInputChatStatus,
    })
    this.SubjectStore.setChatStatus(this.state.selfInputChatStatus)
    this.firebase.database().ref(`users/${this.uid}/chatStatus`).set(this.state.selfInputChatStatus)
  }

  handleSelfInputCancel = () => {
    this.setState({ selfInputModalShow: false, selfInputChatStatus: "" })
  }

  handleUpgrade = () => {
    this.setState({ upgradeModalShow: false })
    this.goToMemberUpgrade()
  }

  handleUpdateStatus = statusCode => {
    this.setState({ statusModalShow: false, myStatus: statusCode })
    this.SubjectStore.setChatStatus(statusCode)
    this.firebase.database().ref(`users/${this.uid}/chatStatus`).set(statusCode)
  }

  handleSelfInputPressed = () => {
    this.setState({ statusModalShow: false })
    if (!this.SubjectStore.vip) {
      setTimeout(() => {
        this.showUpgradeModal()
      }, 500)
      return
    }
    setTimeout(() => {
      this.selfInputModal()
    }, 500)
  }

  textInputOnChange = text => {
    this.setState({ selfInputChatStatus: text })
  }

  renderHeader = status => {
    const elementWidth = (width - 20) / 3
    return (
      <View
        style={{
          flexDirection: "row",
          paddingTop: 20,
          paddingHorizontal: 10,
          width,
          height: 64,
          backgroundColor: "#FFFFFF",
        }}
      >
        <View
          style={{
            height: 40,
            width: elementWidth,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Icon
            name="menu"
            color="#000"
            onPress={() =>
              Actions.refresh({ key: "Drawer", open: value => !value })}
          />
        </View>
        <View
          style={{
            height: 40,
            width: elementWidth,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              letterSpacing: 3,
              fontFamily: 'NotoSans',
              color: '#606060',
              fontWeight: '500',
              fontSize: 18,
            }}
          >
            {this.props.title}
          </Text>
        </View>
        <View
          style={{
            height: 40,
            width: elementWidth,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={this.onChatStatusPressed}>
            <Text>
              {this.getChatStatus(status)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const convs = this.state.convs
    const status = this.state.myStatus
    const indicator = (
      <ActivityIndicator
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          marginTop: 150,
        }}
        size="large"
      />
    )

    const chatStatusStyles = {
      containerStyle: {
        width: 260,
        alignItems: "center",
      },
      buttonStyle: {
        backgroundColor: "white",
      },
      textStyle: {
        backgroundColor: "white",
      },
      saveButtonStyle: {
        marginTop: 10,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
      },
      upgradeButtonStyle: {
        marginTop: 15,
        backgroundColor: "white",
        borderColor: "#B3B3B3",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
      },
      inputContainerStyle: {
        borderBottomWidth: 1,
        paddingLeft: 10,
        width: 70,
        borderBottomColor: "#BDBDBD",
        alignItems: "center",
      },
    }

    const modalContent = {
      backgroundColor: "white",
      padding: 20,
      width: 300,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      borderColor: "rgba(0, 0, 0, 0.1)",
      marginBottom: 100,
    }

    return (
      <View>
        {this.renderHeader(status)}
        <ScrollView style={{ marginTop: 0 }}>
          <DropdownMenu
            style={{ backgroundColor: "#D63768" }}
            bgColor={"#D63768"}
            tintColor={"white"}
            selectItemColor={"#D63768"}
            data={menuData}
            maxHeight={430}
            handler={(selection, row) =>
              this.handleFilterChange(menuData[selection][row], selection, row)}
          >
            {this.state.isLoading && indicator}
            {!this.state.noData &&
              !this.state.isLoading &&
              <List containerStyle={{ marginBottom: 20, marginTop: -2 }}>
                {convs.map((conv, key) =>
                  <Conversation conv={conv} key={conv.convKey} />,
                )}
              </List>}
            {this.state.noData &&
              !this.state.isLoading &&
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 100,
                }}
              >
                {noMsg}
              </Text>}
          </DropdownMenu>
        </ScrollView>
        <Modal
          style={{ alignItems: "center" }}
          isVisible={this.state.statusModalShow}
        >
          <View style={modalContent}>
            <Button
              title="放空中"
              onPress={() => this.handleUpdateStatus(1)}
              color="black"
              textStyle={chatStatusStyles.textStyle}
              buttonStyle={chatStatusStyles.buttonStyle}
              style={chatStatusStyles.containerStyle}
            />
            <Button
              title="忙碌中"
              onPress={() => this.handleUpdateStatus(2)}
              color="black"
              textStyle={chatStatusStyles.textStyle}
              buttonStyle={chatStatusStyles.buttonStyle}
              style={chatStatusStyles.containerStyle}
            />
            <Button
              title="低潮中"
              onPress={() => this.handleUpdateStatus(3)}
              color="black"
              textStyle={chatStatusStyles.textStyle}
              buttonStyle={chatStatusStyles.buttonStyle}
              style={chatStatusStyles.containerStyle}
            />
            <Button
              title="自定義"
              onPress={() => this.handleSelfInputPressed()}
              color="black"
              textStyle={chatStatusStyles.textStyle}
              buttonStyle={chatStatusStyles.buttonStyle}
              style={chatStatusStyles.containerStyle}
              iconRight
              icon={{ name: "edit", color: "#D63768" }}
            />
            <Button
              title="取消狀態"
              onPress={() => this.handleUpdateStatus(0)}
              color="black"
              textStyle={chatStatusStyles.textStyle}
              buttonStyle={chatStatusStyles.buttonStyle}
              style={chatStatusStyles.containerStyle}
            />
          </View>
        </Modal>
        <Modal
          style={{ alignItems: "center" }}
          isVisible={this.state.upgradeModalShow}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              width: 300,
              alignItems: "center",
              borderRadius: 10,
              borderColor: "rgba(0, 0, 0, 0.1)"
            }}
          >
            <Text
              style={{ marginVertical: 45, fontWeight: "600", fontSize: 16 }}
            >
              高級會員即可開啟此功能
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: 300,
                justifyContent: "space-between",
                paddingHorizontal: 50
              }}
            >
              <Button
                title="取消"
                onPress={() => this.setState({ upgradeModalShow: false })}
                color="#0076FF"
                buttonStyle={{ backgroundColor: "transparent" }}
              />
              <Button
                title="升級"
                onPress={() => this.handleUpgrade()}
                color="#0076FF"
                buttonStyle={{ backgroundColor: "transparent" }}
              />
            </View>
          </View>
        </Modal>
        <Modal
          style={{ alignItems: "center" }}
          isVisible={this.state.selfInputModalShow}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              width: 300,
              alignItems: "center",
              borderRadius: 10,
              borderColor: "rgba(0, 0, 0, 0.1)"
            }}
          >
            <Text style={{ marginTop: 25, fontWeight: "600", fontSize: 16 }}>
              請輸入自定義狀態
            </Text>
            <TextInput
              maxLength={3}
              onChangeText={text => this.textInputOnChange(text)}
              defaultValue={this.state.selfInputChatStatus}
              style={{
                marginVertical: 25,
                height: 40,
                width: 200,
                borderColor: "#B3B3B3",
                borderWidth: 1,
                borderRadius: 5
              }}
            />
            <View
              style={{
                flexDirection: "row",
                width: 300,
                justifyContent: "space-between",
                paddingHorizontal: 50
              }}
            >
              <Button
                title="取消"
                onPress={() => this.handleSelfInputCancel()}
                color="#0076FF"
                buttonStyle={{ backgroundColor: "transparent" }}
              />
              <Button
                title="送出"
                onPress={() => this.handleSelfInputSubmit()}
                color="#0076FF"
                buttonStyle={{ backgroundColor: "transparent" }}
              />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
