import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'

import HideContainer from '../../../containers/SettingHide/HideContainer'
import Knife from '../../../views/Knife/Knife'

export default class SettingHideScene extends Component {

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  render() {
    return(
      <View style={{flex: 1}}>

        <HideContainer/>

        <View style={{position: 'absolute',bottom: 0}}>
          <Knife/>
        </View>

      </View>
    )
  }
}

