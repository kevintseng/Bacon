import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

export default class BaconRoutesContainer extends Component {

  goToBonus= () => {
    Actions.Bonus()
  }


  render() {
    return(
      <BaconRoutes
        routesText='使用Q點'
        routesOnPress={ this.goToBonus } 
      />
    )
  }
}