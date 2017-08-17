import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import GreyButton from '../../views/GreyButton/GreyButton'

@inject('firebase') @observer
export default class LoginOutContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.user = this.firebase.auth().currentUser
  }

  _loginOut = () => {
    this.firebase.auth().signOut().catch( err => {
      console.log(err)
      alert('登出發生錯誤')
    })
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
