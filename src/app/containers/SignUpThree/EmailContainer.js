import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconForm from '../../views/BaconForm'
import { emailFormatChecker } from '../../Utils'

@inject('firebase','SignUpInStore') @observer
export default class EmailContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SignUpInStore = this.props.SignUpInStore
  }

  emailChecker = () => {
    if (emailFormatChecker(this.SignUpInStore.email)) {
      this.firebase.auth().fetchProvidersForEmail(this.SignUpInStore.email).then( providers => {
        if (providers.length === 0) {
          this.SignUpInStore.setEmailChecker(true)
          this.SignUpInStore.setEmailStatus('此帳號可以使用')
          return true
        } else {
          this.SignUpInStore.setEmailChecker(false)
          this.SignUpInStore.setEmailStatus('此帳號已註冊')
          return false
        }
      }).catch((err) => {
        this.SignUpInStore.setEmailChecker(false)
        this.SignUpInStore.setEmailStatus('無法檢查帳號')
        return false
      })
    } else {
      this.SignUpInStore.setEmailChecker(false)
      this.SignUpInStore.setEmailStatus('帳號格式錯誤')
      return false 
    }
  }

  render() {
    return(
      <BaconForm
        iconSource={ require('../../../images/ico_reg_mail.png') } 
        placeholder='請輸入帳號(email)'
        value={ this.SignUpInStore.email }
        maxLength={ 60 } 
        onChangeText={ this.SignUpInStore.setEmail }
        onBlur={ this.emailChecker }
      />
    )
  }
}