import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"
// custom components
import BaconForm from '../../../components/common/BaconForm/BaconForm'

@inject("SignUpInStore") @observer
export default class PasswordInputContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  render() {
    return(
      <BaconForm
        iconSource={ require('./img/ico_logo_pass.png') } 
        placeholder='請輸入6-10字英數密碼組合'
        value={ this.SignUpInStore.password }
        maxLength={ 12 } 
        onChangeText={ this.SignUpInStore.setPassword }
      />
    )
  }
}