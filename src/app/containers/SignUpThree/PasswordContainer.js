import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconForm from '../../views/BaconForm'

@inject('SignUpInStore') @observer
export default class PasswordContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  passwordChecker = () => {
    const passw =  /^[A-Za-z0-9]{6,10}$/;
    if (this.SignUpInStore.password.match(passw)) {
      this.SignUpInStore.setPasswordChecker(true)
      this.SignUpInStore.setPasswordStatus('此密碼可以使用')
    } else {
      this.SignUpInStore.setPasswordChecker(false)
      this.SignUpInStore.setPasswordStatus('請輸入數字或英文字母組合的6~10字密碼')
      return false    
    }
    return true
  }

  render() {
    return(
      <BaconForm
        iconSource={ require('../../../images/ico_logo_pass.png') } 
        placeholder='請輸入6-10字英數密碼組合'
        value={ this.SignUpInStore.password }
        maxLength={ 12 } 
        onChangeText={ this.SignUpInStore.setPassword }
        onBlur={ this.passwordChecker }
      />
    )
  }
}