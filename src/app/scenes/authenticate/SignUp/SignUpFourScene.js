import React, { Component } from 'react'
import { inject } from "mobx-react"
import { Actions } from "react-native-router-flux"
import SignUpFour from '../../../components/SignUpFour/SignUpFour'

@inject("SignUpInStore")
export default class SignUpFourScene extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  buttonOnPress = () => {
    this.SignUpInStore.setUpInStatus('註冊')
    Actions.Auth({ type: 'reset' })
  }

  returnOnPress = () => {
    Actions.pop()
  }

  render(){
    return(
      <SignUpFour
        bottonText='開始使用'
        topBottonText='新增個人照片一張'
        buttonOnPress={this.buttonOnPress}
        returnOnPress={this.returnOnPress}
      />
    )
  }
}