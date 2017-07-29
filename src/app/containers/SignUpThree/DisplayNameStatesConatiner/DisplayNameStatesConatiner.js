import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"
// custom components
import StatesMessage from '../../../components/common/StatesMessage/StatesMessage'

@inject("SignUpInStore") @observer
export default class DisplayNameStatesConatiner extends Component {

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