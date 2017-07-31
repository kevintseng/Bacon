import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconForm from '../../views/BaconForm'

@inject('firebase','SignUpInStore') @observer
export default class EmailContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SignUpInStore = this.props.SignUpInStore
  }

  render() {
    return(
      <BaconForm
        iconSource={ require('../../../images/ico_reg_mail.png') } 
        placeholder='請輸入帳號(email)'
        value={ this.SignUpInStore.email }
        maxLength={ 60 } 
        onChangeText={ this.SignUpInStore.setEmail }
        onBlur={ this.SignUpInStore.checkEmail }
        keyboardType='email-address'
      />
    )
  }
}