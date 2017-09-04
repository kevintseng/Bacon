import React, { Component } from 'react'
import { View, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

import HideContainer from '../../../containers/SettingHideScene/HideContainer'
import Knife from '../../../views/Knife/Knife'

export default class SettingHideScene extends Component {

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
      <View style={{flex: 1}}>

        <HideContainer/>

        <View style={{position: 'absolute',bottom: 0}}>
          <Knife/>
        </View>

      </View>
    )
  }
}

