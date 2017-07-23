import React, { Component } from 'react'
import Drawer from 'react-native-drawer'
import { Actions, DefaultRenderer } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react/native'
import { Dimensions } from 'react-native'

import Sider from '../../components/Sider'

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
      uploadState: null
    }
  }
  
  componentWillMount() {
    if (this.SignUpInStore.UpInStatus === '註冊') {
      this.setState({
        uploadState: '上傳中'
      })
      this.uploadSignUpData()
      this.initSubjectStoreFromSignUpInStore()
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
          uploadState: '上傳完成'
        })
      }).catch((error) => {
        this.setState({
          uploadState: '上傳失敗'
        })
        console.log(error)
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
            displayBottom={ this.state.uploadState }
            displayName={ this.SubjectStore.displayName }
            displayNameOnPress={ this.goToAboutMe }
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
