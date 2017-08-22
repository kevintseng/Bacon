import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import RNGooglePlaces from 'react-native-google-places'

import Upgrade from '../../views/Bill/Upgrade'

@inject('SignUpStore') @observer
export default class UpgradeContainer extends Component {

  constructor(props) {
    super(props)
    // this.SignUpStore = this.props.SignUpStore
    this.state = {
      topCheck: true,
      upperCheck: false,
    }
  }

  topCheckOnPress = () => {
    this.setState({
      topCheck: !this.state.topCheck,
      upperCheck: !this.state.upperCheck,
    })
  }

  upperCheckOnPress = () => {
    this.setState({
      topCheck: !this.state.topCheck,
      upperCheck: !this.state.upperCheck,
    })
  }

  render() {
    return (
      <Upgrade
        topCheck={this.state.topCheck}
        upperCheck={this.state.upperCheck}
        topCheckOnPress={this.topCheckOnPress}
        upperCheckOnPress={this.upperCheckOnPress}
      />
    )
  }
}
