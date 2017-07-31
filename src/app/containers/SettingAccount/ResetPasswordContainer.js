import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BlankButton from '../../views/BlankButton/BlankButton'

@inject("SignUpInStore") @observer
export default class ResetPasswordContainer extends Component {

  resetPassword() {
    alert('密碼重設')
  }
  
  render() {
    return(
      <BlankButton
        text='申請密碼重設'
        onPress={ this.resetPassword }
      />
    )
  }
}