import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import RNGooglePlaces from 'react-native-google-places'

import Upgrade from '../../views/Bill/Upgrade'

@inject('ControlStore') @observer
export default class UpgradeContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    //this.state = {
    //  topCheck: true,
    //  upperCheck: false,
    //}
  }

  topCheckOnPress = () => {
    this.ControlStore.pickThreeMonthUpfrade()
    //this.setState({
    //  topCheck: !this.state.topCheck,
    //  upperCheck: !this.state.upperCheck,
    //})
  }

  upperCheckOnPress = () => {
    this.ControlStore.pickOneYearUpfrade()
    //this.setState({
    //  topCheck: !this.state.topCheck,
    //  upperCheck: !this.state.upperCheck,
    //})
  }

  render() {
    return (
      <Upgrade
        topCheck={ this.ControlStore.upgrade['3_month'] }
        upperCheck={ this.ControlStore.upgrade['1_year'] }
        topCheckOnPress={this.topCheckOnPress}
        upperCheckOnPress={this.upperCheckOnPress}
      />
    )
  }
}
