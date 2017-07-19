import React, { Component } from 'react'
import LayoutFive from '../../components/LayoutFive'
import { Actions } from "react-native-router-flux"

export default class SignInScene extends Component {

  buttonOnPress = () => {
    Actions.Auth({type: 'reset'})
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
      />
    )
  }
}