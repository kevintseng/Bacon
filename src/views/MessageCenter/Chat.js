/*
  @Firebase db structure for conversations and Messages

  conversations: there's a main conversations bucket that stores conversation data, which has two sub buckets: messages and users.

  In each user's user data, there's also a conversations list, each item in the list is indexed with conversation key from the main conversations bucket, and each item has "chatType", "convKey", and "priority".
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
    // console.log("Store prop: ", this.props.store);

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
      console.log('Create new conversation');
      this.createNewConv(this.props.uid);
    } else {
      console.log('Found existing conversation: ' + this.props.store.user.conversations[this.props.uid]);
      convKey = this.props.store.user.conversations[this.props.uid].convKey;
      this.setState({
        convKey,
      });
      this.loadAndUpdate(convKey);
    }

    this.convRef = this.props.fire.database().ref('conversations/' + convKey);
  }

  loadAndListenMessages = (_convKey, startAt = 0) => {
    //Load previous 25 msgs from firebase.
    this.props.fire.database().ref('conversations/' + _convKey + '/messages').orderByChild('_id').startAt(startAt).on('child_added', msgSnap => {
      console.log('child_added: ' + msgSnap.key);
      this.setState(previousState => {

        const msgId = msgSnap.val()._id;

        //Update lastRead
        this.updateLastRead(_convKey, msgId, this.props.store.user.uid);

        const _users = this.state.users;
        _users[this.props.store.user.uid].lastRead = msgId;
        return {
          messages: GiftedChat.append(previousState.messages, msgSnap.val()),
          users: _users,
        };
      });
    });
  }

  //update last read and clear unread count
  updateLastRead = (convKey, msgId, uid) => {
    this.props.fire.database().ref('conversations/' + convKey + '/users/' + uid ).update({ lastRead: msgId, unread: 0 });
  }


  //load conversation data(including messages)
  loadAndUpdate= (_convKey) => {
    console.log('Executing loadAndUpdate');
    const me = this.props.store.user.uid;
    const theOther = this.props.uid;
    let _users;

    //Get conversation.users' data
    this.props.fire.database().ref('conversations/' + _convKey + '/users').once('value').then(snap=> {
      console.log('loadAndUpdate/load convData: ' + snap.val()[theOther].name);
      _users = snap.val();
      return _users;

    //update onversation.users' data
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

      //Update difference
      users[theOther] = this.updateDiff(_users[theOther], users[theOther]);
      users[me] = this.updateDiff(_users[me], users[me]);
      this.props.fire.database().ref('conversations/' + _convKey + '/users').set(users);

      this.setState({ users });
      return users;
    }).then(users => {
      //load message data
      this.loadAndListenMessages(_convKey, users[this.props.store.user.uid].deleted);
      //reset current user's unread count of this conversation in firebase db
      this.clearUnread(_convKey, this.props.store.user.uid);
    });
  }

  // //set the chat type on firebase db
  // setChatType = (uid1, uid2, chatType) => {
  //   //update chatType
  //   this.props.fire.database().ref('users/' + uid1 + '/conversations/' + uid2 + '/chatType').set(chatType);
  //
  //   //update chatType
  //   this.props.fire.database().ref('users/' + uid2 + '/conversations/' + uid1 + '/chatType').set(chatType);
  // }

  //check users' name, avatar, age, and update
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
    const _convKey = this.props.fire.database().ref("conversations").push().key;
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
      name: this.props.store.user.displayName,
      age: Moment().diff(this.props.store.user.birthday, "years"),
      avatarUrl: this.props.store.user.photoURL,
      unread: 0,
      deleted: false,
      lastRead: 0,
    };

    const convData = {
      users,
    }

    this.setState({convKey: _convKey});

    //Add a new conv to firebase db conversations, then add to each person's user profile and current user's local Appstore
    this.props.fire.database().ref("conversations/" + _convKey).update(convData).then(()=> {
      this.props.store.addNewConv(_other, _convKey, chatType);
      this.loadAndUpdate(_convKey);
      this.setState({
        convKey: _convKey,
      });
      return _convKey;
    });

    return null;
  }

  //reset unread count
  clearUnread = (convKey, uid) => {
    const unreadRef = this.props.fire
      .database()
      .ref("conversations/" + convKey + '/users/' + uid);
    unreadRef.set({unread: 0});
  };

  // Only removes the priority of current user's conversation record
  removeConversationPriority = () => {
    const myUid = this.props.store.user.uid;
    const otherUid = this.props.uid;
    const myConvRef = this.props.fire.database().ref('users/' + myUid + '/conversations/' + otherUid);

    myConvRef.update({ priority: false, type: "normal" });
  };

  //adds 1 to unread
  unreadAddOne = (convKey, uid) => {
    const convRef = this.props.fire.database().ref("conversations/" + convKey + "/users/" + uid);
    this.props.fire
      .database()
      .ref(
        "conversations/" + this.state.convKey + '/users/' +
          uid +
          "/unread"
      )
      .once(
        "value",
        snap => {
          const unread = snap.val() + 1;
          //update new unread count
          convRef.update({ unread });
        },
        err => {
          console.log("Chat/onSend set unread error: " + err);
        }
      );


  };

  onSend = (messages = []) => {
    const msgRef = this.props.fire.database().ref('conversations/' + this.state.convKey + '/messages');
    const createdAt = Moment().format();
    messages[0].user.name = this.props.store.user.displayName;
    messages[0].user.avatar = this.props.store.user.photoURL;
    messages[0].createdAt = createdAt;
    console.log("onSend: ", messages[0].createdAt);
    const updates = {};
    updates[messages[0]._id] = messages[0];
    //adds this new message to firebase
    msgRef.update(updates);

    //adds 1 to the other user's conversation bucket's unread field
    this.unreadAddOne(this.state.convKey, this.props.uid);

    //有發言回應後就取消 priority
    this.removeConversationPriority();

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
    const msgRef = this.props.fire.database().ref("conversations/" + this.state.convKey + "/messages");
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
              this.props.store.user.uid +
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
            _id: this.props.store.user.uid,
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
        const updates = {};
        updates[_id] = msgObj;
        //save message to firebase
        msgRef.update(updates);
        //adds 1 to conversation
        this.unreadAddOne(this.state.convKey, this.props.uid);
        //有發言回應後就取消 priority
        this.removeConversationPriority();
      }
    });
  };

  handlePhotoPicker = () => {
    const msgRef = this.props.fire.database().ref("conversations/" + this.state.convKey + "/messages");
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
              this.props.store.user.uid +
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
            _id: this.props.store.user.uid,
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
        const updates = {};
        updates[_id] = msgObj;
        //save message to firebase
        msgRef.update(updates);
        //adds 1 to conversation
        this.unreadAddOne(this.state.convKey, this.props.uid);
        //有發言回應後就取消 priority
        this.removeConversationPriority();
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
    // console.log("this.state", this.state);
    const msgRef = this.props.fire.database().ref("conversations/" + this.state.convKey + "/messages");

    return (
      <View style={[this.state.size, { marginTop: -60 }]}>
        {this.state.actions &&
          <GiftedChat
            messages={this.state.messages}
            messageIdGenerator={() => {
              return msgRef.push().key;
            }}
            onSend={this.onSend}
            label="送出"
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            user={{
              _id: this.props.store.user.uid
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
              return msgRef.push().key;
            }}
            onSend={this.onSend}
            label="送出"
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            user={{
              _id: this.props.store.user.uid
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
