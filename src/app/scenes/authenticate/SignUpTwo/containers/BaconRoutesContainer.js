import React, { Component } from 'react'
import { Alert } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import BaconRoutes from '../../../../views/BaconRoutes/BaconRoutes'

@inject('SignUpStore') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
  }
  
  buttonOnPress = () => {
    if (this.SignUpStore.address) {
      Actions.SignUpThree({type: 'reset'})
    } else {
      Alert.alert( 
        '輸入錯誤', '請輸入所在位置', [ 
        {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } 
      )
    }
  }

  render() {
    return(
      <BaconRoutes
        routesText='下一步'
        routesOnPress={ this.buttonOnPress } 
      />
    )
  }
}