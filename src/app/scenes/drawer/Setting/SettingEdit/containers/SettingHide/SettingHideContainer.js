import React, { Component } from 'react'
import { View, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

import HideContainer from './HideContainer'
import Knife from '../../../../../../views/Knife/Knife'

export default class SettingHideContainer extends Component {

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

