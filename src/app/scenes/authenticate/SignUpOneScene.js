import React, { Component } from 'react'
import LayoutOne from '../../components/LayoutOne'
import { Actions } from "react-native-router-flux"

export default class SignUpOneScene extends Component {

  buttonOnPress = () => {
    Actions.SignUpTwo()
  }

  returnOnPress = () => {
    Actions.pop()
  }

  render(){
    return(
      <LayoutOne
        bottonText='下一步'
        buttonOnPress={this.buttonOnPress}
        returnOnPress={this.returnOnPress}
      />
    )
  }
}