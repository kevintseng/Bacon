import React, { Component } from 'react'
import { View } from 'react-native'

import BaconRoutesContainer from './BaconRoutesContainer'
import BioInputContainer from './BioInputContainer'

export default class BioContainer extends Component {

  render() {
    return(
      <View style={{flex: 1}}>
        <BioInputContainer/>
        <View style={{ position: 'absolute', bottom: 0}}>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}