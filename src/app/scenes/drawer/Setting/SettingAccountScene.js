import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'

import ResetPasswordContainer from '../../../containers/SettingAccount/ResetPasswordContainer'
import LoginOutContainer from '../../../containers/SettingAccount/LoginOutContainer'
import DeleteAccountContainer from '../../../containers/SettingAccount/DeleteAccountContainer'

import Knife from '../../../views/Knife/Knife'

export default class SettingAccountScene extends Component {

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  render() {
    return(
      <View style={{flex: 1,alignItems: 'center'}}>

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

/*
      <View>
        <Button title= '登出' onPress={ this.onPressSignOut }/>
        <Image 
          style={{ alignSelf: 'center', width: 300, height: 300 }}
          source={require('../../../../images/avatar.jpg')}       
        />
      </View>
*/
