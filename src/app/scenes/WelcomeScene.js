import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import Welcome from '../views/Welcome/Welcome'

@inject('SignUpInStore') @observer
export default class WelcomeScene extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  _goToSignUp = () => {
    this.SignUpInStore.setUpInStatus('註冊')
    Actions.signup()
  }

  _goToSignIn = () => {
    this.SignUpInStore.setUpInStatus('登入')
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