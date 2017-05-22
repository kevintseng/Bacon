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
import { Icon } from "react-native-elements";
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
    this.store = this.props.store;
    this.firebase = this.props.fire;
    this.db = this.props.localdb;
    // console.log("Store prop: ", this.store);

    this.state = {
      size: {
        width,
        height
      },
      convKey: null,
      messages: [],
      typingText: null,
      loadEarlier: true,
      isLoadingEarlier: false,
      actions: false,
      image: null,
      firstTime: false,
      users: {},
    };
    this._isMounted = false;
  }

  componentWillMount() {
    console.debug("Rendering Messages");
    const age = Moment().diff(this.props.birthday, "years");
    const name = this.props.name;
    const chatStatus = this.props.chatStatus ? this.props.chatStatus : '';
    if (chatStatus === "我的狀態" || chatStatus === "") {
      this.title = name + ", " + age;
    } else {
      this.title =
        name + ", " + age + ", " + chatStatus;
    }
    Actions.refresh({ title: this.title });
    this._isMounted = true;
  }

  componentDidMount() {
    this.initChatRoom();
  }

//這邊 createNewConv 的 convKey 等不到
asdfasdfasldl;

  initChatRoom = async () => {
    let convKey;
    if(this.props.convKey) {
      convKey = this.props.convKey;
      this.setState({
        convKey,
      });
      this.loadAndUpdate(convKey);
      this.convRef = this.props.fire.database().ref('conversations/' + convKey);
    } else if(!this.props.store.user.conversations || !this.props.store.user.conversations[this.props.uid]) {
      console.log('Initializing new conversation');
      convKey = await this.createNewConv(this.props.uid);
      this.setState({
        convKey,
      });
      this.loadAndUpdate(convKey);
      this.convRef = this.props.fire.database().ref('conversations/' + convKey);
    } else {
      console.log('Found existing conversation: ' + this.props.store.user.conversations[this.props.uid]);
      convKey = this.props.store.user.conversations[this.props.uid].convKey;
      this.setState({
        convKey,
      });
      this.loadAndUpdate(convKey);
      this.convRef = this.props.fire.database().ref('conversations/' + convKey);
    }

  }

  loadMessages = (_convKey, startAt = 0) => {
    //Load previous 25 msgs from firebase.
    this.firebase.database().ref('conversations/' + _convKey + '/messages').orderByChild('_id').startAt(startAt).on('child_added', msgSnap => {
      console.log('child_added: ' + msgSnap.key);
      this.setState(previousState => {

        const msgId = msgSnap.val()._id;

        //Update lastRead
        this.props.fire.database().ref('conversations/' + this.state.convKey + '/users/' + this.props.store.user.uid).update({ lastRead: msgId });

        const _users = this.state.users;
        _users[this.props.store.user.uid].lastRead = msgId;

        return {
          messages: GiftedChat.append(previousState.messages, msgSnap.val()),
          users: _users,
        };
      });
    });
  }

  // updateLastRead = (msgId) => {
  //   this.props.fire.database().ref('conversations/' + this.state.convKey + '/users/' + this.props.store.user.uid).update({ lastRead: msgId });
  // }

  loadAndUpdate= (_convKey) => {
    const me = this.props.store.user.uid;
    const theOther = this.props.uid;
    let _users;
    this.props.fire.database().ref('conversations/' + _convKey + '/users').once('value').then(snap=> {
      console.log('snap.val()' + snap.val()[theOther].name);
      _users = snap.val();
      return _users;
    }).then(_users => {
      const users = [];
      users[theOther] = {
        name: this.props.name,
        age: Moment().diff(this.props.birthday, "years"),
        avatarUrl: this.props.avatarUrl,
        unread: 0,
      };

      users[me] = {
        name: this.props.store.user.displayName,
        age: Moment().diff(this.props.store.user.birthday, "years"),
        avatarUrl: this.props.store.user.photoURL,
        unread: 0,
      };
      // console.log('user[theOther]' + users[theOther].name);
      // console.log('_user[theOther]' + _users[theOther].name);
      users[theOther] = this.updateDiff(_users[theOther], users[theOther]);
      users[me] = this.updateDiff(_users[me], users[me]);
      this.firebase.database().ref('conversations/' + _convKey + '/users').set(users);

      this.firebase.database().ref('conversations/' + _convKey + '/chatType').set('normal');

      this.setState({ users });
      return users;
    }).then(users => {
      this.loadMessages(_convKey, users[this.props.store.user.uid].deleted);
    });
  }

  updateDiff = (u1, u2) => {
    const u = u1;
    if(u.name != u2.name) {
      u.name = u2.name;
    }
    if(u.avatarUrl != u2.avatarUrl) {
      u.avatarUrl = u2.avatarUrl;
    }
    if(u.age != u2.age) {
      u.age = u2.age;
    }
    u.unread = 0;
    // console.log('updateDiff return: ' + u.lastRead + ', age: ' + u.age + ', name: ' + u.name);
    return u;
  }

  createNewConv = (_other) => {
    const _convKey = this.firebase.database().ref("conversations").push().key;
    console.log('Get new conversation key from firebase: ' + _convKey);
    const _me = this.props.store.user.uid;
    const chatType = this.props.chatType ? this.props.chatType : 'normal';
    const users = {};
    users[_other] = {
      uid: _other,
      name: this.props.name,
      age: Moment().diff(this.props.birthday, "years"),
      avatarUrl: this.props.avatarUrl,
      unread: 0,
      deleted: false,
      lastRead: 0,
    };
    users[_me] = {
      uid: _me,
      name: this.store.user.displayName,
      age: Moment().diff(this.store.user.birthday, "years"),
      avatarUrl: this.store.user.photoURL,
      unread: 0,
      deleted: false,
      lastRead: 0,
    };

    const convData = {
      users,
    }

    this.setState({convKey: _convKey});
    // console.log('createNewConv: ' + _convKey);
    //Create a new conversation in conversations bucket

    this.firebase.database().ref("conversations/" + _convKey).update(convData).then(()=> {
      this.props.store.addNewConv(_other, _convKey, chatType);
      console.log('AppStore/this.user.conversations: ' + this.props.store.user.conversations);
      return _convKey;
    });

    return null;
  }

  clearUnread = () => {

    const msgRef = this.firebase
      .database()
      .ref("conversations/" + this.props.convId + '/users')
  };

  removeConversationPriority = () => {
    this.myConvRef.update({ priority: false, type: "normal" });
  };

  unreadAddOne = mid => {
    this.firebase
      .database()
      .ref(
        "conversations/" + this.state.convKey + '/users/' +
          this.props.uid +
          "/unread"
      )
      .once(
        "value",
        snap => {
          const unread = snap.val() + 1;
          this.otherConvRef.update({ unread });
        },
        err => {
          console.log("Chat/onSend set unread error: " + err);
        }
      );

    this.myConvRef.child("msgs").push(mid);
    this.otherConvRef.child("msgs").push(mid);
  };

  onSend = (messages = []) => {
    const _msgRef = this.firebase.database().ref('conversations/' + this.state.convKey + '/messages');
    const createdAt = Moment().format();
    messages[0].user.name = this.store.user.displayName;
    messages[0].user.avatar = this.store.user.photoURL;
    messages[0].createdAt = createdAt;
    console.log("onSend: ", messages[0].createdAt);
    const updates = {};
    updates[messages[0]._id] = messages[0];
    _msgRef.update(updates);


    // this.unreadAddOne(messages[0]._id);

    // this.removeConversationPriority(); //有發言後就取消.

    Keyboard.dismiss();
    // for demo purpose
    // this.answerDemo(messages);
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
    console.log("handleCameraPicker called");
    ImagePicker.launchCamera(ImagePickerOptions, async response => {
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
        const firebaseRefObj = this.firebase
          .storage()
          .ref(
            "chatPhotos/" +
              this.store.user.uid +
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
        const _id = this.senderMsgRef.push().key;
        const msgObj = {
          _id,
          text: "",
          createdAt: new Date(),
          user: {
            _id: this.store.user.uid,
            name: this.store.user.displayName,
            avatar: this.store.user.photoURL
          },
          image: downloadUrl
        };

        this.setState(previousState => {
          return {
            // messages: GiftedChat.append(previousState.messages, msgObj),
            actions: false
          };
        });
        const updates = {};
        updates[_id] = msgObj;
        this.senderMsgRef.update(updates);
        this.receiverMsgRef.update(updates);
        this.unreadAddOne(_id);
      }
    });
  };

  handlePhotoPicker = () => {
    const msgRef = this.props.fire.database().ref('conversations/' + this.state.convKey);
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
        const firebaseRefObj = this.firebase
          .storage()
          .ref(
            "chatPhotos/" +
              this.store.user.uid +
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
        const _id = msgRef.child('messages').push().key;
        const msgObj = {
          _id,
          text: "",
          createdAt: new Date(),
          user: {
            _id: this.store.user.uid,
            name: this.store.user.displayName,
            avatar: this.store.user.photoURL
          },
          image: downloadUrl
        };

        this.setState(previousState => {
          return {
            messages: GiftedChat.append(previousState.messages, msgObj),
            actions: false
          };
        });
        const updates = {};
        updates[_id] = msgObj;
        msgRef.child('messages').update(updates);
        // this.unreadAddOne(_id);
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

  render() {
    console.log("this.state", this.state);

    return (
      <View style={[this.state.size, { marginTop: -60 }]}>
        {this.state.actions &&
          <GiftedChat
            messages={this.state.messages}
            messageIdGenerator={() => {
              return this.convRef.child('messages').push().key;
            }}
            onSend={this.onSend}
            label="送出"
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            user={{
              _id: this.store.user.uid
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
            messageIdGenerator={() => {
              return this.convRef.child('messages').push().key;
            }}
            onSend={this.onSend}
            label="送出"
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            user={{
              _id: this.store.user.uid
            }}
            imageProps={this.state.image}
            minInputToolbarHeight={45}
            placeholder="輸入訊息..."
            renderActions={this.renderActions}
            renderFooter={this.renderFooter}
          />}
      </View>
    );
  }
}
