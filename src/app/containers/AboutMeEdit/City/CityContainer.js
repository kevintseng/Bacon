import React, { Component } from 'react'
import { View } from 'react-native'

import BaconRoutesContainer from './BaconRoutesContainer'
import CityChooseContainer from './CityChooseContainer'

export default class CityContainer extends Component {

  render() {
    return(
      <View style={{flex: 1}}>
        <CityChooseContainer/>
        <View style={{ position: 'absolute', bottom: 0}}>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}