import React, { Component } from 'react'
import { View, TouchableOpacity, Text,Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import RNGooglePlaces from 'react-native-google-places'

import Bonus from '../../views/Bill/Bonus'

@inject('ControlStore') @observer
export default class BonusContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
  }

  render() {
    return(
      <Bonus
        topCheck={ this.ControlStore.bonus[200] }
        middleCheck={ this.ControlStore.bonus[600] }
        upperCheck={ this.ControlStore.bonus[1200] }
        topCheckOnPress={ this.ControlStore.pickTwoHundredBonus }
        middleCheckOnPress={ this.ControlStore.pickFiveHundredBonus }
        upperCheckOnPress={ this.ControlStore.pickOneThousandBonus }
      />
    )
  }
}
