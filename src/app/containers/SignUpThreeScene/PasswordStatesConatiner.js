import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import StatesMessage from '../../views/StatesMessage'

@inject('SignUpStore') @observer
export default class PasswordStatesConatiner extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
  }

  render() {
    return(
      <StatesMessage
        state={ this.SignUpStore.passwordDetector }
        message={ this.SignUpStore.passwordIndicator }
      />
    )
  }
}