import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BlankButton from '../../../../../../views/BlankButton/BlankButton'

@inject('ControlStore') @observer
export default class ResetPasswordContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
  }
  
  render() {
    return(
      <BlankButton
        text='申請密碼重設'
        onPress={ this.ControlStore.setPasswordResetModal }
      />
    )
  }
}