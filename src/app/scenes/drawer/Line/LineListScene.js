import React, { Component } from "react"
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  // TextInput,
  FlatList,
} from "react-native"
import { observer, inject } from "mobx-react"
import { List, Icon } from "react-native-elements"
import { Actions } from "react-native-router-flux"
// import Modal from "react-native-modal"
import DropdownMenu from "react-native-dropdown-menu"
import { calculateAge } from "../../../Utils"
import Conversation from "./components/Conversation"

const noMsg = "沒有訊息"
const { width, height } = Dimensions.get("window") //eslint-disable-line
const menuData = [["所有訊息", "未讀訊息", "訪客訊息"]]

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

@inject("firebase", "SubjectStore")
@observer
export default class LineListScene extends Component {
  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore

    this.uid = this.SubjectStore.uid
    console.log("this.uid")
    this.convNum = 0
    this.state = {
      size: {
        width,
        height,
      },
      convs: [],
      isLoading: true,
      listFilter: "all",
      noData: false,
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

  sortConv = () => {
    const newC = this.state.convs
    newC.sort(this.compare())
  }

  compare(a, b) {
    if (a.sortKey < b.sortKey)
      return -1;
    if (a.sortKey > b.sortKey)
      return 1;
    return 0;
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

  render() {
    const convs = this.state.convs
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

    return (
      <View>
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
      </View>
    )
  }
}
