import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

export default class BaconRoutesContainer extends Component {

  buttonOnPress = () => {
    Actions.Auth()
  }

  render() {
    return(
      <BaconRoutes
        routesText='開始使用'
        routesOnPress={ this._buttonOnPress } 
      />
    )
  }
}