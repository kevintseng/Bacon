import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import StatesMessage from '../../views/StatesMessage'

@inject("SignUpInStore") @observer
export default class EmailStatesConatiner extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  render() {
    return(
      <StatesMessage
        state={ true }
        message={ 'this.setCheck' }
      />
    )
  }
}