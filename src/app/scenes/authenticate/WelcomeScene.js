import React, { Component } from 'react'
import { BackHandler, ToastAndroid } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import Welcome from '../../views/Welcome/Welcome'

@inject('ControlStore') @observer
export default class WelcomeScene extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //return false
        BackHandler.exitApp() //最近2秒内按過返回键，可以退出程式
    }
    this.lastBackPressed = Date.now()
    ToastAndroid.show('再按一次離開程式', ToastAndroid.SHORT)
    return true
  }

  goToSignUp = () => {
    this.ControlStore.setAuthenticateIndicator('註冊')
    Actions.signup({type: 'reset'})
  }

  goToSignIn = () => {
    this.ControlStore.setAuthenticateIndicator('登入')
    Actions.signin({type: 'reset'})
  }

  goToResetPassword = () => {
    Actions.password({type: 'reset'})
  }

  render() {
    return(
      <Welcome
        title='遇見更多的她/他'
        topButtonText='免費加入'
        bottomButtonText='登入'
        warningText='忘記密碼？申請密碼重設'
        topButtonOnPress={ this.goToSignUp }
        bottomButtonOnPress={ this.goToSignIn }
        warningOnPress={ this.goToResetPassword }
      />
    )
  }
}