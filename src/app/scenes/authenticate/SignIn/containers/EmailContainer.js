import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import BaconForm from '../../../../views/BaconForm'

@inject('SignInStore') @observer
export default class EmailContainer extends Component {

  constructor(props) {
    super(props)
    this.SignInStore = this.props.SignInStore
  }

  render() {
    return(
      <BaconForm
        iconSource={ require('../../../../../images/ico_reg_mail.png') } 
        placeholder='請輸入帳號(email)'
        value={ this.SignInStore.email }
        maxLength={ 30 } 
        onChangeText={ this.SignInStore.setEmail }
        keyboardType='email-address'
      />
    )
  }
}