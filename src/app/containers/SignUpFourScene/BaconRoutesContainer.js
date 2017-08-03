import React, { Component } from 'react'
import { Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

@inject('SignUpStore') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
  }

  _buttonOnPress = () => {
    if (this.SignUpStore.photoUrl) {
      Actions.Auth({type: 'reset'})
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