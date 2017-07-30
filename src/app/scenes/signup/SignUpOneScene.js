import React, { Component } from 'react'
import { View } from 'react-native'

import BaconRoutesContainer from '../../containers/SignUpOne/BaconRoutesContainer'
import SexChooseContainer from '../../containers/SignUpOne/SexChooseContainer'

const styles = {
  view: {
    flex: 1
  },
  middle: {
   position: 'absolute', 
   top: 125, 
   alignSelf: 'center' 
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
          <SexChooseContainer/>
        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>
        
      </View>
    )
  }
}