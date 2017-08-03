import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import Welcome from '../../views/Welcome/Welcome'

@inject('ControlStore') @observer
export default class WelcomeScene extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
  }

  _goToSignUp = () => {
    this.ControlStore.setAuthenticateIndicator('註冊')
    Actions.signup()
  }

  _goToSignIn = () => {
    this.ControlStore.setAuthenticateIndicator('登入')
    Actions.signin()
  }

  render() {
    return(
      <Welcome
        title='遇見更多的她/他'
        topButtonText='免費加入'
        bottomButtonText='登入'
        warningText='忘記密碼？申請密碼重設'
        topButtonOnPress={ this._goToSignUp }
        bottomButtonOnPress={ this._goToSignIn }
      />
    )
  }
}