import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconForm from '../../views/BaconForm'

@inject("SignUpInStore") @observer
export default class PasswordContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  render() {
    return(
      <BaconForm
        iconSource={ require('../../../images/ico_logo_pass.png') } 
        placeholder='請輸入6-10字英數密碼組合'
        value={ this.SignUpInStore.password }
        maxLength={ 12 } 
        onChangeText={ this.SignUpInStore.setPassword }
      />
    )
  }
}