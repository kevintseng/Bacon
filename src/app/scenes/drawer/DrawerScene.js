import React, { Component } from 'react'
import Drawer from 'react-native-drawer'
import { Actions, DefaultRenderer } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react/native'
import { Dimensions } from 'react-native'

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
      this.uploadSignUpData() // 非同步上傳資料
      this.initSubjectStoreFromSignUpInStore()
    } else {
      this.setState({
        uploadSignUpDataState: '資料同步中'
      })
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

  uploadSignUpData = () => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid).set({
      // 上傳註冊資料
      // 只有 uid 從 SubjectStore 直接上傳
      uid: this.SubjectStore.uid, // TODO : 資欄位好像不需要
      // 其他資料從 SignUpInStore 上傳
      email: this.SignUpInStore.email,
      displayName: this.SignUpInStore.displayName,
      gender: this.genderString(),
      sexOrientation: this.sexOrientationString(),
      city: this.SignUpInStore.city,
      birthday: this.SignUpInStore.birthday,
      vip: false
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
    this.SubjectStore.setPhotoURL(this.SignUpInStore.photoURL)
    this.SubjectStore.setDisplayName(this.SignUpInStore.displayName)
    this.SubjectStore.setSexOrientation(this.sexOrientationString())
    this.SubjectStore.setCity(this.SignUpInStore.city)
    this.SubjectStore.setBirthday(this.SignUpInStore.birthday)
    this.SubjectStore.setBio(null)
  }

  initSubjectStoreFromFirebase = () => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid).once('value',
      (snap) => {
        if (snap.val()) {
          this.SubjectStore.setPhotoURL(snap.val().photoURL)
          this.SubjectStore.setDisplayName(snap.val().displayName)
          this.SubjectStore.setSexOrientation(snap.val().sexOrientation.slice(-1))
          this.SubjectStore.setCity(snap.val().city)
          this.SubjectStore.setBirthday(snap.val().birthday)
          this.SubjectStore.setBio(snap.val().bio)
          this.SubjectStore.setPhotos(snap.val().photos || [])
          // AboutMeEdit
          this.SignUpInStore.setDisplayName(snap.val().displayName)
          this.SignUpInStore.setTextInputCity(snap.val().city)
          this.SignUpInStore.setBirthday(snap.val().birthday)
          this.SignUpInStore.setBio(snap.val().bio)
        }
        this.setState({
          uploadSignUpDataState: '資料同步成功'
        })
      }, error => {
        this.setState({
          uploadSignUpDataState: '資料同步失敗'
        })
        console.log(error)
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
