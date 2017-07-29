// node modules
import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'
// custom components
import ButtonThemeContainer from '../../containers/SignUpTwo/ButtonThemeContainer/ButtonThemeContainer'
import CityChooseContainer from '../../containers/SignUpTwo/CityChooseContainer/CityChooseContainer'

const styles = {
  view: {
    flex: 1
  },
  middle: {
    position: 'absolute', 
    top: 150
  }
}

export default class SignUpOneScene extends Component {

  render(){
    return(
      <View style={ styles.view }>
        <View style={ styles.middle }>
          <CityChooseContainer/>
        </View>
        <ButtonThemeContainer/>
      </View>
    )
  }
}