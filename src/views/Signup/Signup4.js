import React, { Component } from "react";
import {
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  Platform
} from "react-native";
import Moment from "moment";
import DeviceInfo from "react-native-device-info";
import ImageResizer from "react-native-image-resizer"; //eslint-disable-line
import { Card, Button, Avatar } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import RNFetchBlob from "react-native-fetch-blob";
import { observer } from "mobx-react/native";
import ImagePicker from "react-native-image-picker";
import Reactotron from "reactotron-react-native";
import { Header } from "../../components/Header";

const { width, height } = Dimensions.get("window"); //eslint-disable-line

const styles = {
  wrapper: { alignSelf: "center", height: 150, width: 150, marginBottom: 10 }
};

const ipOptions = {
  mediaType: "photo",
  maxWidth: 1000,
  maxHeight: 1000,
  quality: 0.8,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: "hookup"
  }
};

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

@observer class Signup4 extends Component {
  constructor(props) {
    super(props);
    this.sustore = this.props.sustore;
    this.store = this.props.store;
    this.firebase = this.props.fire;
    this.state = {
      size: {
        width,
        height: 600
      },
      // country: DeviceInfo.getDeviceCountry(),
      country: 'TW', //初期暫時都預設為台灣
      locale: DeviceInfo.getDeviceLocale(),
      imageHeight: null,
      imageWidth: null,
      imageTimestamp: null,
      imageGeo: null,
      photoUrl: null,
      loading: false
    };
  }

  componentWillMount() {
    Reactotron.log("Will mount Signup4");
  }

  componentDidMount() {
    this.store.setInSignupProcess(true);
    Reactotron.log("Signup 4 mounted");
  }

  addImage = () => {
    ImagePicker.showImagePicker(ipOptions, async res => {
      this.setState({
        loading: true
      });
      if (res.didCancel) {
        Reactotron.log("ImagePicker: User cancelled image picker");
        return;
      } else if (res.error) {
        Reactotron.error("ImagePicker Error: " + res.error);
        this.setState({
          loading: false
        });
      } else {
        ImageResizer.createResizedImage(res.uri, 200, 200, "JPEG", 80)
          .then(async resizedImageUri => {
            Reactotron.log("resizedImageUri: " + resizedImageUri);
            this.uploadImage(resizedImageUri);
            this.setState({
              image: "file://" + resizedImageUri,
              imageGeo: {
                lon: res.longitude,
                lat: res.latitude
              },
              imageTimestamp: res.timestamp
            });
          })
          .catch(err => {
            Reactotron.error(err);
          });
      }
    });
  };

  generateFilename = () => {
    return this.firebase
      .database()
      .ref("users/" + this.store.user.uid + "/photos")
      .push().key;
  };

  uploadImage = (uri, ref, mime = "image/jpeg") => {
    Reactotron.debug("Uploading image");
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    let uploadBlob = null;
    // const filename = this.generateFilename();
    const imageRef = this.firebase
      .storage()
      .ref("avatars/" + this.sustore.uid + ".jpg");
    fs
      .readFile(uploadUri, "base64")
      .then(data => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        Reactotron.debug("Url");
        Reactotron.debug(url);
        this.setState({
          photoUrl: url,
          loading: false
        });
        this.sustore.setAvatar(url);
      })
      .catch(err => {
        Reactotron.error("ReadFile error: ");
        Reactotron.error(err);
      });
  };

  handleSubmit = async () => {
    if (!this.state.photoUrl) {
      alert("請給偶一張您的美/帥照, 拜偷拜偷");
      return;
    }
    try {
      const user = await this.firebase.auth().currentUser;
      const analysis = {
        charm: 50,
        friendliness: 50,
        likeness: 50,
        popularity: 50,
        activity: 50
      };

      const postData = {
        photoURL: this.sustore.avatar,
        uid: this.sustore.uid,
        displayName: this.sustore.nickname,
        email: this.sustore.email,
        birthday: this.sustore.birthday,
        termsAgreed: this.sustore.termsAgreed,
        city: this.sustore.city,
        gender: this.sustore.gender,
        sexOrientation: this.sustore.sexOrientation,
        geocode: this.sustore.geocode,
        placeID: this.sustore.placeID,
        locale: this.state.locale,
        country: this.state.country,
        photoVerified: false,
        vip: false,
        bio: "",
        hobby: "",
        lang: "",
        gallery: [],
        analysis,
        signupCompleted: true,
        created: this.sustore.created,
        lastUpdated: this.sustore.lastUpdated
      };

      await user
        .updateProfile({
          photoURL: this.state.photoUrl,
          displayName: this.sustore.nickname
        })
        .then(() => {
          Reactotron.debug("User profile updated");
        })
        .catch(err => {
          Reactotron.error("User profile update error");
          Reactotron.error(err);
        });

      await this.firebase
        .database()
        .ref(`users/${this.sustore.uid}`)
        .set(postData)
        .then(res => {
          Reactotron.debug("Set user data to firebase");
          Reactotron.debug(res);
        })
        .catch(err => {
          Reactotron.error("Set user data failed");
          Reactotron.error(err);
        });

      //Add user to seeking table on firebase
      const soRef = "seeking/" +
        this.state.country +
        "/" +
        this.sustore.sexOrientation +
        "/" +
        this.sustore.uid;
      const soData = {
        uid: this.sustore.uid
      };

      Reactotron.log(soRef);
      Reactotron.log(soData);
      await this.firebase
        .database()
        .ref(soRef)
        .set(soData)
        .then(res => {
          Reactotron.debug("Set sexOrientation to firebase");
          Reactotron.debug(res);
        })
        .catch(err => {
          Reactotron.error("Set sexOrientation failed");
          Reactotron.error(err);
        });
      this.store.setInSignupProcess(false);
      Actions.sessioncheck();
    } catch (err) {
      Reactotron.error(err);
    }
  };

  render() {
    const { nickname } = this.sustore;

    return (
      <View style={this.state.size}>
        <Header
          headerText="上傳個人照"
          rightButtonText="完成"
          onRight={this.handleSubmit}
          rightColor="#007AFF"
          onLeft={() => Actions.pop()}
          leftColor="#007AFF"
        />
        <View style={{ marginBottom: 20 }}>
          <Card>
            <View style={styles.wrapper}>
              {this.state.loading
                ? <ActivityIndicator
                    size="large"
                    style={{
                      marginTop: 60
                    }}
                  />
                : <Avatar
                    xlarge
                    rounded
                    title={nickname}
                    source={{ uri: this.state.image }}
                  />}
            </View>
            <Text style={{ marginBottom: 10 }}>
              根據最新英國研究報告, 在交友app上顯示您的個人照片會提高配對成功機率喔！
              無論你信不信, 反正我信了。
            </Text>
            <Button
              icon={{ name: "add" }}
              backgroundColor="#03A9F4"
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
              }}
              title="新增個人照片"
              onPress={this.addImage}
            />
          </Card>
          <Button
            style={{ marginTop: 10 }}
            backgroundColor="transparent"
            color="#007AFF"
            title={"完成"}
            onPress={this.handleSubmit}
          />
        </View>
      </View>
    );
  }
}

export { Signup4 };
