import React, { Component } from 'react'
import { View, Platform, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

//import BaconArrow from '../../views/BaconArrow/BaconArrow'
import EmailContainer from '../../containers/PasswordScene/EmailContainer/'
import BaconRoutesContainer from '../../containers/PasswordScene/BaconRoutesContainer'

const styles = {
  view: {
    flex: 1
  },
  middle: {
    alignItems: 'center',
    position: 'absolute', 
    top: 150
  },
  bottom: {
    position: 'absolute', 
    bottom: 0
  }
}

export default class PasswordScene extends Component {

  render() {
    return(
      <View style={ styles.view }>

        <View style={ styles.middle }>
          <EmailContainer/>
        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}