import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Text,
    ActivityIndicator,
    Platform,
  } from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import { Card, Button, Avatar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import { observer } from 'mobx-react/native';
import ImagePicker from 'react-native-image-picker';
import Reactotron from 'reactotron-react-native';
import { Header } from '../../components/Header';
// import { FirebaseConfig } from '../../Configs';

const {width, height} = Dimensions.get('window'); //eslint-disable-line

const styles = {
  wrapper: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  indicator: {
    marginTop: 50,
    marginBottom: 50,
    alignSelf: 'center'
  }
};

const ipOptions = {
  mediaType: 'photo',
  maxWidth: 1000,
  maxHeight: 1000,
  quality: 0.8,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'hookup'
  },
};

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

@observer
class Signup4 extends Component {
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
      imageHeight: null,
      imageWidth: null,
      imageTimestamp: null,
      imageGeo: null,
      photoUrl: null,
      loading: false,
    };
  }

  componentWillMount() {
    Reactotron.log('Will mount Signup4');
  }

  componentDidMount() {
    this.store.setInSignupProcess(true);
    Reactotron.log('Signup 4 mounted');
  }

  addImage = () => {
    ImagePicker.showImagePicker(ipOptions, async (res) => {
      this.setState({
        loading: true
      });
      if(res.didCancel) {
        Reactotron.log('ImagePicker: User cancelled image picker');
        return;
      } else if(res.error) {
        Reactotron.error('ImagePicker Error: ' + res.error);
        this.setState({
          loading: false,
        });
      } else {
        ImageResizer.createResizedImage(res.uri, 200, 200, 'JPEG', 80)
        .then( async (resizedImageUri) => {
          this. uploadImage(resizedImageUri);
          this.setState({
            image: 'file://' + resizedImageUri,
            imageGeo: {
              lon: res.longitude,
              lat: res.latitude
            },
            imageTimestamp: res.timestamp,
          });
        }).catch((err) => {
          Reactotron.error(err);
        });
      }
    });
  }

  uploadImage = (uri, ref, mime = 'image/PNG') => {
    Reactotron.debug('Uploading image');
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;
    const imageRef = this.firebase.storage().ref('avatars/' + this.sustore.uid);
    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        Reactotron.debug('Url');
        Reactotron.debug(url);
        this.setState({
          photoUrl: url,
          loading: false,
        });
        this.sustore.setAvatar(url);
      })
      .catch(err => {
        Reactotron.error('ReadFile error: ');
        Reactotron.error(err);
      })
  }

  handleSubmit = async () => {
    if(!this.state.photoUrl) {
      alert('請給偶一張您的美/帥照, 拜偷拜偷');
      return;
    }
    const user = await this.firebase.auth().currentUser;

    user.updateProfile({
      photoURL: this.state.photoUrl,
      displayName: this.sustore.nickname,
    }).then(() => {
      Reactotron.debug('User profile updated');
    }).catch(err => {
      Reactotron.error('User profile update error');
      Reactotron.error(err);
    });
    const analysis = {
      charm: 50,
      friendliness: 50,
      likeness: 50,
      popularity: 50,
      activity: 50,
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
      locale: this.sustore.locale,
      country: this.sustore.country,
      photoVerified: false,
      vip: false,
      bio: '',
      hobby: '',
      lang: '',
      gallery: [],
      analysis,
      signupCompleted: true,
    };

    await this.firebase.database().ref(`users/${this.sustore.uid}`).set(postData).then((res) => {
      Reactotron.debug('Set user data to firebase');
      Reactotron.debug(res);
    }).catch(err => {
      Reactotron.error('Set user data failed');
      Reactotron.error(err);
    });
    const soData = {
      uid: this.sustore.uid,
      displayName: this.sustore.nickname,
      birthday: this.sustore.birthday,
      photoURL: this.sustore.avatar,
      gender: this.sustore.gender,
      geocode: this.sustore.geocode,
      placeID: this.sustore.placeID,
    };
    this.firebase.database().ref(this.sustore.sexOrientation).set(soData);
    this.store.setInSignupProcess(false);
    return Actions.sessioncheck();
  }

  render() {
    const { nickname } = this.sustore;
    return (
      <View style={[this.state.size, {flexGrow: 1, }]}>
        <Header
          headerText='上傳個人照'
          rightButtonText='完成'
          onRight={this.handleSubmit}
          rightColor='#007AFF'
          onLeft={() => Actions.pop()}
          leftColor='#007AFF'
        />
        <View style={{ marginBottom: 20 }}>
          <Card>
            <View style={styles.wrapper}>
            {
              this.state.loading ? <ActivityIndicator style={styles.indicator}/> : <Avatar
              style={{ alignSelf: 'center', marginBottom: 10 }}
              xlarge
              rounded
              title={nickname}
              source={{uri: this.state.image}}
              />
            }
            </View>
            <Text style={{marginBottom: 10}}>
              根據最新英國研究報告, 在交友app上顯示您的個人照片會提高配對成功機率喔！
              無論你信不信, 反正我信了。</Text>
            <Button
              icon={{name: 'add'}}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='新增個人照片'
              onPress={this.addImage}
            />
          </Card>
          <Button
            style={{ marginTop: 10 }}
            backgroundColor='transparent'
            color='#007AFF'
            title={'完成'}
            onPress={this.handleSubmit}
          />
        </View>
      </View>
    );
  }
}

export { Signup4 };
