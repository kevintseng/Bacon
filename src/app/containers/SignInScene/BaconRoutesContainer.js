import React, { Component } from 'react'
import { Alert } from 'react-native'
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
      Alert.alert( 
        '輸入錯誤', '請確認已填入帳號與密碼', [ 
          {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } 
        )
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