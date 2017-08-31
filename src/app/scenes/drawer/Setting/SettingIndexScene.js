import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'

import AboutContainer from '../../../containers/SettingIndexScene/AboutContainer'
import AccountContainer from '../../../containers/SettingIndexScene/AccountContainer'
import RemindContainer from '../../../containers/SettingIndexScene/RemindContainer'
import HideContainer from '../../../containers/SettingIndexScene/HideContainer'

import Knife from '../../../views/Knife/Knife'

export default class SettingIndexScene extends Component {

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

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