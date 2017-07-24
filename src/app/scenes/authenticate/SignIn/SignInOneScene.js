import React, { Component } from 'react'
import { Actions } from "react-native-router-flux"
import { inject, observer } from "mobx-react"

import SignInOne from '../../../components/SignInOne/SignInOne'

@inject("SignUpInStore") @observer
export default class SignInOneScene extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  buttonOnPress = () => {
    this.SignUpInStore.setUpInStatus('登入')
    Actions.Auth({ type: 'reset' })
  }

  render(){
    return(
      <SignInOne
        buttonText='登入'
        buttonOnPress={ this.buttonOnPress }
        email={ this.SignUpInStore.email }
        onChangeEmail={ this.SignUpInStore.setEmail }
        password={ this.SignUpInStore.password }
        onChangePassword={ this.SignUpInStore.setPassword }
        warningText='忘記密碼？申請密碼重設'
      />
    )
  }
}