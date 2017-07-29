import React, { Component } from 'react'
import { View } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'

import ButtonThemeContainer from '../../containers/SignUpFour/ButtonThemeContainer/ButtonThemeContainer'
import BigAvatarContainer from '../../containers/SignUpFour/BigAvatarContainer/BigAvatarContainer'

@inject("SignUpInStore") @observer
export default class SignUpFourScene extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  render(){
    return(
      <View style={{flex: 1}}>
        <BigAvatarContainer/>
        <ButtonThemeContainer/>
      </View>
    )
  }
}