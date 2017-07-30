import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import Welcome from '../../views/Welcome/Welcome'

export default class WelcomeContainer extends Component {

  goToSignUp() {
    Actions.signup()
  }

  goToSignIn() {
    Actions.signin()
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
      />
    )
  }
}