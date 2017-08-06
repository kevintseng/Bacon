import React, { Component } from 'react'
import { Alert } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

@inject('firebase','PasswordStore') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.PasswordStore = this.props.PasswordStore
    this.firebase = this.props.firebase
  }

  _buttonOnPress = () => {
    this.firebase.auth().sendPasswordResetEmail(this.PasswordStore.email).then(() => {
      alert('密碼重置信件已寄出')
    }).catch(error => {
      alert(error)
    });

  }

  _warningOnPress = () => {

  }

  render() {
    return(
      <BaconRoutes
        routesText='送出'
        routesOnPress={ this._buttonOnPress } 
      />
    )
  }
}