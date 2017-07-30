import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from '../../containers/SignUpTwo/BaconRoutesContainer'
import CityChooseContainer from '../../containers/SignUpTwo/CityChooseContainer'

const styles = {
  view: {
    flex: 1
  },
  middle: {
    position: 'absolute', 
    top: 150
  },
  bottom: {
    position: 'absolute', 
    bottom: 0
  }
}

export default class SignUpOneScene extends Component {

  render(){
    return(
      <View style={ styles.view }>

        <View style={ styles.middle }>
          <CityChooseContainer/>
        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </View>
    )
  }
}