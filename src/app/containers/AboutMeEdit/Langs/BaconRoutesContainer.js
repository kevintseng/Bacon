import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import BaconRoutes from '../../../views/BaconRoutes/BaconRoutes'

export default class BaconRoutesContainer extends Component {
  
  buttonOnPress = () => {
    Actions.AboutMeTab({type: 'reset'})
  }

  render() {
    return(
      <BaconRoutes
        routesText='完成'
        routesOnPress={ this.buttonOnPress } 
      />
    )
  }
}