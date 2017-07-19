import React, { Component } from 'react'
import { inject } from "mobx-react"
import { Actions } from "react-native-router-flux"
import LayoutFour from '../../components/LayoutFour'

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
      <LayoutFour
        bottonText='開始使用'
        buttonOnPress={this.buttonOnPress}
        returnOnPress={this.returnOnPress}
      />
    )
  }
}