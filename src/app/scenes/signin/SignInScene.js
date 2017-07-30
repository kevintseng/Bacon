import React, { Component } from 'react'
import { View, Platform } from 'react-native'

import BaconRoutesContainer from '../../containers/SignInOne/BaconRoutesContainer'
import EmailContainer from '../../containers/SignInOne/EmailContainer/'
import PasswordContainer from '../../containers/SignInOne/PasswordContainer'

const styles = {
  view: {
    flex: 1
  },
  middle: {
    alignItems: 'center',
    position: 'absolute', 
    top: 110
  },
  form: {
    ...Platform.select({ 
      ios: { 
        marginTop: 10
      }, 
      android: { 
        marginTop: 5
      } 
    })
  },
  bottom: {
    position: 'absolute', 
    bottom: 0
  }
}

export default class SignInScene extends Component {

  render() {
    return(
      <View style={ styles.view }>

        <View style={ styles.middle }>

          <View style={ styles.form }>
            <EmailContainer/>
          </View>

          <View style={ styles.form }>
            <PasswordContainer/>
          </View>

        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </View>
    )
  }
}