import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import GreyButton from '../../views/GreyButton/GreyButton'

@inject('firebase') @observer
export default class LoginOutContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
  }

  _loginOut = () => {
    this.firebase.auth().signOut()
  }
  
  render() {
    return(
      <GreyButton
        text='登出'
        onPress={ this._loginOut }
      />
    )
  }
}