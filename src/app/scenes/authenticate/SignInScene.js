import React, { Component } from 'react'
import { Actions } from "react-native-router-flux"
import { inject, observer } from "mobx-react"
import SignIn from '../../components/SignIn/SignIn'

@inject("SignUpInStore") @observer
export default class SignInScene extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  buttonOnPress = () => {
    this.SignUpInStore.setUpInStatus('登入')
    Actions.Auth({ type: 'reset' })
  }

  returnOnPress = () => {
    Actions.pop()
  }

  render(){
    return(
      <SignIn
        returnOnPress={this.returnOnPress}
        bottonText='登入'
        buttonOnPress={this.buttonOnPress}
        email={this.SignUpInStore.email}
        onChangeEmail={this.SignUpInStore.onChangeEmail}
        password={this.SignUpInStore.password}
        onChangePassword={this.SignUpInStore.onChangePassword}
        warningText='忘記密碼？申請密碼重設'
      />
    )
  }
}