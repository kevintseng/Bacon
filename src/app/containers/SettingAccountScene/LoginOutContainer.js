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
    this.firebase.auth().signOut()
    this.setOffline(this.user.uid)
  }

  setOffline(uid) {
    this.firebase.database().ref(`/online/${uid}`).remove()
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
