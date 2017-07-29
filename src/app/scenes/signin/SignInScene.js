import React, { Component } from 'react'
import { View, Platform } from 'react-native'

import ButtonThemeContainer from '../../containers/SignInOne/ButtonThemeContainer/ButtonThemeContainer'
import EmailInputContainer from '../../containers/SignInOne/EmailInputContainer/EmailInputContainer'
import PasswordInputContainer from '../../containers/SignInOne/PasswordInputContainer/PasswordInputContainer'

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
  }
}

export default class SignInScene extends Component {

  render() {
    return(
      <View style={ styles.view }>
        <View style={ styles.middle }>
          <View style={ styles.form }>
            <EmailInputContainer/>
          </View>
          <View style={ styles.form }>
            <PasswordInputContainer/>
          </View>
        </View>
        <ButtonThemeContainer/>
      </View>
    )
  }
}