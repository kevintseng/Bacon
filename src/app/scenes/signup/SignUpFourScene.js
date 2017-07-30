import React, { Component } from 'react'
import { View } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'

import BaconRoutesContainer from '../../containers/SignUpTwo/BaconRoutesContainer'
import BigAvatarContainer from '../../containers/SignUpFour/BigAvatarContainer'

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

@inject("SignUpInStore") @observer
export default class SignUpFourScene extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
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