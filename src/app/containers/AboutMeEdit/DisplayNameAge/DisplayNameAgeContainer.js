import React, { Component } from 'react'
import { View } from 'react-native'

import BaconRoutesContainer from './BaconRoutesContainer'
import DisplayNameContainer from './DisplayNameContainer'
import BirthdayContainer from './BirthdayContainer'

export default class DisplayNameAgeContainer extends Component {

  render() {
    return(
      <View style={{flex: 1}}>
        <DisplayNameContainer/>
        <BirthdayContainer/>
        <View style={{ position: 'absolute', bottom: 0}}>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}