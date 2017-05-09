import React, { Component } from "react";
import { Keyboard, StyleSheet, View, Text, Dimensions, ActivityIndicator } from "react-native";
import { Actions } from "react-native-router-flux";
import { observer } from "mobx-react/native";
import { GiftedChat } from "react-native-gifted-chat";
import ImagePicker from "react-native-image-picker";
import { Icon } from "react-native-elements";
import { uploadImage, resizeImage } from '../Utils';
import Moment from "moment";

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
    this.name = this.props.name;
    this.firebase = this.props.fire;
    this.db = this.props.localdb;
    this.msgRef = this.firebase.database().ref('conversations/' + this.store.user.uid + '/' + this.props.uid);
    if (this.props.chatStatus === "我的狀態") {
      this.title = this.name;
    } else {
      this.title = this.name + ", " + this.props.age + ", " + this.props.chatStatus;
    }
    this.state = {
      size: {
        width,
        height
      },
      messages: [],
      typingText: null,
      loadEarlier: true,
      isLoadingEarlier: false,
      actions: false,
      image: null,
    };
    this._isMounted = false;
  }

  componentWillMount() {
    console.debug("Rendering Messages");
    Actions.refresh({ title: this.title });
    this._isMounted = true;
    this.msgRef.limitToLast(30).once('value').then(snap => {
          return snap.val();
        }, err => {
          console.log('Load from firebase error: ', err.code);
        });
    // this.setState(() => {
    //   return {
    //     messages: this.msgRef.limitToLast(20).on('value', snap => {
    //       return snap.val();
    //     }, err => {
    //       console.log('Load from firebase error: ', err.code);
    //     })
    //   };
    // });
  }

  componentDidMount() {
    this.msgRef.on('child_added', (child) => {
      console.log('child_added', child.val());
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, {
            _id: child.val()._id,
            text: child.val().text,
            createdAt: child.val().createdAt,
            user: child.val().user,
            image: child.val().image,
          })
        };
      });

    });

    // this.db.load({
    //   key: this.props.uid,
    //   autoSync: false,
    //   syncInBackground: false,
    // }).then(ret => {
    //   console.log('message history: ', ret);
    //   this.setState({
    //     messages: ret,
    //   });
    // }).catch(err => {
    //   console.log(err.message);
    //   switch (err.name) {
    //     case 'NotFoundError':
    //       console.log('SessionCheck: Data not found, rendering signin');
    //       this.creatNewChat();
    //       break;
    //     case 'ExpiredError':
    //       console.log('SessionCheck: Data expired, rendering signin');
    //       Actions.pop();
    //       break;
    //     default:
    //       console.log(err.name);
    //       Actions.pop();
    //   }
    // });
    // const t = new Date();
    // this.setState({
    //   messages: [
    //     {
    //       _id: this.props.uid,
    //       text: "安安, 你好..幾歲？住哪？給約嗎???",
    //       createdAt: t,
    //       user: {
    //         _id: 2,
    //         name: "Sex Machine",
    //         avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvReCHzABatvAp0XfAMa6VyACoQuG50YDpkdL9hoUx8W5zCY1"
    //       },
    //       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvReCHzABatvAp0XfAMa6VyACoQuG50YDpkdL9hoUx8W5zCY1",
    //     }
    //   ]
    // });
  }

  // componentWillUnmount() {
  //   this.updateChatToDB();
  // }

  // updateChatToDB = () => {
  //   this.db
  //     .save({
  //       key: this.props.uid,
  //       rawData: this.state.messages,
  //       expires: 1000 * 3600 * 24 * 365 // expires after 30 days
  //     })
  //     .catch(err => {
  //       console.log("Chat updateChatToDB: Saving data to local db failed.");
  //       console.log(err);
  //     });
  // }
  //
  // creatNewChat = () => {
  //   this.db
  //     .save({
  //       key: this.props.uid,
  //       rawData: this.state.messages,
  //       expires: 1000 * 3600 * 24 * 365 // expires after 30 days
  //     })
  //     .catch(err => {
  //       console.log("Chat creatNewChat: Saving data to local db failed.");
  //       console.log(err);
  //     });
  // }

  onSend = (messages = []) => {
    const createdAt = Moment().format();
    messages[0].user.name = this.store.user.displayName;
    messages[0].user.avatar = this.store.user.photoURL;
    messages[0].createdAt = createdAt;
    console.log('onSend: ', messages[0].createdAt);
    const updates = {};
    updates[messages[0]._id] = messages[0];
    this.msgRef.update(updates);
    // this.msgRef.push({messages[0]._id: messages[0]});

    // this.setState(previousState => {
    //   return {
    //     actions: false,
    //     messages: GiftedChat.append(previousState.messages, messages),
    //     image: null,
    //   };
    // });
    // Keyboard.dismiss();
    // // for demo purpose
    // this.answerDemo(messages);
  };

  // onLoadEarlier = () => {
  //   this.setState(previousState => {
  //     return {
  //       isLoadingEarlier: true
  //     };
  //   });
  //
  //   setTimeout(
  //     () => {
  //       if (this._isMounted === true) {
  //         this.setState(previousState => {
  //           return {
  //             messages: GiftedChat.prepend(
  //               previousState.messages,
  //               require("./data/old_messages.js")
  //             ),
  //             loadEarlier: false,
  //             isLoadingEarlier: false
  //           };
  //         });
  //       }
  //     },
  //     1000
  //   ); // simulating network
  // };

  appendMessage = (text, image) => {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, {
              _id: Math.round(Math.random() * 1000000),
              text,
              createdAt: Moment().format(),
              user: {
                _id: this.store.user.uid,
                name: this.store.user.displayName,
                avatar: this.store.user.photoURL
              },
              image,
            })
          }
    });
  }

  onReceive = text => {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Sex Machine",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvReCHzABatvAp0XfAMa6VyACoQuG50YDpkdL9hoUx8W5zCY1"
          }
        })
      };
    });
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
        this.setState({ actions: 'uploading'});
        console.log("Image data", response);
        const firebaseRefObj = this.firebase.storage().ref('chatPhotos/' + this.store.user.uid + '/' + response.fileName.replace('JPG', 'jpg'));
        const resizedUri = await resizeImage(response.uri, 600, 600, 'image/jpeg', 80);
        console.log("resizedUri", resizedUri);
        const downloadUrl = await uploadImage(resizedUri, firebaseRefObj, 'image/jpeg');
        console.log("downloadUrl: ", downloadUrl);
        const _id = this.msgRef.push().key;
        const msgObj = {
          _id,
          text: '',
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
            actions: false,
          };
        });
        const updates = {};
        updates[_id] = msgObj;
        this.msgRef.update(updates);
      }
    });
  };

  handlePhotoPicker = () => {
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
        this.setState({ actions: 'uploading'});
        console.log("Image data", response);
        const firebaseRefObj = this.firebase.storage().ref('chatPhotos/' + this.store.user.uid + '/' + response.fileName.replace('JPG', 'jpg'));
        const resizedUri = await resizeImage(response.uri, 600, 600, 'image/jpeg', 80);
        console.log("resizedUri", resizedUri);
        const downloadUrl = await uploadImage(resizedUri, firebaseRefObj, 'image/jpeg');
        console.log("downloadUrl: ", downloadUrl);
        const _id = this.msgRef.push().key;
        const msgObj = {
          _id,
          text: '',
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
            actions: false,
          };
        });
        const updates = {};
        updates[_id] = msgObj;
        this.msgRef.update(updates);
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
              flexDirection: 'row',
              alignSelf: "center",
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 4
            }}
          >
            <ActivityIndicator/>
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
              borderColor: '#E0E0E0',
              alignItems: "center",
              marginRight: 4,
            }}
          >
            <View style={{ flex: 1, alignItems: "center", }}>
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
    console.log("this.state.messages: ", this.state.messages);
    console.log("this.state.actions: ", this.state.actions);
    return (
      <View style={[this.state.size, { marginTop: -60 }]}>
        {this.state.actions &&
          <GiftedChat
            messages={this.state.messages}
            messageIdGenerator={() => {return this.msgRef.push().key}}
            onSend={this.onSend}
            label="送出"
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            user={{
              _id: this.store.user.uid,
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
            messageIdGenerator={() => {return this.msgRef.push().key}}
            onSend={this.onSend}
            label="送出"
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            user={{
              _id: this.store.user.uid,
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
