import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
// custom components
import ButtonTheme from '../../../components/common/ButtonTheme/ButtonTheme'

export default class ButtonThemeContainer extends Component {

  buttonOnPress = () => {
    Actions.SignUpTwo()
  }

  render() {
    return(
      <ButtonTheme
        buttonText='下一步'
        buttonOnPress={ this.buttonOnPress } 
      />
    )
  }
}