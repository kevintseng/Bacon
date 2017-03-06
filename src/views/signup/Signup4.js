import React, {Component, PropTypes} from 'react';
import {
    View,
    Dimensions,
    Text,
    ActivityIndicator,
    Platform,
  } from 'react-native'; // eslint-disable-line
import UserAvatar from 'react-native-user-avatar';
import { Card, Button } from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux'; // eslint-disable-line
import { autorun } from 'mobx'; // eslint-disable-line
import { observer } from 'mobx-react/native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import Reactotron from 'reactotron-react-native'; // eslint-disable-line
import { Header } from '../../components/Header';
// import { FirebaseConfig } from '../../Configs';

const {width, height} = Dimensions.get('window'); //eslint-disable-line

const ipOptions = {
  mediaType: 'photo',
  maxWidth: 1000,
  maxHeight: 1000,
  quality: 1,
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
export class Signup4 extends Component {
  static propTypes = {
    fire: PropTypes.object,
    store: PropTypes.object,
    sustore: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.sustore = this.props.sustore;
    this.store = this.props.store;
    this.fs = this.props.fire;
    this.state = {
      size: {
          width,
          height: 600
      },
      image: null,
      imageHeight: null,
      imageWidth: null,
      imageTimestamp: null,
      imageGeo: null,
      photoUrl: null,
      loading: false,
    };
  }

  componentWillMount() {
  }

  updatePhotoUrl = (photoUrl) => {
    Reactotron.debug('UpdatePhotoUrl: ' + photoUrl);
    this.setState({
      photoUrl,
      loading: false,
    })
  }

  uploadImageAndSetPhotoUrl = (uri, mime = 'image/jpeg') => {
    Reactotron.debug('Uploading image');
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;
    Reactotron.debug(this.sustore.uid);
    const imageRef = this.fs.storage().ref('images/user').child(`${this.sustore.uid}`);

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
        this.updatePhotoUrl(url);
      })
      .catch(err => {
        Reactotron.error('ReadFile error: ');
        Reactotron.error(err);
      })
  }

  addImage = () => {
    ImagePicker.showImagePicker(ipOptions, (res) => {
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
        this.uploadImageAndSetPhotoUrl(res.uri);
        // Reactotron.debug(res);
        this.setState({
          image: res.uri,
          imageHeight: res.height,
          imageWidth: res.width,
          imageGeo: {
            lon: res.longitude,
            lat: res.latitude
          },
          imageTimestamp: res.timestamp,
        });
      }
    });
  }

  handleSubmit = () => {
    if(!this.state.photoUrl) {
      alert('請給偶一張您的美/帥照, 拜偷拜偷');
      return;
    }
    let user = this.fs.auth().currentUser;
    this.sustore.setAvatar(this.state.photoUrl);
    user.updateProfile({
      photoURL: this.state.photoUrl,
      displayName: this.sustore.nickname,
    }).then(res => {
      Reactotron.debug('User profile updated');
      Reactotron.debug(res);
    }).catch(err => {
      Reactotron.error('User profile update error');
      Reactotron.error(err);
    });
    const postData = {
      uid: this.sustore.uid,
      displayName: this.sustore.nickname,
      email: this.sustore.email,
      photoURL: this.state.photoUrl,
      birthday: this.sustore.birthday,
      termsAgreed: this.sustore.termsAgreed,
      city: this.sustore.city,
      gender: this.sustore.gender,
      sexOrientation: this.sustore.sexOrientation,
      geocode: this.sustore.geocode,
      placeID: this.sustore.placeID,
      locale: this.sustore.locale,
      country: this.sustore.country,
    };

    this.fs.database().ref(`users/${this.sustore.uid}`).set(postData).then((res) => {
      Reactotron.debug('Set user data to fs');
      Reactotron.debug(res);
    }).catch(err => {
      Reactotron.error('Set user data failed');
      Reactotron.error(err);
    });
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
              this.state.loading ? <ActivityIndicator style={styles.indicator}/> : <UserAvatar
              style={{ alignSelf: 'center', marginBottom: 10 }}
              size='150'
              name={nickname}
              src={this.state.photoUrl}
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
