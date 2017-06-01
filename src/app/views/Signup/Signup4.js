import React, {Component, PropTypes} from 'react';
import {
    View,
    Dimensions,
    ActivityIndicator,
    Platform
  } from 'react-native'; // eslint-disable-line
//import Storage from 'react-native-storage'
import UserAvatar from 'react-native-user-avatar';
import ImageResizer from 'react-native-image-resizer';
import { Card, Button } from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux'; // eslint-disable-line
import RNFetchBlob from 'react-native-fetch-blob';
import { observer } from 'mobx-react/native';
import ImagePicker from 'react-native-image-picker';
import { Header } from '../../components/Header';
//import { AsyncStorage } from 'react-native';
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
    this.db = this.props.localdb;
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

  setLocalDB = (userData) => {
    console.log('DB:' + userData)
    const Slocaoldb = this.db;
    console.log(Slocaldb);
    /*
    return new Promise((resolve, reject) => {
      Slocaldb
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
    */
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
    console.log(this.db)
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


  this.writeData(postData).then( value => {
    console.log('then~~~~');
    console.log(value);
  }).then(this.loadData(this.sustore.uid).then( value => {
    console.log('then2~~~:');
    console.log(value)
  })).then(this.setLocalDB().then( value =>{
    console.log('DB: ' + value)
  }))
  */
  //this.writeData(postData).then(this.loadData()).then(this.setDB(postData)).then(this.actionSession());
  //Actions.sessioncheck();

  this.asyncWriteData(postData);


  };

  asyncWriteData = async(data) => {
    await this.firebase.database().ref('users/' + this.sustore.uid).set(data).then(function(error){
      if(error){

      } else{

      }
    })
    this.asyncLoadData();
  };

  asyncLoadData = async () => {
    var dataval
    await this.firebase.database().ref('users/' + this.sustore.uid).once("value",function(snapshot){
      dataval = snapshot.val()
    })
    console.log('dataval~~')
    console.log(dataval)
    this.asyncSetDB(dataval);
  }

  asyncSetDB = async(userdata) => {
    console.log('setDB!-----------')
    console.log(userdata);
    await this.db.save({
        key: "user",
        //id: '1001',
        data: userdata,
        expires: 1000 * 3600 * 24 * 30 // expires after 30 days
    })
    this.asyncActions();
    //this.showDB();
  }

  asyncActions = () => {
    Actions.sessioncheck();
  }

  saveDB = () => {
    var savedata = {
      uid: 'frank428p',
      age: '27'
    };

    var db = storage;
     db.save({
      key: 'user',
      data: savedata
    });
  }

  showDB = () => {
    console.log('in Show DB-------');
    console.log(this.db);
    var db = storage;
    db.load({
	     key: 'user',
       autoSync: true,
       syncInBackground: true,
       //id: '1001'
    }).then(ret => {
    	// found data goes to then()
    	console.log(ret.uid);
    }).catch(err => {
    	// any exception including data not found
    	// goes to catch()
    	console.warn(err.message);
    });
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
      fs.database().ref('users/' + uid).once("value",function(snapshot){
        console.log('loadData: ' + snapshot.val())
        resolve(snapshot.val());
      })
    })
  }
  setDB = (data) => {


    this.db.save({
        key: "user",
        data: data,
        expires: 1000 * 3600 * 24 * 30 // expires after 30 days
    })
  }
  actionSession = (userData) => {
    Actions.sessioncheck();
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
            title={'完成，開始使用'}
            onPress={this.confrimSubmit}
          />

        </View>
      </View>
    );
  }
}

export { Signup4 };
