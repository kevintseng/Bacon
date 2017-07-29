// node modules
import React, { Component } from 'react'
import { View } from 'react-native'
// custom components
import ButtonThemeContainer from '../../containers/SignUpOne/ButtonThemeContainer/ButtonThemeContainer'
import SexChooseContainer from '../../containers/SignUpOne/SexChooseContainer/SexChooseContainer'

const styles = {
  view: {
    flex: 1
  },
  middle: {
   position: 'absolute', 
   top: 125, 
   alignSelf: 'center' 
  }
}

export default class SignUpOneScene extends Component {
  
  render(){
    return(
      <View style={ styles.view }>
        <View style={ styles.middle }>
          <SexChooseContainer/>
        </View>
        <ButtonThemeContainer/>
      </View>
    )
  }
}