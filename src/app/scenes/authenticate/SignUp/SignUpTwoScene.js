// node modules
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'
// custom components
import SignUpTwo from '../../../components/scenes/SignUpTwo/SignUpTwo'

@inject("SignUpInStore") @observer
export default class SignUpOneScene extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  buttonOnPress = () => {
    if (this.SignUpInStore.city) {
      Actions.SignUpThree()
    } else {
      alert('請填入位置')
    }
  }

  render(){
    return(
      <SignUpTwo
        buttonText='下一步'
        buttonOnPress={ this.buttonOnPress }
        placeholder='請輸入所在位置'
        googleOnPress={ this.SignUpInStore.setGoogleCity }
        value={ this.SignUpInStore.city }
        onChangeText={ this.SignUpInStore.setTextInputCity }
      />
    )
  }
}