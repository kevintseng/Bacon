import React, { Component } from 'react'
import { View } from 'react-native'

import BaconRoutesContainer from './BaconRoutesContainer'
import LangListContainer from './LangListContainer'

export default class LangsContainer extends Component {

  render() {
    return(
      <View style={{flex: 1}}>
        <View>
          <LangListContainer/>
        </View>
        <View style={{ position: 'absolute', bottom: 0}}>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}