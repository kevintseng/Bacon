import React, { Component } from 'react'
import { View, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

import ResetPasswordContainer from '../../../containers/SettingAccountScene/ResetPasswordContainer'
import LoginOutContainer from '../../../containers/SettingAccountScene/LoginOutContainer'
import DeleteAccountContainer from '../../../containers/SettingAccountScene/DeleteAccountContainer'
import DeleteModalContainer from '../../../containers/SettingAccountScene/DeleteModalContainer'

import Knife from '../../../views/Knife/Knife'

export default class SettingAccountScene extends Component {

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  render() {
    return(
      <View style={{flex: 1,alignItems: 'center'}}>
        <DeleteModalContainer/>
        <View style={{position: 'absolute',top: 30}}>
          <ResetPasswordContainer/>
        </View>

        <View style={{position: 'absolute',top: 120}}>
          <LoginOutContainer/>
        </View>

        <View style={{position: 'absolute',bottom: 120}}>
          <DeleteAccountContainer/>
        </View>

        <View style={{position: 'absolute',bottom: 0}}>
          <Knife/>
        </View>

      </View>
    )
  }
}
