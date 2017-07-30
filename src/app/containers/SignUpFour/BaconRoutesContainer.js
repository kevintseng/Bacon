import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

@inject('SignUpInStore') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  _buttonOnPress = () => {
    if (this.SignUpInStore.birthday) {
      Actions.Auth()
    } else {
      alert('請上傳一張大頭照')
    }
  }

  render() {
    return(
      <BaconRoutes
        routesText='開始使用'
        routesOnPress={ this._buttonOnPress } 
      />
    )
  }
}