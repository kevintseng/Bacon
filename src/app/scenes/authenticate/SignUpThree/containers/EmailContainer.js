import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconForm from '../../../../views/BaconForm'

@inject('SignUpStore') @observer
export default class EmailContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
  }

  realTimeCheckEmail = str => {
    this.SignUpStore.setEmail(str)
    //this.SignUpStore.checkEmail()
  }

  render() {
    return(
      <BaconForm
        iconSource={ require('../../../../../images/ico_reg_mail.png') } 
        placeholder='請輸入帳號(email)'
        value={ this.SignUpStore.email }
        maxLength={ 30 } 
        onChangeText={ this.realTimeCheckEmail }
        //onBlur={ this.SignUpStore.checkEmail }
        keyboardType='email-address'
      />
    )
  }
}