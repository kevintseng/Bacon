/*
  @Firebase db structure for conversations and Messages

  conversations: there"s a main conversations bucket that stores conversation data, which has two sub buckets: messages and users.

  In each user"s user data, there"s also a conversations list, each item in the list is indexed with conversation key from the main conversations bucket, and each item has "chatType", "convKey", and "priority".
*/
import React, { Component } from "react";
import {
  Keyboard,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import { observer } from "mobx-react/native";
import { GiftedChat } from "react-native-gifted-chat";
import ImagePicker from "react-native-image-picker";
import Moment from "moment";
import { Icon, Button } from "react-native-elements";
import Modal from "react-native-modal";
import { uploadImage, resizeImage } from "../../Utils";

const { width, height } = Dimensions.get("window"); //eslint-disable-line
const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  footerText: {
    fontSize: 14,
    color: "#aaa"
  },
  modalButton1: {
    backgroundColor: "#7197C8",
    paddingVertical: 25,
    paddingHorizontal: 12,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalButton2: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});

const ImagePickerOptions = {
  title: "Select Avatar",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

@observer
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.uid = this.props.store.user.uid;
    this.otherUid = this.props.uid;
    this.convKey = this.props.convKey ? this.props.convKey : null;
    this.loadAfterMsgId = 0;
    this.title = "";

    this.state = {
      size: {
        width,
        height
      },
      messages: [],
      visitorMsgLimit: false,
      typingText: null,
      loadEarlier: false,
      isLoadingEarlier: false,
      actions: false,
      image: null,
      showVisitorModal: false,
      showMsgLimitModal: false,
      showPriorityModal: false,
      showInsufficientCreditModal: false,
      showTooManyVisitorMsgSentModal: false,
      showTooManyVisitorMsgReceivedModal: false,
      dontAskPriorityAgain: false,
    };
  }

  componentWillMount() {
    const age = this.props.birthday
      ? Moment().diff(this.props.birthday, "years")
      : "";
    const name = this.props.name ? this.props.name : "";
    const chatStatus = this.props.chatStatus ? this.props.chatStatus : "";
    if (chatStatus === "我的狀態" || chatStatus === "") {
      this.title = name + ", " + age;
    } else {
      this.title = name + ", " + age + ", " + chatStatus;
    }
    Actions.refresh({ title: this.title });
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    this.initChatRoom();
  }

  initChatRoom = () => {
    if (this.mounted) {
      if (this.convKey) {
        //convKey is given
        this.updateAndLoad(this.convKey);
      } else if (
        !this.props.store.user.conversations ||
        !this.props.store.user.conversations[this.otherUid]
      ) {
        //Create a new conversation
        this.createNewConv();
      } else {
        //convKey not given but theOtherUid is given
        this.convKey = this.props.store.user.conversations[
          this.otherUid
        ].convKey;
        this.updateAndLoad(this.convKey);
      }

      if (this.props.chatType === "visitor") {
        this.setState({
          showVisitorModal: true
        });
      }
    }
  };

  //update last read and clear unread count
  updateLastRead = (convKey, msgId, uid) => {
    this.props.fire
      .database()
      .ref("conversations/" + convKey + "/users/" + uid)
      .update({ lastRead: msgId, unread: 0 });
  };

  loadAndListenMessages = (convKey, startAt, uid) => {
    //Load previous 25 msgs from firebase.
    this.props.fire
      .database()
      .ref("conversations/" + convKey + "/messages")
      .orderByChild("_id")
      .startAt(startAt)
      .on("child_added", msgSnap => {
        console.log("child_added: " + msgSnap.key);
        this.setState(previousState => {
          const msgId = msgSnap.val()._id;
          //Update lastRead
          this.updateLastRead(convKey, msgId, uid);
          this.clearUnread(convKey, uid);
          return {
            messages: GiftedChat.append(previousState.messages, msgSnap.val())
          };
        });
      });
  };

  //update users' profile in conversation data
  updateAndLoad = _convKey => {
    const me = this.uid;
    const theOther = this.otherUid;

    //load conversation data
    this.props.fire
      .database()
      .ref("conversations/" + _convKey + "/users")
      .once("value")
      .then(snap => {
        const users = snap.val();
        //If user has changed name and avatar since last time, update.
        users[theOther].name = this.props.name;
        users[theOther].avatarUrl = this.props.avatarUrl;
        users[me].name = this.props.store.user.displayName;
        users[me].avatarUrl = this.props.store.user.photoURL;
        this.loadAfterMsgId = users[me].deleted;

        this.props.fire
          .database()
          .ref("conversations/" + _convKey + "/users")
          .update(users);
      })
      .then(() => {
        this.loadAndListenMessages(this.convKey, this.loadAfterMsgId, me);
        this.updateVisitorMsgLimit(this.convKey, this.uid);
      });
  };

  createNewConv = () => {
    this.convKey = this.props.fire.database().ref("conversations").push().key;
    const users = {};
    users[this.OtherUid] = {
      name: this.props.name,
      birthday: this.props.birthday,
      avatarUrl: this.props.avatarUrl,
      unread: 0,
      deleted: false,
      lastRead: 0,
      chatType: "visitor",
      priority: false
    };

    users[this.uid] = {
      name: this.props.store.user.displayName,
      birthday: this.props.store.user.birthday,
      avatarUrl: this.props.store.user.photoURL,
      unread: 0,
      deleted: false,
      lastRead: 0,
      chatType: "normal",
      priority: false,
      visitorMsgLimit: 2
    };

    const convData = {
      users,
      createTime: Moment().unix()
    };

    this.setState({ visitorMsgLimit: 2 });

    //Add new conv to user profile
    this.props.fire
      .database()
      .ref("conversations/" + this.convKey)
      .update(convData)
      .then(this.props.store.addNewConv(this.otherUid, this.convKey))
      .then(
        //update and load conversation and messages
        this.updateAndLoad(this.convKey)
      );
  };

  //reset unread count
  clearUnread = (convKey, uid) => {
    const unreadRef = this.props.fire
      .database()
      .ref("conversations/" + convKey + "/users/" + uid);
    unreadRef.update({ unread: 0 });
  };

  // Only removes the priority of current user"s conversation record
  removeConversationPriority = (convKey, uid) => {
    const convRef = this.props.fire
      .database()
      .ref("conversations/" + convKey + "/users/" + uid);

    convRef.update({ priority: false, chatType: "normal" });
  };

  getPriority = (convKey, uid) => {
    this.props.fire
      .database()
      .ref("conversations/" + convKey + "/users/" + uid + "/priority")
      .once(
        "value",
        snap => {
          return snap.val();
        },
        err => {
          console.log("Chat/getPriority error: " + err);
        }
      );
  };

  makeConversationPriority = (convKey, uid) => {
    const convRef = this.props.fire
      .database()
      .ref("conversations/" + convKey + "/users/" + uid);
    convRef.update({ priority: true });
  };

  //adds 1 to unread
  unreadAddOne = (convKey, uid) => {
    const convRef = this.props.fire
      .database()
      .ref("conversations/" + convKey + "/users/" + uid);
    convRef.once(
      "value",
      snap => {
        const unread = snap.val().unread + 1;
        //update new unread count
        convRef.update({ unread });
      },
      err => {
        console.log("Chat/unreadAddOne error: " + err);
      }
    );
  };

  visitorMsgLimitDeductOne = (convKey, uid) => {
    const convRef = this.props.fire
      .database()
      .ref("conversations/" + convKey + "/users/" + uid + "/visitorMsgLimit");
    convRef.once(
      "value",
      snap => {
        const limit = snap.val();
        const newLimit = limit - 1;
        //update new unread count
        this.setState({ visitorMsgLimit: newLimit });
        convRef.set(newLimit);
      },
      err => {
        console.log("Chat/visitorMsgLimitDeductOne error: " + err);
      }
    );
  };

  updateVisitorMsgLimit = (convKey, uid) => {
    const convRef = this.props.fire
      .database()
      .ref("conversations/" + convKey + "/users/" + uid + "/visitorMsgLimit");
    convRef.once(
      "value",
      snap => {
        this.setState({ visitorMsgLimit: snap.val() });
      },
      err => {
        console.log("Chat/updateVisitorMsgLimit error: " + err);
      }
    );
  };

  visitorMsgLimitAddOne = (convKey, uid) => {
    const convRef = this.props.fire
      .database()
      .ref("conversations/" + convKey + "/users/" + uid + "/visitorMsgLimit");
    convRef.once(
      "value",
      snap => {
        const limit = snap.val() + 1;
        this.setState({ visitorMsgLimit: limit });
        //update new unread count
        convRef.set(limit);
      },
      err => {
        console.log("Chat/visitorMsgLimitAddOne error: " + err);
      }
    );
  };

  onSend = (messages = []) => {
    if (this.state.visitorMsgLimit <= 0) {
      this.setState({ showMsgLimitModal: true });
      return;
    }
    const msgRef = this.props.fire
      .database()
      .ref("conversations/" + this.convKey + "/messages");
    const createdAt = Moment().format();
    messages[0].user.name = this.props.store.user.displayName;
    messages[0].user.avatar = this.props.store.user.photoURL;
    messages[0].createdAt = createdAt;
    // console.log("onSend: ", messages[0].createdAt);

    const updates = {};
    updates[messages[0]._id] = messages[0];
    //adds this new message to firebase
    msgRef.update(updates);

    //adds 1 to the other user"s conversation bucket"s unread field
    this.unreadAddOne(this.convKey, this.otherUid);
    console.log("visitorMsgLimit: ", this.state.visitorMsgLimit);
    if (this.state.visitorMsgLimit > 0) {
      this.visitorMsgLimitDeductOne(this.convKey, this.uid);
    }

    if (this.props.chatType === "visitor") {
      //有發言回應後就取消 priority
      this.removeConversationPriority(this.convKey, this.uid);
    }

    if (!this.getPriority(this.convKey, this.uid) && !this.state.dontAskPriorityAgain) {
      this.setState({ showPriorityModal: true });
    }

    Keyboard.dismiss();
  };

  renderFooter = () => {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  };

  //TODO: Rewrite this when have time
  renderActions = () => {
    if (!this.state.actions) {
      return (
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
            alignSelf: "center"
          }}
        >
          <Icon
            name="add"
            onPress={() => {
              Keyboard.dismiss();
              this.setState({ actions: "plus" });
            }}
          />
        </View>
      );
    } else if (this.state.actions == "plus") {
      return (
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
            alignSelf: "center"
          }}
        >
          <Icon
            name="keyboard-hide"
            onPress={() => {
              this.setState({ actions: false });
            }}
          />
        </View>
      );
    } else if (this.state.actions == "smily") {
      return (
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
            alignSelf: "center"
          }}
        >
          <Icon
            name="add"
            onPress={() => {
              Keyboard.dismiss();
              this.setState({ actions: "plus" });
            }}
          />
          <Icon
            name="keyboard-hide"
            onPress={() => {
              this.setState({ actions: false });
            }}
          />
        </View>
      );
    }
  };

  handleCameraPicker = () => {
    const msgRef = this.props.fire
      .database()
      .ref("conversations/" + this.convKey + "/messages");
    console.log("handleCameraPicker called");
    ImagePicker.launchCamera(ImagePickerOptions, async response => {
      // console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.setState({ actions: "uploading" });
        console.log("Image data", response);
        const firebaseRefObj = this.props.fire
          .storage()
          .ref(
            "chatPhotos/" +
              this.uid +
              "/" +
              response.fileName.replace("JPG", "jpg")
          );
        const resizedUri = await resizeImage(
          response.uri,
          600,
          600,
          "image/jpeg",
          80
        );
        console.log("resizedUri", resizedUri);
        const downloadUrl = await uploadImage(
          resizedUri,
          firebaseRefObj,
          "image/jpeg"
        );
        console.log("downloadUrl: ", downloadUrl);
        const _id = msgRef.push().key;
        const msgObj = {
          _id,
          text: "",
          createdAt: new Date(),
          user: {
            _id: this.uid,
            name: this.props.store.user.displayName,
            avatar: this.props.store.user.photoURL
          },
          image: downloadUrl
        };

        this.setState(previousState => {
          return {
            messages: GiftedChat.append(previousState.messages, msgObj),
            actions: false
          };
        });

        //adds 1 to conversation
        this.unreadAddOne(this.convKey, this.otherUid);
        //有發言回應後就取消 priority
        this.removeConversationPriority(this.convKey, this.uid);
      }
    });
  };

  handlePhotoPicker = () => {
    const msgRef = this.props.fire
      .database()
      .ref("conversations/" + this.convKey + "/messages");
    console.log("handlePhotoPicker called");
    ImagePicker.launchImageLibrary(ImagePickerOptions, async response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.setState({ actions: "uploading" });
        console.log("Image data", response);
        const firebaseRefObj = this.props.fire
          .storage()
          .ref(
            "chatPhotos/" +
              this.uid +
              "/" +
              response.fileName.replace("JPG", "jpg")
          );
        const resizedUri = await resizeImage(
          response.uri,
          600,
          600,
          "image/jpeg",
          80
        );
        console.log("resizedUri", resizedUri);
        const downloadUrl = await uploadImage(
          resizedUri,
          firebaseRefObj,
          "image/jpeg"
        );
        console.log("downloadUrl: ", downloadUrl);
        const _id = msgRef.push().key;
        const msgObj = {
          _id,
          text: "",
          createdAt: new Date(),
          user: {
            _id: this.uid,
            name: this.props.store.user.displayName,
            avatar: this.props.store.user.photoURL
          },
          image: downloadUrl
        };

        this.setState(previousState => {
          return {
            messages: GiftedChat.append(previousState.messages, msgObj),
            actions: false
          };
        });

        //adds 1 to conversation
        this.unreadAddOne(this.convKey, this.otherUid);
        //有發言回應後就取消 priority
        this.removeConversationPriority(this.convKey, this.uid);
      }
    });
  };

  renderAccessory = () => {
    console.log("renderAccessory: ", this.state.actions);
    switch (this.state.actions) {
      // case "smily":
      //   return (
      //     <View
      //       style={{
      //         flex: 1,
      //         width: width - 10,
      //         height: 210,
      //         alignSelf: "center",
      //         backgroundColor: "yellow",
      //         marginRight: 4
      //       }}
      //     />
      //   );
      case "uploading":
        return (
          <View
            style={{
              flex: 1,
              width: width - 10,
              flexDirection: "row",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 4
            }}
          >
            <ActivityIndicator />
            <Text> 照片壓縮處理中...</Text>
          </View>
        );
      case "plus":
        return (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              width: width - 10,
              height: 210,
              alignSelf: "center",
              justifyContent: "space-between",
              borderTopWidth: 0.5,
              borderColor: "#E0E0E0",
              alignItems: "center",
              marginRight: 4
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Icon
                name="collections"
                size={25}
                color="orange"
                containerStyle={{
                  width: 25,
                  height: 25,
                  borderRadius: 5,
                  borderWidth: 0,
                  margin: 2
                }}
                onPress={this.handlePhotoPicker}
                underlayColor="gray"
              />
              <Text>相簿</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Icon
                name="camera-alt"
                size={25}
                color="orange"
                containerStyle={{
                  width: 25,
                  height: 25,
                  borderRadius: 5,
                  borderWidth: 0,
                  margin: 2
                }}
                onPress={this.handleCameraPicker}
                underlayColor="gray"
              />
              <Text>拍照</Text>
            </View>
          </View>
        );
      default:
        return;
    }
  };

  notInterested = () => {
    this.setState({ showVisitorModal: false });
    Actions.pop();
  };

  startChatting = () => {
    this.setState({ showVisitorModal: false });
  };

  useCredit = (reason, val) => {
    this.props.store.deductCredit(val);

    switch (reason) {
      case "visitorMsgLimit":
        this.visitorMsgLimitAddOne(this.convKey, this.uid);
        this.setState({
          showMsgLimitModal: false
        });
        break;
      case "priority":
        this.makeConversationPriority(this.otherUid);
        this.setState({
          showPriorityModal: false
        });
        break;
      case "visitorSentLimit":
        this.setState({
          showTooManyVisitorMsgSentModal: false
        });
        break;
      case "visitorReceivedLimit":
        this.setState({
          showTooManyVisitorMsgReceivedModal: false
        });
        break;
    }
  };

  buyCredit = () => {
    this.setState({
      showMsgLimitModal: false,
      showVisitorModal: false,
      showPriorityModal: false,
      showInsufficientCreditModal: false,
      showTooManyVisitorMsgSentModal: false,
      showTooManyVisitorMsgReceivedModal: false
    });
    this.props.store.addCredit(100);
  };

  cancelSend = () => {
    this.setState({
      dontAskPriorityAgain:true,
      showMsgLimitModal: false,
      showVisitorModal: false,
      showPriorityModal: false,
      showInsufficientCreditModal: false,
      showTooManyVisitorMsgSentModal: false,
      showTooManyVisitorMsgReceivedModal: false
    });
  };

  msgKeyGenerator = () => {
    const key = this.props.fire
      .database()
      .ref("conversations/" + this.convKey + "/messages")
      .push().key;
    return key;
  };

  render() {
    return (
      <View style={[this.state.size, { marginTop: -60 }]}>
        {this.state.actions &&
          <GiftedChat
            messages={this.state.messages}
            messageIdGenerator={() => this.msgKeyGenerator}
            onSend={this.onSend}
            label="送出"
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            user={{
              _id: this.uid
            }}
            minInputToolbarHeight={45}
            placeholder="輸入訊息..."
            renderAccessory={this.renderAccessory}
            renderActions={this.renderActions}
            renderFooter={this.renderFooter}
          />}
        {!this.state.actions &&
          <GiftedChat
            messages={this.state.messages}
            messageIdGenerator={this.msgKeyGenerator}
            onSend={this.onSend}
            label="送出"
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            user={{
              _id: this.uid
            }}
            imageProps={this.state.image}
            minInputToolbarHeight={45}
            placeholder="輸入訊息..."
            renderActions={this.renderActions}
            renderFooter={this.renderFooter}
          />}
        <Modal
          isVisible={this.state.showVisitorModal}
          backdropColor="black"
          backdropOpacity={0.6}
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
              buttonStyle={styles.modalButton1}
              onPress={this.startChatting}
            />
            <Button
              title="不感興趣"
              buttonStyle={styles.modalButton2}
              onPress={this.notInterested}
            />
          </View>
        </Modal>
        <Modal
          isVisible={this.state.showMsgLimitModal}
          backdropColor="black"
          backdropOpacity={0.6}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              backgroundColor: "white",
            }}
          >
            <Text style={{ margin: 10 }}>
              超過訪客留言次數限制：請等待對方回覆或是使用Q點繼續留言
            </Text>
            <Button
              title="使用Q點數(每一則30點)"
              buttonStyle={styles.modalButton1}
              onPress={() => this.useCredit("visitorMsgLimit", 30)}
            />
            <Button
              title="取消"
              buttonStyle={styles.modalButton2}
              onPress={this.cancelSend}
            />
            <Text>
              --------------------------------------
            </Text>
            <Text style={{ margin: 10 }}>
              您目前有 {this.props.store.user.credit} Q點
            </Text>
            <Button
              title="Q點儲值"
              buttonStyle={styles.modalButton2}
              onPress={this.buyCredit}
            />
          </View>
        </Modal>
        <Modal
          isVisible={this.state.showPriorityModal}
          backdropColor="black"
          backdropOpacity={0.6}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              backgroundColor: "white"
            }}
          >
            <Text style={{ margin: 10, color: "black" }}>
              訊息優先被看到：您可以使用Q點讓您的訊息優先顯示在對方的訊息中心！
            </Text>
            <Button
              title="使用Q點(100點)優先顯示"
              buttonStyle={styles.modalButton1}
              onPress={() => this.useCredit("priority", 100)}
            />
            <Button
              title="不用"
              buttonStyle={styles.modalButton2}
              onPress={this.cancelSend}
            />
            <Text style={{ color: "black" }}>
              --------------------------------------
            </Text>
            <Text style={{ margin: 10, color: "black" }}>
              您目前有 {this.props.store.user.credit} Q點
            </Text>
            <Button
              title="Q點儲值"
              buttonStyle={styles.modalButton2}
              onPress={this.buyCredit}
            />
          </View>
        </Modal>
        <Modal
          isVisible={this.state.showTooManyVisitorMsgReceivedModal}
          backdropColor="black"
          backdropOpacity={0.6}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              backgroundColor: "white",
            }}
          >
            <Text style={{ margin: 10 }}>
              抱歉, 對方的未讀來訪留言過多, 請稍後再試試或是使用Q點特權留言
            </Text>
            <Button
              title="使用Q點(50點)"
              buttonStyle={styles.modalButton1}
              onPress={() => this.useCredit("visitorReceivedLimit", 50)}
            />
            <Button
              title="取消"
              buttonStyle={styles.modalButton2}
              onPress={this.cancelSend}
            />
            <Text>
              --------------------------------------
            </Text>
            <Text style={{ margin: 10 }}>
              您目前有 {this.props.store.user.credit} Q點
            </Text>
            <Button
              title="Q點儲值"
              buttonStyle={styles.modalButton2}
              onPress={this.buyCredit}
            />
          </View>
        </Modal>
        <Modal
          isVisible={this.state.showTooManyVisitorMsgSentModal}
          backdropColor="black"
          backdropOpacity={0.6}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              backgroundColor: "white",
            }}
          >
            <Text style={{ margin: 10 }}>
              訪客留言次數已用完：你今天已經留言給10位新對象了, 可以使用Q點增加10個對象
            </Text>
            <Button
              title="使用Q點(100點)"
              buttonStyle={styles.modalButton1}
              onPress={() => this.useCredit("visitorSentLimit", 100)}
            />
            <Button
              title="取消"
              buttonStyle={styles.modalButton2}
              onPress={this.cancelSend}
            />
            <Text style={{ color: "white" }}>
              --------------------------------------
            </Text>
            <Text style={{ margin: 10, color: "white" }}>
              您目前有 {this.props.store.user.credit} Q點
            </Text>
            <Button
              title="Q點儲值"
              buttonStyle={styles.modalButton2}
              onPress={this.buyCredit}
            />
          </View>
        </Modal>
        <Modal
          isVisible={this.state.showInsufficientCreditModal}
          backdropColor="black"
          backdropOpacity={0.6}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              backgroundColor: "white",
            }}
          >
            <Text style={{ margin: 10 }}>抱歉, 你的Q點餘額不足哦！</Text>
            <Button
              title="Q點儲值"
              buttonStyle={styles.modalButton2}
              onPress={this.buyCredit}
            />
            <Button
              title="取消"
              buttonStyle={styles.modalButton2}
              onPress={this.cancelSend}
            />
            <Text >
              --------------------------------------
            </Text>
            <Text style={{ margin: 10 }}>
              您目前有 {this.props.store.user.credit} Q點
            </Text>
          </View>
        </Modal>

      </View>
    );
  }
}
