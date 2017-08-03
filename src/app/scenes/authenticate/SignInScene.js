import React, { Component } from 'react'
import { View, Platform, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

import BaconArrow from '../../views/BaconArrow/BaconArrow'

import BaconRoutesContainer from '../../containers/SignInScene/BaconRoutesContainer'
import EmailContainer from '../../containers/SignInScene/EmailContainer/'
import PasswordContainer from '../../containers/SignInScene/PasswordContainer'

import FailureConatiner from '../../containers/SignInScene/FailureConatiner'

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

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.Welcome({type: 'reset', direction: 'leftToRight'})
    return true
  }

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

          <View>
            <FailureConatiner/>
          </View>
        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </View>
    )
  }
}