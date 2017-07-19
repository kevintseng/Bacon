import React, { Component } from 'react'
import LayoutTwo from '../../components/LayoutTwo'
import { Actions } from "react-native-router-flux"

export default class SignUpOneScene extends Component {

  buttonOnPress = () => {
    Actions.SignUpThree()
  }

  returnOnPress = () => {
    Actions.pop()
  }

  render(){
    return(
      <LayoutTwo
        bottonText='下一步'
        buttonOnPress={this.buttonOnPress}
        returnOnPress={this.returnOnPress}
      />
    )
  }
}