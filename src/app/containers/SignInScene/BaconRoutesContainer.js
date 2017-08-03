import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

@inject('SignInStore') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.SignInStore = this.props.SignInStore
  }

  _buttonOnPress = () => {
    if (this.SignInStore.email && this.SignInStore.password) {
      Actions.Auth({ type: 'reset' })
    } else {
      alert('請填入資料')
    }
  }

  _warningOnPress = () => {

  }

  render() {
    return(
      <BaconRoutes
        routesText='登入'
        routesOnPress={ this._buttonOnPress } 
        warningText='忘記密碼？申請密碼重設'
        warningOnPress={ this._warningOnPress }
      />
    )
  }
}