import React, { Component } from 'react'
import Drawer from 'react-native-drawer'
import { Actions, DefaultRenderer } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react/native'
import { Dimensions, Platform } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'

import Sider from '../../components/Sider/Sider'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const { width } = Dimensions.get('window')

const drawerStyles = {
  drawer: { 
    borderRightWidth: 0, 
    //borderRightColor: '#dcdcdc', 
    width
  }
}

@inject("firebase","SignUpInStore","SubjectStore") @observer
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
      console.warn(this.SignUpInStore.photoURL)
      this.uploadSignUpData() // 上傳資料
      this.uploadAvatar(this.SignUpInStore.photoURL) // 上傳相簿
      this.initSubjectStoreFromSignUpInStore() //
    } else {
      this.initSubjectStoreFromFirebase() // 或許會有非同步問題
    }
  }

  componentDidMount() { 
    //
  }

  initSubjectStoreFromSignUpInStore() {
    this.SubjectStore.setUid(this.SignUpInStore.uid)
    this.SubjectStore.setDisplayName(this.SignUpInStore.displayName)
  }

  initSubjectStoreFromFirebase() {
    this.firebase.database().ref("users/" + this.SignUpInStore.uid).once("value",
      (snap) => {
        if (snap.val()) {
          this.SubjectStore.setUid(snap.val().uid)
          this.SubjectStore.setDisplayName(snap.val().displayName)
        }
      })
  }

  uploadSignUpData() {
    this.firebase.database().ref("users/" + this.SignUpInStore.uid).set({
      // SignUpData
      uid: this.SignUpInStore.uid,
      email: this.SignUpInStore.email,
      displayName: this.SignUpInStore.displayName,
      gender: this.gender(),
      sexOrientation: this.SignUpInStore.sexOrientation ? (this.gender() + 's' + this.gender()) : (this.gender() + 's' + (this.SignUpInStore.gender ? 'f' : 'm')),
      city: this.SignUpInStore.city,
      birthday: this.SignUpInStore.birthday,
      vip: false
    })
      .then(() => {
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

  uploadAvatar = (uri, ref, mime = 'image/PNG') => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    let uploadBlob = null
    const imageRef = this.firebase.storage().ref('images/avatars/' + this.SignUpInStore.uid)
    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then(() => {
        this.setState({
          uploadAvatarState: '使用者大頭照上傳成功'
        })
      })
      .catch(err => {
        this.setState({
          uploadAvatarState: '使用者大頭照上傳失敗'
        })
        console.warn(err)
      })
  }

  gender() {
    return(
      this.SignUpInStore.gender ? 'm' : 'f'
    )
  }

  goToAboutMe() {
    Actions.AboutMe({type: 'reset'})
  }

  goToFate() {
    Actions.FateTab({type: 'reset'})
  }

  goToMeetChance() {
    Actions.meetchance({type: 'reset'})
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
            displayName={ this.SubjectStore.displayName }
            displayNameOnPress={ this.goToAboutMe }
            meetchanceOnPress={ this.goToMeetChance }
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
