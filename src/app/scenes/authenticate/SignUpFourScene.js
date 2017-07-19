import React, { Component } from 'react'
import LayoutFour from '../../components/LayoutFour'
import { Actions } from "react-native-router-flux"

export default class SignUpFourScene extends Component {

  buttonOnPress = () => {
    Actions.Auth({ type: 'reset', UpInStatus: '註冊' })
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