import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import BaconForm from '../../views/BaconForm'

@inject('SignUpStore') @observer
export default class PasswordContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
  }

  realTimeCheckPassword = str => {
    this.SignUpStore.setPassword(str)
    //this.SignUpStore.checkPassword()
  }

  render() {
    return(
      <BaconForm
        iconSource={ require('../../../images/ico_logo_pass.png') } 
        placeholder='請輸入6-12字英數密碼組合'
        value={ this.SignUpStore.password }
        maxLength={ 12 } 
        onChangeText={ this.realTimeCheckPassword }
        //onBlur={ this.SignUpStore.checkPassword }
        secureTextEntry
      />
    )
  }
}