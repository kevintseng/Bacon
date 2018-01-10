import React, { Component } from 'react'
import { View, Platform, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

//import BaconArrow from '../../views/BaconArrow/BaconArrow'
import EmailContainer from './containers/EmailContainer/'
import BaconRoutesContainer from './containers/BaconRoutesContainer'

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
          <EmailContainer/>
        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}