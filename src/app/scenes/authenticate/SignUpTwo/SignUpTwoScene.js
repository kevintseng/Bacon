import React, { Component } from 'react'
import { View, Platform, BackHandler, ToastAndroid, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'

import BaconRoutesContainer from './containers/BaconRoutesContainer'
import CityChooseContainer from './containers/CityChooseContainer'

const { width, height } = Dimensions.get('window')

const styles = {
  view: {
    flex: 1,
    alignItems: 'center', 
  },
  middle: {
    position: 'absolute',
    top: height == 480 ? 20 : 150,
    alignSelf: 'center'
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
