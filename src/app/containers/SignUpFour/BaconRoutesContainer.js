import React, { Component } from 'react'
import { Alert } from 'react-native'
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
    if (this.SignUpInStore.photoURL) {
      Actions.Auth()
    } else {
      Alert.alert( 
        '輸入錯誤', '請上傳一張大頭照', [ 
        {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } 
      )
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