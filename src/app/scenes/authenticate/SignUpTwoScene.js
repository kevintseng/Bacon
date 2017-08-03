import React, { Component } from 'react'
import { View, Platform, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

import BaconRoutesContainer from '../../containers/SignUpTwoScene/BaconRoutesContainer'
import CityChooseContainer from '../../containers/SignUpTwoScene/CityChooseContainer'

const styles = {
  view: {
    flex: 1
  },
  middle: {
    position: 'absolute', 
    top: 150
  },
  bottom: {
    position: 'absolute', 
    bottom: 0
  }
}

export default class SignUpOneScene extends Component {

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.SignUpOne({type: 'reset', direction: 'leftToRight'})
    return true
  }
  
  render() {
    return(
      <View style={ styles.view }>
        <View style={ styles.middle }>
          <CityChooseContainer/>
        </View>
        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}