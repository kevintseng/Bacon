import React, { Component } from 'react'
import { View, TouchableOpacity, Text,Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import RNGooglePlaces from 'react-native-google-places'

import Bonus from '../../views/Bonus'

@inject('SignUpStore') @observer
export default class BonusContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
  }

  render() {
    return(
      <Bonus/>
    )
  }
}