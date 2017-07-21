// node modules
import React, { Component } from 'react'
import { Actions } from "react-native-router-flux"
// custom components
import SignUpTwo from '../../../components/SignUpTwo/SignUpTwo'

export default class SignUpOneScene extends Component {

  buttonOnPress = () => {
    Actions.SignUpThree()
  }

  returnOnPress = () => {
    Actions.pop()
  }

  render(){
    return(
      <SignUpTwo
        bottonText='下一步'
        buttonOnPress={this.buttonOnPress}
        returnOnPress={this.returnOnPress}
      />
    )
  }
}