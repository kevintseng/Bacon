// node modules
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'
// custom components
import SignUpTwo from '../../../components/SignUpTwo/SignUpTwo'

@inject("SignUpInStore") @observer
export default class SignUpOneScene extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  buttonOnPress = () => {
    Actions.SignUpThree()
  }

  render(){
    return(
      <SignUpTwo
        buttonText='下一步'
        placeholder={ this.SignUpInStore.city }
        buttonOnPress={ this.buttonOnPress }
        googleOnPress={ this.SignUpInStore.setCity }
      />
    )
  }
}