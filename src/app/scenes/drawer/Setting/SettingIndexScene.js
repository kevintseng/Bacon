import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'

import AboutContainer from '../../../containers/SettingIndex/AboutContainer'
import AccountContainer from '../../../containers/SettingIndex/AccountContainer'
import RemindContainer from '../../../containers/SettingIndex/RemindContainer'
import HideContainer from '../../../containers/SettingIndex/HideContainer'

import Knife from '../../../views/Knife/Knife'

export default class SettingIndexScene extends Component {

  render() {
    return(
      <View style={{flex: 1}}>

        <View style={{flexDirection: 'row',justifyContent: 'space-around',marginTop: 50}}>
          <AboutContainer/>
          <AccountContainer/>
        </View>

        <View style={{flexDirection: 'row',justifyContent: 'space-around', marginTop: 30}}>
          <RemindContainer/>
          <HideContainer/>
        </View>

        <View style={{position: 'absolute',bottom: 0}}>
          <Knife/>
        </View>

      </View>
    )
  }
}