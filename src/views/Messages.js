import React, { Component } from "react";
import { View, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { Actions } from "react-native-router-flux";
import { observer } from "mobx-react/native";
import { List, ListItem, Text, Badge, Icon } from "react-native-elements";
// import SwipeList from "react-native-smooth-swipe-list";
import DropdownMenu from "react-native-dropdown-menu";
// import Moment from "moment";

const { width, height } = Dimensions.get("window"); //eslint-disable-line
const menuData = [["所有訊息", "未讀訊息", "訪客訊息"], ["我的狀態", "放空中", "忙碌中", "低潮中"]];

const styles = {};

@observer
export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.firebase = this.props.fire;
    this.convRef = this.firebase
      .database()
      .ref("conversations/" + this.store.user.uid);
    this.state = {
      size: {
        width,
        height
      },
      convs: [],
      isLoading: true,
      pickerShow: false,
      status: null,
      listFilter: "all",
      noData: false
    };
    this._isMounted = false;
  }

  componentWillMount() {
    console.debug("Rendering Messages");
    this._isMounted = false;
    Actions.refresh({ key: "drawer", open: false });
  }
  componentDidMount() {
    console.debug("Messages mounted");
    this._isMounted = true;
    this.getConvs("all");
  }

  componentWillUnmount() {}

  getConvs = filterType => {
    this.setState({ isLoading: true });

    const getUnread = this.convRef.orderByChild("unread").startAt(1);
    const getAll = this.convRef;
    const getVisitor = this.convRef.orderByChild("type").equalTo("visitor");

    let query = getAll;
    switch (filterType) {
      case "unread":
        query = getUnread;
        break;
      case "visitor":
        query = getVisitor;
        break;
      case "all":
        query = getAll;
        break;
    }

    query.once("value").then(snapForConvs => {
      // console.log('CHECK: ', snap.val());
      const convs = [];
      let key = 0;
      if (snapForConvs.exists()) {
        snapForConvs.forEach(childConv => {
          const queryKey = childConv.val().uid;
          console.log("Key: " + key + " convData: " + childConv.val().unread);

          this.firebase
            .database()
            .ref("messages/" + this.store.user.uid + "/" + queryKey)
            .limitToLast(1)
            .once("value")
            .then(snapshot => {
              let subtitle = "";

              if (snapshot.exists()) {
                snapshot.forEach(_msg => {
                  // console.log('_mag.val()', _msg.val());
                  if (_msg.child("image").exists()) {
                    console.log("Image exists");
                    subtitle = "傳了一張圖";
                  }

                  if (_msg.child("text").exists() && _msg.val().text != "") {
                    // console.log('Text exists');
                    subtitle = _msg.val().text;
                  }
                });
              }
              const userId = childConv.val().uid;
              const data = {
                uid: userId,
                name: childConv.val().name,
                avatarUrl: childConv.val().avatarUrl,
                age: childConv.val().age,
                type: childConv.val().type,
                priority: childConv.val().priority,
                chatStatus: "我的狀態",
                unread: childConv.val().unread,
                online: false,
                subtitle
              };

              convs.push(data);
              convs.sort(this.compare);

              this.setState({
                convs,
                isLoading: false,
                noData: false
              });
              return { userId, key };
              // this.unreadListener(userId, key);
              // this.chatStatusListener(userId, key);
              // return convs;
            })
            .then(retObj => {
              this.unreadListener(retObj.userId, retObj.key);
              this.chatStatusListener(retObj.userId, retObj.key);
              this.onlineListener(retObj.userId, retObj.key);
              key++;
            });
        });
      } else {
        this.setState({ convs: [], noData: true, isLoading: false });
      }
    });
  };

  unreadListener(uid, key) {
    const ref = this.firebase
      .database()
      .ref("conversations/" + this.store.user.uid + "/" + uid + "/unread");
    console.log("Start listening to unread on uid: " + uid + " key: " + key);
    ref.on("value", snapshot => {
      if (snapshot.exists()) {
        const newConvs = this.state.convs;
        console.log("listenUnread on uid: ", uid, " val: ", snapshot.val());
        newConvs[key].unread = snapshot.val();
        this.setState({
          convs: newConvs
        });
        return;
      }
      return;
    });
  }

  chatStatusListener(userId, key) {
    const ref = this.firebase.database().ref("users/" + userId + "/chatStatus");
    console.log(
      "Start listening to chatStatus on uid: " + userId + " key: " + key
    );
    ref.on(
      "value",
      snapshot => {
        if (snapshot.exists()) {
          console.log("listenChatStatus: ", snapshot.val());
          const newConvs = this.state.convs;
          newConvs[key].chatStatus = snapshot.val();
          this.setState({
            convs: newConvs
          });
          return;
        }
        console.log("Appstore getChatStatus: snapshot doesn't exist");
      },
      err => {
        console.log("Messages/chatStatusListener error: ", err);
        return "我的狀態";
      }
    );
  }

  onlineListener(userId, key) {
    const ref = this.firebase.database().ref("online/" + userId);
    ref.on(
      "value",
      snap => {
        const newConvs = this.state.convs;
        if (snap.exists()) {
          newConvs[key].online = true;
          this.setState({ convs: newConvs });
        } else {
          newConvs[key].online = false;
          this.setState({ convs: newConvs });
        }
      },
      err => {
        console.log("Messages/onlineListner error: ", err);
      }
    );
  }

  compare(a) {
    if (a.priority) return -1;
    if (!a.priority) return 1;
  }

  renderSubtitle = (subtitle, status, unread, online) => {
    const sub = subtitle.length > 11 ? subtitle.substring(0, 10) : subtitle;
    const _styles = {
      viewStyle: {
        flex: 1,
        marginHorizontal: 10,
        flexDirection: "row",
        alignItems: "center"
      },
      unreadBadge1: {
        marginTop: -48,
        marginLeft: -25,
        backgroundColor: "red",
        marginRight: 5,
        borderWidth: 1.3,
        borderColor: "white",
        padding: 6
      },
      unreadBadge2: {
        marginLeft: -25,
        marginTop: -45,
        backgroundColor: "red",
        marginRight: 6,
        borderWidth: 1.3,
        borderColor: "white",
        padding: 6
      },
      unreadBadgeText: { fontSize: 11, color: "white" },
      busyBadge: {
        marginTop: 26,
        marginLeft: -35,
        backgroundColor: "orange",
        marginRight: 5,
        borderWidth: 1.3,
        borderColor: "white",
        padding: 6
      },
      idleBadge: {
        marginTop: 26,
        marginLeft: -35,
        backgroundColor: "#FFF305",
        marginRight: 5,
        borderWidth: 1.3,
        borderColor: "white",
        padding: 6
      },
      blueBadge: {
        marginTop: 26,
        marginLeft: -35,
        backgroundColor: "#607D8B",
        marginRight: 5,
        borderWidth: 1.3,
        borderColor: "white",
        padding: 6
      },
      busyText: { fontSize: 11, color: "white" },
      idleText: { fontSize: 11, color: "gray" },
      subText1: { marginTop: -20, fontSize: 13 },
      subText2: { marginLeft: 15, fontSize: 13 },
      onlineBadge: {
        backgroundColor: "green"
      },
      offlineBadge: {
        backgroundColor: "gray"
      }
    };
    if (status) {
      switch (status) {
        case "忙碌中":
          return (
            <View style={_styles.viewStyle}>
              {unread > 0 &&
                <Badge containerStyle={_styles.unreadBadge1}>
                  <Text style={_styles.unreadBadgeText}>{unread}</Text>
                </Badge>}
              <Badge containerStyle={_styles.busyBadge}>
                <Text style={_styles.busyText}>{status}</Text>
              </Badge>
              <Text style={_styles.subText1}>{sub}</Text>
            </View>
          );
        case "放空中":
          return (
            <View style={_styles.viewStyle}>
              {unread > 0 &&
                <Badge containerStyle={_styles.unreadBadge1}>
                  <Text style={_styles.unreadBadgeText}>{unread}</Text>
                </Badge>}
              <Badge containerStyle={_styles.idleBadge}>
                <Text style={_styles.idleText}>{status}</Text>
              </Badge>
              <Text style={_styles.subText1}>{sub}</Text>
            </View>
          );
        case "低潮中":
          return (
            <View style={_styles.viewStyle}>
              {unread > 0 &&
                <Badge containerStyle={_styles.unreadBadge1}>
                  <Text style={_styles.unreadBadgeText}>{unread}</Text>
                </Badge>}
              <Badge containerStyle={_styles.blueBadge}>
                <Text style={_styles.busyText}>{status}</Text>
              </Badge>
              <Text style={_styles.subText1}>{sub}</Text>
            </View>
          );
        case "我的狀態":
          return (
            <View style={_styles.viewStyle}>
              {unread > 0 &&
                <Badge containerStyle={_styles.unreadBadge2}>
                  <Text style={_styles.unreadBadgeText}>{unread}</Text>
                </Badge>}
              <Text style={_styles.subText2}>{sub}</Text>
            </View>
          );
      }
    } else {
      return (
        <View style={_styles.viewStyle}>
          {unread > 0 &&
            <Badge containerStyle={_styles.unreadBadge2}>
              <Text style={_styles.unreadBadgeText}>{unread}</Text>
            </Badge>}
          <Text style={_styles.subText2}>{sub}</Text>
        </View>
      );
    }
  };

  handleStatusChange = (val, selection, row) => {
    if (selection === 0) {
      switch (row) {
        case 1:
          this.getConvs("unread");
          break;
        case 2:
          this.getConvs("visitor");
          break;
        default:
          this.getConvs("all");
          break;
      }
    } else if (selection === 1) {
      let _chatStatus = val;
      if (val === "我的狀態") {
        _chatStatus = "";
      }
      this.store.setChatStatus(this.firebase, _chatStatus);
    }
    // console.log('selection: ', selection, ' row: ', row, ' val: ', val, ' listFilter: ', listFilter);
  };

  handlePriority = priority => {
    if (!priority) return {};
    if (priority) return { name: "flag", color: "#F0D64E" };
  };

  getAvatarStyle = onlineStatus => {
    if (onlineStatus) {
      return {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: "#8BC34A"
      };
    }

    return { width: 56, height: 56, borderRadius: 28 };
  };

  render() {
    console.log("this.state: ", this.state);
    const indicator = (
      <ActivityIndicator
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          marginTop: 150
        }}
        size="large"
      />
    );

    return (
      <View style={this.state.size}>
        <ScrollView style={{ marginTop: 5 }}>
          <DropdownMenu
            style={{ flex: 1, backgroundColor: "white" }}
            arrowImg={require("../images/arrow_down.png")}
            checkImage={require("../images/menu_check.png")}
            bgColor={"white"}
            tintColor={"black"}
            selectItemColor={"red"}
            data={menuData}
            maxHeight={410}
            handler={(selection, row) =>
              this.handleStatusChange(menuData[selection][row], selection, row)}
          >
            {this.state.isLoading && indicator}
            {!this.state.noData &&
              !this.state.isLoading &&
              <List containerStyle={{ marginBottom: 20, marginTop: -2 }}>
                {this.state.convs.map((l, i) => (
                  <ListItem
                    avatar={{ uri: l.avatarUrl }}
                    avatarStyle={this.getAvatarStyle(l.online)}
                    key={l.uid}
                    title={l.name}
                    titleStyle={{ marginLeft: 20 }}
                    subtitle={this.renderSubtitle(
                      l.subtitle,
                      l.chatStatus,
                      l.unread
                    )}
                    rightIcon={this.handlePriority(l.priority)}
                    onPress={() => {
                      Actions.chat({
                        uid: l.uid,
                        name: l.name,
                        chatStatus: l.chatStatus,
                        age: l.age,
                        avatarUrl: l.avatarUrl
                      });
                    }}
                  />
                ))}
              </List>}
            {this.state.noData &&
              !this.state.isLoading &&
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 150
                }}
              >
                沒有信息
              </Text>}
          </DropdownMenu>
        </ScrollView>
      </View>
    );
  }
}
