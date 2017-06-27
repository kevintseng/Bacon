/*
  @Firebase db structure for conversations and Messages

  conversations: there's a main conversations bucket that stores conversation data, which has two sub buckets: messages and users.

  In each user's user data, there's also a conversations list, each item in the list is indexed with conversation key from the main conversations bucket, and each item has "chatType", "convKey", and "priority".
*/

import React, { Component } from "react";
import { View, Dimensions, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { observer } from "mobx-react/native";
import { List, ListItem, Badge, Icon, Button, FormInput } from "react-native-elements";
// import SwipeList from "react-native-smooth-swipe-list";
import DropdownMenu from "react-native-dropdown-menu";
import { Grid, Col } from "react-native-easy-grid";
import Modal from 'react-native-modal'
// import Moment from "moment";

const { width, height } = Dimensions.get("window"); //eslint-disable-line
const menuData = [["所有訊息", "未讀訊息", "訪客訊息"]];

@observer
export default class Messages extends Component {
  constructor(props) {
    super(props);

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
      selfInputChatStatus: null,
    };
  }

  componentWillMount() {
    console.debug("Rendering Messages");
  }
  componentDidMount() {
    console.debug("Messages mounted");
    Actions.refresh({ key: "drawer", open: false });
    this.getUserConvs("all");
  }

  componentWillUnmount() {}

  getUserConvs = filterType => {
    this.setState({ isLoading: true });
    const myConvListRef = this.props.fire.database().ref('users/' + this.props.store.user.uid + '/conversations');

    //根據不同的filter去擷取conversation list
    const getUnread = myConvListRef.orderByChild("unread").startAt(1);
    const getAll = myConvListRef;
    const getVisitor = myConvListRef.orderByChild("chatType").equalTo("visitor");

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


    query.once("value").then(convSnap => {
      // console.log('CHECK: ', snap.val());
      const convs = [];
      let key = 0;
      if (convSnap.exists()) {
        convSnap.forEach(childConv => {
          const convKey = childConv.val().convKey;
          const theOtherUid = childConv.key;

          const convRef = this.props.fire.database().ref("conversations/" + convKey);

          let convData = {};

          convRef.once("value").then(snap => {

            const data = snap.val();
            const myUid = this.props.store.user.uid;
            const myData = data.users[myUid];
            const theOtherData = data.users[theOtherUid];
            console.log("getConvData myPriority: ", myData.priority);
            convData = {
              convKey,
              unread: myData.unread,
              lastRead: myData.lastRead,
              chatType: myData.chatType,
              priority: myData.priority,
              uid: theOtherUid,
              chatStatus: theOtherData.chatStatus,
              name: theOtherData.name,
              avatarUrl: theOtherData.avatarUrl,
              birthday: theOtherData.birthday,
              online: false,
              subtitle: '',
            }

            this.props.fire.database().ref("conversations/" + convKey + "/messages").limitToLast(1).once("value").then(msgSnap => {
              if(msgSnap.exists()){
                msgSnap.forEach(obj => {
                  console.log("last message: ", obj.val().text);
                  const text = obj.val().text ? obj.val().text : "傳送了一張圖像";
                  convData.subtitle = text;
                  // convs[theOtherUid] = convData;
                  convs.push(convData);
                  console.log("convs before: ", convs);
                  convs.sort(this.compare);
                  console.log("convs after: ", convs);
                  this.setState({
                    convs,
                    isLoading: false,
                    noData: false,
                  });
                });
              } else {
                // convs[theOtherUid] = convData;
                convs.push(convData);
                console.log("convs before: ", convs);
                convs.sort(this.compare);
                console.log("convs after: ", convs);
                this.setState({
                  convs,
                  isLoading: false,
                  noData: false,
                });
              }
              return {theOtherUid, key};
            }).then( retObj => {
              console.log("theOtherUid: ", retObj.theOtherUid);
              this.unreadListener(convKey, myUid, retObj.key);
              this.chatStatusListener(retObj.theOtherUid, retObj.key);
              this.onlineListener(retObj.theOtherUid, retObj.key);
              key++;
            });
          });
        });
      } else {
        this.setState({ convs: [], noData: true, isLoading: false });
      }
    });
  };

  unreadListener(convKey, uid, key) {
    const ref = this.props.fire
      .database()
      .ref("conversations/" + convKey + "/users/" + uid + "/unread");
    console.log("Start listening to unread on uid: " + uid + " key: " + key);
    ref.on("value", snapshot => {
      if (snapshot.exists()) {
        const newConvs = this.state.convs;
        // console.log("listenUnread on uid: ", uid, " val: ", snapshot.val());
        newConvs[key].unread = snapshot.val();
        this.setState({
          convs: newConvs
        });
      } else {

        const newConvs = this.state.convs;
        // console.log("listenUnread on uid: ", uid, " val: ", snapshot.val());
        newConvs[key].unread = 0;
        this.setState({
          convs: newConvs
        });
      }
    });
  }

  chatStatusListener(userId, key) {
    const ref = this.props.fire.database().ref("users/" + userId + "/chatStatus");
    ref.on(
      "value",
      snapshot => {
        if (snapshot.exists()) {
          console.log("listenChatStatus: ", snapshot.val());
          console.log("key: ", key);
          const updatedConvs = this.state.convs;
          updatedConvs[key].chatStatus = snapshot.val();
          console.log("updatedConvs: ", updatedConvs);
          this.setState({
            convs: updatedConvs
          });
        } else {
          const updatedConvs = this.state.convs;
          updatedConvs[key].chatStatus = '';
          this.setState({
            convs: updatedConvs
          });
        }
        console.log("this.state.convs: ", this.state.convs);
      },
      err => {
        console.log("Messages/chatStatusListener error: ", err);
        return "我的狀態";
      }
    );
  }

  onlineListener(userId, key) {
    const ref = this.props.fire.database().ref("online/" + userId);
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
        backgroundColor: "#FF9800",
        marginRight: 5,
        borderWidth: 1.3,
        borderColor: "white",
        padding: 6
      },
      idleBadge: {
        marginTop: 26,
        marginLeft: -35,
        backgroundColor: "#FFC107",
        marginRight: 5,
        borderWidth: 1.3,
        borderColor: "white",
        padding: 6
      },
      blueBadge: {
        marginTop: 26,
        marginLeft: -35,
        backgroundColor: "#1976D2",
        marginRight: 5,
        borderWidth: 1.3,
        borderColor: "white",
        padding: 6
      },
      defaultBadge: {
        marginTop: 26,
        marginLeft: -35,
        backgroundColor: "#4CAF50",
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
        default:
          return (
            <View style={_styles.viewStyle}>
              {unread > 0 &&
                <Badge containerStyle={_styles.unreadBadge2}>
                  <Text style={_styles.unreadBadgeText}>{unread}</Text>
                </Badge>}
                <Badge containerStyle={_styles.defaultBadge}>
                  <Text style={_styles.busyText}>{status}</Text>
                </Badge>
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
    let convs = this.state.convs;
    if (selection === 0) {
      switch (row) {
        //unread
        case 1:
          convs = convs.filter(conv => {return conv.unread > 0});
          if(convs.length === 0) {
            this.setState({ convs, noData: true });
          } else {
            this.setState({ convs });
          }
          break;
        case 2:
          convs = convs.filter(conv => {return conv.chatType === "visitor"});
          if(convs.length === 0) {
            this.setState({ convs, noData: true });
          } else {
            this.setState({ convs });
          }
          break;
        default:
          this.getUserConvs("all");
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

  renderHeader = (myStatus) => {
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
            <TouchableOpacity onPress={this.onChatStatusPressed}>
              <Text>{myStatus}</Text>
            </TouchableOpacity>
          </Col>
        </Grid>
      </View>
    );
  };

  onChatStatusPressed = () => {
    this.setState({ statusModalShow: true });
  };

  handleUpdateStatus = status => {
    if(status === '我的狀態') {
      this.setState({
        selfInputChatStatus: null
      });
    }
    this.props.store.setChatStatus(status);
    this.setState({ statusModalShow: false });
  }

  handleChatStatusChange = val => {
    let status = val;
    if(val === '') {
      status = null;
    }
    this.setState({
      selfInputChatStatus: status,
    });
  }

  handleUpgradeToVIP = () => {
    this.props.store.upgradeMembership();
    this.setState({
      statusModalShow: false,
    });
  }

  getSelfChatStatus = () => {
    switch(this.props.store.user.chatStatus) {
      case '放空中':
        return null;
      case '忙碌中':
        return null;
      case '低潮中':
        return null;
      case '我的狀態':
        return null;
      default:
        return this.props.store.user.chatStatus;
    }
  }

  render() {
    console.log("Messages.js state log: ",  this.state);


    const myStatus = this.props.store.user.chatStatus ? this.props.store.user.chatStatus : '我的狀態';

    const selfInputStatus = this.getSelfChatStatus();

    // console.log("this.state: ", this.state);
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

    const chatStatusStyles = {
      containerStyle: {
        width: 260,
        alignItems: 'center'
      },
      buttonStyle: {
        backgroundColor: 'white',
      },
      textStyle: {
        backgroundColor: 'white',
      },
      saveButtonStyle: {
        marginTop: 15,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
      },
      upgradeButtonStyle: {
        marginTop: 15,
        backgroundColor: 'white',
        borderColor: '#03A9F4',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
      },
      inputContainerStyle: {
        borderBottomWidth: 1,
        paddingLeft: 10,
        width: 70,
        borderBottomColor: '#BDBDBD',
        alignItems: 'center'
      }
    }

    const modalContent = {
      backgroundColor: 'white',
      padding: 20,
      width: 240,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      marginBottom: 150,
    };

    return (
      <View style={this.state.size}>
        <View style={{ flex: 0, paddingTop: 20, paddingHorizontal: 10, width, height: 64, backgroundColor: '#EFEFF2', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
          <Grid style={{ flex: 1, alignItems: 'center' }}>
            <Col style={{ flex:1, alignItems: 'flex-start', width: 100 }}>
              <Icon
                name="menu"
                color="#000"
                onPress={() => Actions.refresh({ key: "drawer", open: value => !value })}
              />
            </Col>
            <Col  style={{ alignItems: 'center', width: 100 }}>
              <Text style={{ fontSize: 18 }}>訊息中心</Text>
            </Col>
            <Col style={{ flex:1, alignItems: 'flex-end', width: 100 }}>
              <TouchableOpacity
                style={{ borderRadius: 8, padding: 6, marginTop: 5 }}
                onPress={this.onChatStatusPressed}
                >
                <Text style={{ color: '#03A9F4' }}>{myStatus}</Text>
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>
        <ScrollView style={{ marginTop: 5 }}>
          <DropdownMenu
            style={{ backgroundColor: "white" }}
            arrowImg={require("hookup/src/images/arrow_down.png")}
            checkImage={require("hookup/src/images/menu_check.png")}
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
                {
                  this.state.convs.map((l, i) => (
                    <ListItem
                      avatar={{ uri: l.avatarUrl }}
                      avatarStyle={this.getAvatarStyle(l.online)}
                      key={i}
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
                          birthday: l.birthday,
                          avatarUrl: l.avatarUrl,
                          chatType: l.chatType,
                        });
                      }}
                    />
                  ))
                }
              </List>}
            {this.state.noData &&
              !this.state.isLoading &&
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 100
                }}
              >
                沒有信息
              </Text>}
          </DropdownMenu>
        </ScrollView>
        <Modal style={{ alignItems: 'center' }} isVisible={this.state.statusModalShow}>
          <View style={modalContent}>
            <Button title='放空中' onPress={() =>  this.handleUpdateStatus('放空中') }
              color='black'
               textStyle={chatStatusStyles.textStyle}
               buttonStyle={chatStatusStyles.buttonStyle} style={chatStatusStyles.containerStyle} iconRight icon={{name:'chevron-right', color: 'gray'}} />
             <Button title='忙碌中' onPress={() => this.handleUpdateStatus('忙碌中') }
               color='black'
               textStyle={chatStatusStyles.textStyle}
               buttonStyle={chatStatusStyles.buttonStyle} style={chatStatusStyles.containerStyle} iconRight icon={{name:'chevron-right', color: 'gray'}}/>
             <Button title='低潮中' onPress={() => this.handleUpdateStatus('低潮中')}
               color='black'
               textStyle={chatStatusStyles.textStyle}
               buttonStyle={chatStatusStyles.buttonStyle} style={chatStatusStyles.containerStyle} iconRight icon={{name:'chevron-right', color: 'gray'}}/>
             <Button title='取消狀態' onPress={() => this.handleUpdateStatus('我的狀態') }
               color='black'
               textStyle={chatStatusStyles.textStyle}
               buttonStyle={chatStatusStyles.buttonStyle} style={chatStatusStyles.containerStyle}
               iconRight icon={{name:'chevron-right', color: 'gray'}}/>
             <FormInput containerStyle={chatStatusStyles.inputContainerStyle} onChangeText={this.handleChatStatusChange} placeholder='自定義' defaultValue={selfInputStatus} maxLength={3} editable={this.props.store.user.vip}/>
              {
               this.state.selfInputChatStatus &&
               <Button title='送出' onPress={() => this.handleUpdateStatus(this.state.selfInputChatStatus) }
               textStyle={chatStatusStyles.textStyle}
               color='gray'
               buttonStyle={chatStatusStyles.saveButtonStyle} />
              }
              {
                !this.props.store.user.vip &&
                <Button title='會員升級' onPress={this.handleUpgradeToVIP}
                textStyle={chatStatusStyles.textStyle}
                color='#03A9F4'
                buttonStyle={chatStatusStyles.upgradeButtonStyle} />
               }
          </View>
        </Modal>
      </View>
    );
  }
}
