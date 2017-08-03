import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import StatesMessage from '../../views/StatesMessage'

@inject('SignInStore') @observer
export default class FailureConatiner extends Component {

  constructor(props) {
    super(props)
    this.SignInStore = this.props.SignInStore
  }

  render() {
    return(
      <StatesMessage
        state={ false }
        message={ this.SignInStore.signInIndicator }
      />
    )
  }
}