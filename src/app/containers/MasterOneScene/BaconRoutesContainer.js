import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

export default class BaconRoutesContainer extends Component {

  buttonOnPress = () => {
    //Actions.SignUpTwo({type: 'reset'})
    //Alert('去預約時間')
  }

  render() {
    return(
      <BaconRoutes
        routesText='確認'
        routesOnPress={ this.buttonOnPress } 
      />
    )
  }
}