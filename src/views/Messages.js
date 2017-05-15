import React, { Component } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import { Actions } from "react-native-router-flux";
import { observer } from "mobx-react/native";
import { List, ListItem, Text, Badge } from "react-native-elements";
import SwipeList from "react-native-smooth-swipe-list";
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
      status: this.store.user.chatStatus ? this.store.user.chatStatus : "我的狀態",
      listFilter: "all"
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
    this.getConvs();
  }

  getConvs = () => {
    this.convRef.once("value").then(snapForConvs => {
      // console.log('CHECK: ', snap.val());
      const convs = [];
      snapForConvs.forEach(childConv => {
        const queryKey = childConv.val().uid;

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
            const data = {
              uid: childConv.val().uid,
              name: childConv.val().name,
              avatarUrl: childConv.val().avatarUrl,
              chatStatus: childConv.val().chatStatus,
              age: childConv.val().age,
              type: childConv.val().type,
              priority: childConv.val().priority,
              unread: childConv.val().unread > 0
                ? childConv.val().unread
                : false,
              subtitle
            };
            convs.push(data);
            this.setState({
              convs,
              isLoading: false
            });
          });
      });
    });
  };

  renderSubtitle = (subtitle, status, unread) => {
    const sub = subtitle.length > 12
      ? subtitle.substring(0, 9) + "..."
      : subtitle;
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
        backgroundColor: "blue",
        marginRight: 5,
        borderWidth: 1.3,
        borderColor: "white",
        padding: 6
      },
      busyText: { fontSize: 11, color: "white" },
      idleText: { fontSize: 11, color: "gray" },
      subText1: { marginTop: -20, fontSize: 13 },
      subText2: { marginLeft: 15, fontSize: 13 }
    };
    if (status) {
      switch (status) {
        case "忙碌中":
          return (
            <View style={_styles.viewStyle}>
              {unread &&
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
              {unread &&
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
              {unread &&
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
              {unread &&
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
          {unread &&
            <Badge containerStyle={_styles.unreadBadge2}>
              <Text style={_styles.unreadBadgeText}>{unread}</Text>
            </Badge>}
          <Text style={_styles.subText2}>{sub}</Text>
        </View>
      );
    }
  };

  handleStatusChange = (val, selection, row) => {
    let listFilter = "all";
    if (selection === 0) {
      switch (row) {
        case 1:
          listFilter = "unread";
          break;
        case 2:
          listFilter = "visitor";
          break;
        default:
          listFilter = "all";
          break;
      }
      this.setState({
        listFilter
      });
    } else if (selection === 1) {
      this.store.setChatStatus(this.firebase, val);
    }
    // console.log('selection: ', selection, ' row: ', row, ' val: ', val, ' listFilter: ', listFilter);
  };

  handlePriority = priority => {
    if (!priority) return {};
    if (priority) return { name: "flag", color: "#F0D64E" };
  };

  render() {
    console.log("this.state: ", this.state);
    return (
      <View style={this.state.size}>
        <ScrollView style={{ marginTop: 5 }}>
          <DropdownMenu
            style={{ flex: 1 }}
            arrowImg={require("../images/dropdown_arrow.png")}
            checkImage={require("../images/menu_check.png")}
            bgColor={"#FDD835"}
            tintColor={"white"}
            selectItemColor={"red"}
            data={menuData}
            maxHeight={410}
            handler={(selection, row) =>
              this.handleStatusChange(menuData[selection][row], selection, row)}
          >
            <List containerStyle={{ marginBottom: 20, marginTop: -2 }}>
              {this.state.convs.map((l, i) => (
                <ListItem
                  avatar={{ uri: l.avatarUrl }}
                  avatarStyle={{ width: 56, height: 56, borderRadius: 28 }}
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
            </List>
          </DropdownMenu>
        </ScrollView>
      </View>
    );
  }
}
