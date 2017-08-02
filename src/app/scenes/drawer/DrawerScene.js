import React, { Component } from 'react'
import Drawer from 'react-native-drawer'
import { Actions, DefaultRenderer } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react/native'
import { Dimensions } from 'react-native'
import GeoFire from 'geofire'

import Sider from '../../views/Sider/Sider'

const metadata = {
    contentType: 'image/jpeg'
}

const { width } = Dimensions.get('window')

const drawerStyles = {
  drawer: { 
    borderRightWidth: 0, 
    width
  }
}

const DefaultLangs =  { 
  中文: false, 
  英文: false, 
  韓文: false
}

const DefaultInterests = []

@inject('firebase','SignUpInStore','SubjectStore') @observer
export default class DrawerScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SignUpInStore = this.props.SignUpInStore
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      uploadSignUpDataState: null,
      uploadAvatarState: null
    }
  }
  
  componentWillMount() {
    if (this.SignUpInStore.UpInStatus === '註冊') {
      this.setState({
        uploadSignUpDataState: '使用者資料上傳中',
        uploadAvatarState: '使用者大頭照上傳中'
      })
      this.uploadAvatar() // 非同步上傳相簿
      this.uploadLocation() // 非同步上傳地理位置
      this.uploadSignUpData() // 非同步上傳資料
      this.initSubjectStoreFromSignUpInStore()
    } else {
      this.setState({
        uploadSignUpDataState: '資料同步中'
      })
      this.uploadLocation() // 非同步上傳地理位置
      this.initSubjectStoreFromFirebase() // 非同步抓取網路資料到 SubjectStore
    }
  }

  uploadAvatar = () => {
    this.firebase.storage().ref('images/avatars/' + this.SubjectStore.uid)  
    .putFile(this.SignUpInStore.photoURL.replace('file:/',''), metadata)
    .then(uploadedFile => {
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/photoURL').set(uploadedFile.downloadUrl)
      .then(() => {
        this.firebase.database().ref('users/' + this.SubjectStore.uid + '/photos').set({ 0: uploadedFile.downloadUrl })
        .then(() => {
          this.setState({
            uploadAvatarState: '使用者大頭照上傳成功'
          })})
        .catch(() => {
          this.setState({
            uploadAvatarState: '使用者大頭照上傳失敗'
          })})
      })
      .catch(() => {
        this.setState({
          uploadAvatarState: '使用者大頭照上傳失敗'
        })
      })      
    })
    .catch(() => {
      this.setState({
        uploadAvatarState: '使用者大頭照上傳失敗'
      })
    })
  }

  uploadLocation = () => {
    const query = this.firebase.database().ref('/user_locations/')
    const geoFire = new GeoFire(query)
    geoFire.set(this.SubjectStore.uid, [25.001542,121.497097 ]).then(() => {
      console.log("Provided key has been added to GeoFire");
      }, (error) => {
      console.log("Error: " + error);
    })    
  }

  uploadSignUpData = () => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid).set({
      // 上傳註冊資料
      displayName: this.SignUpInStore.displayName,
      city: this.SignUpInStore.city,
      birthday: this.SignUpInStore.birthday,
      vip: false,
      sexOrientation: this.sexOrientationString(),
      langs: DefaultLangs
    }).then(() => {
        this.setState({
          uploadSignUpDataState: '使用者資料上傳成功'
        })
      }).catch((error) => {
        this.setState({
          uploadSignUpDataState: '使用者資料上傳失敗'
        })
        console.log(error)
      })
  }

  initSubjectStoreFromSignUpInStore = () => {
    this.SubjectStore.setDisplayName(this.SignUpInStore.displayName)
    this.SubjectStore.setCity(this.SignUpInStore.city)
    this.SubjectStore.setBirthday(this.SignUpInStore.birthday)
    this.SubjectStore.setBio(null)
    this.SubjectStore.setPhotoURL(this.SignUpInStore.photoURL)
    this.SubjectStore.setPhotos([this.SignUpInStore.photoURL]) 
    this.SubjectStore.setLangs(DefaultLangs)  
    this.SubjectStore.setInterests(DefaultInterests)    
    this.SubjectStore.setVip(false) ///////// 難處理 /////////
    this.SubjectStore.setSexOrientation(this.sexOrientationString()) ///////// 難處理 /////////
  }

  initSubjectStoreFromFirebase = () => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid).once('value',
      (snap) => {
        if (snap.val()) {
          this.SubjectStore.setDisplayName(snap.val().displayName) // 有可能 null -> '請輸入暱稱...' 
          this.SubjectStore.setCity(snap.val().city) // 有可能 null -> '請輸入地址...'
          this.SubjectStore.setBirthday(snap.val().birthday) // 有可能 null -> '請輸入生日...'
          this.SubjectStore.setBio(snap.val().bio) // 有可能 null -> '您尚未輸入自我介紹，點此輸入自我介紹！'
          this.SubjectStore.setLangs(snap.val().langs || DefaultLangs) // 有可能 null -> 初始選單
          this.SubjectStore.setInterests(snap.val().interests || DefaultInterests) // 有可能 null -> 初始選單
          this.SubjectStore.setPhotoURL(snap.val().photoURL) // 有可能 null -> 灰色大頭照
          ///////// 難處理 /////////
          this.SubjectStore.setPhotos(snap.val().photos || new Array) // 有可能 null -> 必須ㄧ定要是 Array
          this.SubjectStore.setVip(snap.val().vip || false) ///////// 難處理 /////////
          this.SubjectStore.setSexOrientation(snap.val().sexOrientation || null) // 有可能 null -> 萬一上傳失敗拿不到就永遠都是null了 -> 邂逅那邊先做特別處理
        } else {
          this.SubjectStore.setDisplayName(null) //  null -> '請輸入暱稱...' 
          this.SubjectStore.setCity(null) // 有可能 null -> '請輸入地址...'
          this.SubjectStore.setBirthday(null) // 有可能 null -> '請輸入生日...'
          this.SubjectStore.setBio(null) // 有可能 null -> '您尚未輸入自我介紹，點此輸入自我介紹！'
          this.SubjectStore.setLangs(DefaultLangs) // 有可能 null -> 初始選單
          this.SubjectStore.setInterests(DefaultInterests) // 有可能 null -> 初始選單
          this.SubjectStore.setPhotoURL(null) // 有可能 null -> 灰色大頭照
          ///////// 難處理 /////////
          this.SubjectStore.setPhotos(new Array) // 有可能 null -> 必須ㄧ定要是 Array
          this.SubjectStore.setVip(false) ///////// 難處理 /////////
          this.SubjectStore.setSexOrientation(null) // 有可能 null -> 萬一上傳失敗拿不到就永遠都是null了 -> 邂逅那邊先做特別處理
        }
        this.setState({
          uploadSignUpDataState: '資料同步成功'
        })
      }, error => {
        this.setState({
          uploadSignUpDataState: '資料同步失敗'
        })
        console.warn(error)
      })
  }

  sexOrientationString = () => (
    this.SignUpInStore.sexOrientation ? (this.genderString() + 's' + this.genderString()) : (this.genderString() + 's' + (this.SignUpInStore.gender ? 'f' : 'm'))    
  )

  genderString = () => (
    this.SignUpInStore.gender ? 'm' : 'f'
  )

  goToAboutMe() {
    Actions.aboutme({type: 'reset'})
  }

  goToMeetChance() {
    Actions.meetchance({type: 'reset'})
  }

  goToMessage() {
    //Actions.message({type: 'reset'})
  }

  goToMeetCute() {
    Actions.meetcute({type: 'reset'})
  }

  goToFate() {
    Actions.fate({type: 'reset'})
  }

  goToSetting() {
    Actions.setting({type: 'reset'})
  }

  render() {

    const state = this.props.navigationState
    const children = state.children

    return (
      <Drawer
        ref='navigation'
        type='overlay'
        styles={ drawerStyles }
        onOpen={() => Actions.refresh({ key: state.key, open: true })}
        onClose={() => Actions.refresh({ key: state.key, open: false })}
        open={ state.open }
        content={
          <Sider 
            warningTop={ this.state.uploadSignUpDataState }
            warningBottom={ this.state.uploadAvatarState }
            avatar={ this.SubjectStore.photoURL }
            displayName={ this.SubjectStore.displayName }

            displayNameOnPress={ this.goToAboutMe }
            meetchanceOnPress={ this.goToMeetChance }
            meetcueOnPress={ this.goToMeetCute }
            messageOnPress={ this.goToMessage }
            fateOnPress={ this.goToFate }
            settingOnPress={ this.goToSetting }
          />
        }
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={(ratio) => ({
         main: { opacity: Math.max(0.54, 1 - ratio) }
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}
