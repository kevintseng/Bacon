import React, {Component, PropTypes} from 'react';
import {
    View,
    Dimensions,
    Text,
    ActivityIndicator,
    Platform,
  } from 'react-native'; // eslint-disable-line
import UserAvatar from 'react-native-user-avatar';
import ImageResizer from 'react-native-image-resizer';
import { Card, Button } from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux'; // eslint-disable-line
import RNFetchBlob from 'react-native-fetch-blob';
import { observer } from 'mobx-react/native';
import ImagePicker from 'react-native-image-picker';
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
class TempSignup4 extends Component {
  static propTypes = {
    fire: PropTypes.object,
    store: PropTypes.object,
    sustore: PropTypes.object,
  };

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

  addImage = () => {
    ImagePicker.showImagePicker(ipOptions, async (res) => {
      this.setState({
        loading: true
      });
      if(res.didCancel) {
        //Reactotron.log('ImagePicker: User cancelled image picker');
        return;
      } else if(res.error) {
        console.log(res.error);
        //Reactotron.error('ImagePicker Error: ' + res.error);
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
          console.log('add err: ' + err )
          //Reactotron.error(err);
        });
      }
    });
  }

  uploadImage = (uri, ref, mime = 'image/PNG') => {
    //Reactotron.debug('Uploading image');
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;
    const imageRef = this.firebase.storage().ref('images/avatars/' + this.sustore.uid);
    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        console.log('step 1: ' + data);
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        console.log('step 2:' + blob);
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        console.log('step 3: getDownloadURL');
        uploadBlob.close()
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        console.log('step 4: ' + url);
        //Reactotron.debug('Url');
        //Reactotron.debug(url);
        this.setState({
          photoUrl: url,
          loading: false,
        });
        this.sustore.setAvatar(url);
      })
      .catch(err => {
        console.log('upload err: ' + err);
        //Reactotron.error('ReadFile error: ');
        //Reactotron.error(err);
      })
  }

  postUserData (userData) {
    return new Promise((resolve, reject) => {
      this.firebase.database().ref(`users/${this.sustore.uid}`).set(userData).then((res) => {
        console.log('up4 res: ' + res);
        console.log('------------------------register done------------------------')

        const userPostData = {
          uid: res.uid,
          displayName: res.displayName,
          photoURL: res.photoURL,
          email: res.email,
          emailVerified: res.emailVerified,
          isAnonymous: res.isAnonymous,
          providerId: res.providerId
        };

        console.log('up4 userdata: ' + userData);
        return userPostData;
        resolve(userPostData)
        //return Actions.sessioncheck();
      }).catch(err => {
        console.log(err);
        //Reactotron.error('Set user data failed');
        //Reactotron.error(err);
        //return Actions.sessioncheck();
      });
    })
  };

  postUserDataAsync(userData) {
    this.firebase.database().ref(`users/${this.sustore.uid}`).set(userData).then((res) => {
      console.log('up4 res: ' + res);
      console.log('------------------------register done------------------------')

      const userPostData = {
        uid: res.uid,
        displayName: res.displayName,
        photoURL: res.photoURL,
        email: res.email,
        emailVerified: res.emailVerified,
        isAnonymous: res.isAnonymous,
        providerId: res.providerId
      };

      return userPostData;

      console.log('up4 userdata: ' + userData);
      resolve(userPostData)
      //return Actions.sessioncheck();
    }).catch(err => {
      console.log(err);
      //Reactotron.error('Set user data failed');
      //Reactotron.error(err);
      //return Actions.sessioncheck();
    });
  }

  setLocalDB (userData) {
    console.log('DB:' + userData)
    const locaoldb = this.state.localdb;
    return new Promise((resolve, reject) => {
      localdb
        .save({
          key: "user",
          data: userData,
          expires: 1000 * 3600 * 24 * 30 // expires after 30 days
        },resolve('ok'))
        .catch(err => {
          console.log("Router: Saving data to local db failed.");
          console.log(err);
        });
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
      //Reactotron.debug('User profile updated');
    }).catch(err => {
      console.log(err);
      //Reactotron.error('User profile update error');
      //Reactotron.error(err);
    });

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
      signupCompleted: true,
    };

    const checkPost = await postUserData(postData);
    const postRes = await setLocalDB(checkPost);

    console.log('-----Check Post----- ' + checkPost );
    console.log('-----Check Post----- ' + postRes );

    //return Actions.sessioncheck();
  }


  confrimSubmit = async () => {
    console.log('submit check');
    if(!this.state.photoUrl) {
      alert('請給偶一張您的美/帥照, 拜偷拜偷');
      return;
    };

    const user = await this.firebase.auth().currentUser;

    await user.updateProfile({
      photoURL: this.state.photoUrl,
      displayName: this.sustore.nickname,
    }).then(() => {
      //Reactotron.debug('User profile updated');
    }).catch(err => {
      console.log(err);
      //Reactotron.error('User profile update error');
      //Reactotron.error(err);
    });

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
      signupCompleted: true,
    };

    console.log('-----post Data-----' + JSON.stringify(postData));


    //const reUserData = await postUserDataAsync(postData);
    //console.log('---reUserData---' + reUserData);
    /*
    await this.firebase.database().ref('users/' + this.sustore.uid).set(postData, function(error,res,snap){
      console.log('error: ' + error);
      console.log('res: ' + res);
      console.log('snap: ' + snap);
    });
    */
    //this.setAsync(postData);

  this.writeData(postData).then( value => {
    console.log('then~~~~: ' + value);
  }).then(this.loadData(this.sustore.uid)).then(this.setLocalDB(postData)).then(this.actionSession());



  };




 callset = async (postData) =>{
    const setrevalue = await this.setAsync(postData);
    console.log('setrevalue ' + setrevalue);
  }

  writeData = (userData) => {
    //console.log('Firest pro = ' + this.firebase);
    //console.log('userDATA~~ ' + JSON.stringify(userData));
    const fs = this.firebase;
    const uid = this.sustore.uid
     return new Promise(function(resolve, reject){
       console.log('pro = ' + fs);
       fs.database().ref('users/' + uid).set(userData).then(function(error){
         if(error){
            resolve('error');
         }else{
           resolve('success');
         }
       })
     })
  }

  loadData = () => {
    const fs = this.firebase;
    const uid = this.sustore.uid;
    return new Promise(function(resolve, reject){
      fs.database().ref('users/' + uid).on("value",function(snapshot){
        console.log('loadData: ' + snapshot.val())
        resolve(snapshot.val());
      })
    })
  }

  actionSession = (userData) => {
    Actions.SessionCheck();
  }






 async testAsync(userData) {
    await this.firebase.database().ref('users/' + this.sustore.uid).set(userData).then((res) => {
      console.log('up4 res: ' + res);
      console.log('------------------------register done------------------------')

      const userPostData = {
        uid: res.uid,
        displayName: res.displayName,
        photoURL: res.photoURL,
        email: res.email,
        emailVerified: res.emailVerified,
        isAnonymous: res.isAnonymous,
        providerId: res.providerId
      };

      return userPostData;

      console.log('Async:' + res);

      console.log('up4 userdata: ' + userData);
      //resolve(userPostData)
      //return Actions.sessioncheck();
    }).catch(err => {
      console.log(err);
      //Reactotron.error('Set user data failed');
      //Reactotron.error(err);
      //return Actions.sessioncheck();
    });
  };

  async testUpload(userData) {
    try{
      await this.firebase.database().ref('users/' + this.sustore.uid).set(userData);
    } catch (error) {
      console.log(error.toString())
    }
  }






  render() {
    const { nickname } = this.sustore;
    return (
      <View style={[this.state.size, {flexGrow: 1, }]}>
        <Header
          headerImage
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
              src={this.state.image}
              />
            }
            </View>
            <Button
              icon={{name: 'add'}}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='新增個人照片一張'
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

          <Button
            style={{ marginTop: 10 }}
            backgroundColor='transparent'
            color='#007AFF'
            title={'Async/Await'}
            onPress={this.confrimSubmit}
          />

        </View>
      </View>
    );
  }
}

export { TempSignup4 };
