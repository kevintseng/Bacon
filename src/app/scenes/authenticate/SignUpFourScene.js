import React, { Component } from 'react'
import { View, Platform, BackHandler, ToastAndroid } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'

import BaconRoutesContainer from '../../containers/SignUpFourScene/BaconRoutesContainer'
import BigAvatarContainer from '../../containers/SignUpFourScene/BigAvatarContainer'

const styles = {
  view: {
    flex: 1
  },
  middle: {
    position: 'absolute', 
    top: 40,
    alignSelf: 'center'
  },
  bottom: {
    position: 'absolute', 
    bottom: 0
  }
}

@inject('SignUpStore') @observer
export default class SignUpFourScene extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.SignUpThree({type: 'reset', direction: 'leftToRight'})
    return true
  }

  render(){
    return(
      <View style={ styles.view }>

        <View style={ styles.middle }>
          <BigAvatarContainer/>
        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}