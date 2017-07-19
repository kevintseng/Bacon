import React, { Component } from 'react'
import LayoutThree from '../../components/LayoutThree'
import { Actions } from "react-native-router-flux"

export default class SignUpThreeScene extends Component {

  buttonOnPress = () => {
    Actions.SignUpFour()
  }

  returnOnPress = () => {
    Actions.pop()
  }

  render(){
    return(
      <LayoutThree
        bottonText='最後一步'
        buttonOnPress={this.buttonOnPress}
        returnOnPress={this.returnOnPress}
      />
    )
  }
}