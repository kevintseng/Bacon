import React, { Component } from "react";
import { View, Dimensions, Text, ScrollView, ActivityIndicator, TouchableHighlight } from "react-native";
import { Actions } from "react-native-router-flux";
import { observer } from "mobx-react/native";
import { List, ListItem, Badge, Icon, Button } from "react-native-elements";
// import SwipeList from "react-native-smooth-swipe-list";
import DropdownMenu from "react-native-dropdown-menu";
import { Grid, Col, Row } from "react-native-easy-grid";
import Modal from 'react-native-modal'
// import Moment from "moment";

const { width, height } = Dimensions.get("window"); //eslint-disable-line
const menuData = [["所有訊息", "未讀訊息", "訪客訊息"]];

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
    const chatStatus = this.store.user.chatStatus ? this.store.user.chatStatus : '';
    this.state = {
      size: {
        width,
        height
      },
      convs: [],
      isLoading: true,
      pickerShow: false,
      listFilter: "all",
      noData: false,
      statusModalShow: false,
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
              let _subtitle = '';

              if (snapshot.exists()) {
                snapshot.forEach(_msg => {

                  if (_msg.child("image").exists()) {
                    _subtitle = "傳了一張圖";
                  }

                  if (_msg.child("text").exists() && _msg.val().text != "") {
                    // console.log('Text exists');
                    _subtitle = _msg.val().text;
                  }
                });
              }

              console.log("Messages/getConvs/subtitle: " + _subtitle);

              const userId = childConv.val().uid;
              const name = childConv.val().name;
              const avatarUrl = childConv.val().avatarUrl;
              const age = childConv.val().age;
              const type = childConv.val().type;
              const priority = childConv.val().priority;
              const unread = childConv.val().unread;

              const chatStatus = this.firebase.database().ref('users/' + userId + '/chatStatus').once('value', snap => {
                if(snap.exists()) {
                  return snap.val();
                }
                return '';
              });

              const data = {
                uid: userId,
                name,
                avatarUrl,
                age,
                type,
                priority,
                chatStatus,
                unread,
                online: false,
                subtitle: _subtitle,
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
        // console.log("listenUnread on uid: ", uid, " val: ", snapshot.val());
        newConvs[key].unread = snapshot.val();
        this.setState({
          convs: newConvs
        });
        return;
      }

      const newConvs = this.state.convs;
      // console.log("listenUnread on uid: ", uid, " val: ", snapshot.val());
      newConvs[key].unread = 0;
      this.setState({
        convs: newConvs
      });
      return;
    });
  }

  chatStatusListener(userId, key) {
    const ref = this.firebase.database().ref("users/" + userId + "/chatStatus");

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
        const newConvs = this.state.convs;
        newConvs[key].chatStatus = '';
        this.setState({
          convs: newConvs
        });
        return;
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

  renderSubtitle = (subtitle, status, unread) => {
    const sub = subtitle.length > 11 ? subtitle.substring(0, 10) : subtitle;
    console.log('sub: ' + sub);
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
      subText1: { marginTop: -20, marginLeft: -8, fontSize: 13 },
      subText2: { marginLeft: 10, fontSize: 13 },
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
    }
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

  renderHeader = () => {
    const myStatus = this.store.user.chatStatus ? this.store.user.chatStatus : '我的狀態';

    return (
      <View style={{ flex: 0, paddingTop: 20, paddingHorizontal: 10, width, height: 64, backgroundColor: '#EFEFF2', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
        <Grid style={{ flex: 1, alignItems: 'center' }}>
          <Col style={{ flex:1, alignItems: 'flex-start', width: 100 }}>
            <Icon
              name="menu"
              color="#000"
              onPress={() => Actions.refresh({ key: "drawer", open: value => !value })}
            />
          </Col>
          <Col  style={{ flex:1, alignItems: 'center', width: 100 }}>
            <Text>訊息中心</Text>
          </Col>
          <Col style={{ flex:1, alignItems: 'flex-end', width: 100 }}>
            <TouchableHighlight onPress={this.handleSetChatStatus}>
              <Text>{myStatus}</Text>
            </TouchableHighlight>
          </Col>
        </Grid>
      </View>
    );
  };

  handleSetChatStatus = () => {
    this.setState({ statusModalShow: true });
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

    const modalContent = {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    };

    const headerBar = this.renderHeader();
    return (
      <View style={this.state.size}>
        {headerBar}
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
        <Modal isVisible={this.state.statusModalShow}>
          <View style={modalContent}>
            <Text>Hi</Text>
            <Button title='close' onPress={() =>  this.setState({ statusModalShow: false })} />
          </View>
        </Modal>
      </View>
    );
  }
}
