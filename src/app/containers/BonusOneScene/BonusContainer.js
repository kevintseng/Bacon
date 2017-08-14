import React, { Component } from 'react'
import { View, TouchableOpacity, Text,Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import RNGooglePlaces from 'react-native-google-places'

import Bonus from '../../views/Bill/Bonus'

@inject('SignUpStore') @observer
export default class BonusContainer extends Component {

  constructor(props) {
    super(props)
    this.state={
      topCheck: true,
      middleCheck: false,
      upperCheck: false
    }
  }

  topCheckOnPress = () => {
    this.setState({
      topCheck: true,
      middleCheck: false,
      upperCheck: false
    })
  }

  middleCheckOnPress = () => {
    this.setState({
      topCheck: false,
      middleCheck: true,
      upperCheck: false
    })    
  }

  upperCheckOnPress = () => {
    this.setState({
      topCheck: false,
      middleCheck: false,
      upperCheck: true
    })    
  }

  render() {
    return(
      <Bonus
        topCheck={ this.state.topCheck }
        middleCheck={ this.state.middleCheck }
        upperCheck={ this.state.upperCheck }
        topCheckOnPress={ this.topCheckOnPress }
        middleCheckOnPress={ this.middleCheckOnPress }
        upperCheckOnPress={ this.upperCheckOnPress }
      />
    )
  }
}