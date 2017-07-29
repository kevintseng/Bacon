import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"
// custom components
import BaconForm from '../../../components/common/BaconForm/BaconForm'

@inject("SignUpInStore") @observer
export default class EmailInputContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  render() {
    return(
      <BaconForm
        iconSource={ require('./img/ico_reg_mail.png') } 
        placeholder='請輸入帳號(email)'
        value={ this.SignUpInStore.email }
        maxLength={ 60 } 
        onChangeText={ this.SignUpInStore.setEmail }
      />
    )
  }
}