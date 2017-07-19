import React, { Component } from 'react'
import { Actions } from "react-native-router-flux"
import { inject, observer } from "mobx-react"
import LayoutFive from '../../components/LayoutFive'

@inject("SignUpInStore") @observer
export default class SignInScene extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  buttonOnPress = () => {
    Actions.Auth({ type: 'reset', UpInStatus: '登入' })
  }

  returnOnPress = () => {
    Actions.pop()
  }

  render(){
    return(
      <LayoutFive
        bottonText='登入'
        subTitle='忘記密碼？申請密碼重設'
        buttonOnPress={this.buttonOnPress}
        returnOnPress={this.returnOnPress}
        email={this.SignUpInStore.email}
        onChangeEmail={this.SignUpInStore.onChangeEmail}
        password={this.SignUpInStore.password}
        onChangePassword={this.SignUpInStore.onChangePassword}
      />
    )
  }
}