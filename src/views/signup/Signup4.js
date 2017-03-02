import React, {Component, PropTypes} from 'react';
import {
    View,
    Dimensions,
    Text,
    ActivityIndicator,
  } from 'react-native'; // eslint-disable-line
import UserAvatar from 'react-native-user-avatar';
import { Card, Button } from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux'; // eslint-disable-line
import { autorun } from 'mobx'; // eslint-disable-line
import { observer } from 'mobx-react/native';
import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'react-native-fetch-blob';
import Reactotron from 'reactotron-react-native'; // eslint-disable-line
import { Header } from '../../components/Header';
import { FirebaseConfig } from '../../Configs';

const {width, height} = Dimensions.get('window'); //eslint-disable-line

// const emptyImg = require('./cameraPlaceholder.jpg');
const { storageBucket } = FirebaseConfig;
const ipOptions = {
  mediaType: 'photo',
  maxWidth: 1000,
  maxHeight: 1000,
  quality: 1,
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: 'hookup'
  },
};

// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob
//
// const uploadImage = (uri, mime = 'application/octet-stream') => {
//   return new Promise((resolve, reject) => {
//     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
//     const sessionId = new Date().getTime()
//     let uploadBlob = null
//     const imageRef = storage.ref('images').child(`${sessionId}`)
//
//     fs.readFile(uploadUri, 'base64')
//       .then((data) => {
//         return Blob.build(data, { type: `${mime};BASE64` })
//       })
//       .then((blob) => {
//         uploadBlob = blob
//         return imageRef.put(blob, { contentType: mime })
//       })
//       .then(() => {
//         uploadBlob.close()
//         return imageRef.getDownloadURL()
//       })
//       .then((url) => {
//         resolve(url)
//       })
//       .catch((error) => {
//         reject(error)
//     })
//   })
// };

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
    this.fs.storage.setStorageUrl(storageBucket);
  }

  updatePhotoUrl = (photoUrl) => {
    this.setState({
      photoUrl,
      loading: false,
    })
    Reactotron.log('set photo');
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
        this.fs.storage.uploadFile(`images/user/${this.sustore.uid}`, res.uri, {
          contentType: 'image/jpeg',
          contentEncoding: 'base64',
        }, (evt) => {
          Reactotron.log(evt);
        }).then((res) => {
          Reactotron.log('Image uploaded');
          this.updatePhotoUrl(res.downloadUrl);
          Reactotron.log(res);
        }).catch((err) => {
          Reactotron.log('Upload image error');
          Reactotron.error(err);
          this.setState({
            loading: false,
          });
        });
        Reactotron.debug(res);
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
    this.sustore.setAvatar(this.state.photoUrl);
    this.fs.auth.updateUserProfile({
      photoURL: this.state.photoUrl,
    }).then(res => {
      Reactotron.debug('User profile updated');
    }).catch(err => {
      Reactotron.error('User profile update error');
      Reactotron.error(err);
    });
    const postData = {
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

    this.fs.database.ref(`users/${this.sustore.uid}`).set(postData).then((res) => {
      Reactotron.debug('Set user data to fs');
      Reactotron.debug(res);
    }).catch(err => {
      Reactotron.error('Set user data failed');
      Reactotron.error(err);
    });
      // return Actions.pop({popNum: 3});
      // return Actions.meetcute({type:'reset'})
  }

  render() {
    const { nickname } = this.sustore;
    Reactotron.debug(this.state);

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
