// node modules
import React, { Component } from 'react'
import { Actions } from "react-native-router-flux"
import { inject, observer } from "mobx-react"
// custom components
import SignUpThree from '../../../components/SignUpThree/SignUpThree'

@inject("SignUpInStore") @observer
export default class SignUpThreeScene extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  buttonOnPress = () => {
    Actions.SignUpFour()
  }

  returnOnPress = () => {
    Actions.pop()
  }

  render(){
    return(
      <SignUpThree
        bottonText='最後一步'
        buttonOnPress={ this.buttonOnPress }
        returnOnPress={ this.returnOnPress }
        email={ this.SignUpInStore.email }
        onChangeEmail={ this.SignUpInStore.onChangeEmail }
        password={ this.SignUpInStore.password }
        onChangePassword={ this.SignUpInStore.onChangePassword }
        displayName={ this.SignUpInStore.displayName }
        onChangeDisplayName={ this.SignUpInStore.onChangeDisplayName }
      />
    )
  }
}