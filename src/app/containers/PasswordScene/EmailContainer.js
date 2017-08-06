import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import BaconForm from '../../views/BaconForm'

@inject('PasswordStore') @observer
export default class EmailContainer extends Component {

  constructor(props) {
    super(props)
    this.PasswordStore = this.props.PasswordStore
  }

  render() {
    return(
      <BaconForm
        iconSource={ require('../../../images/ico_reg_mail.png') } 
        placeholder='請輸入帳號(email)'
        value={ this.PasswordStore.email }
        maxLength={ 30 } 
        onChangeText={ this.PasswordStore.setEmail }
        keyboardType='email-address'
      />
    )
  }
}