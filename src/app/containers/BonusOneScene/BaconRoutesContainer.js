import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
  }
  
  buttonOnPress = () => {
    Actions.BonusTwo()
  }

  render() {
    return(
      <BaconRoutes
        routesText='下一步'
        routesOnPress={ this.buttonOnPress } 
      />
    )
  }
}