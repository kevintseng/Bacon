import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
// custom components
import ButtonTheme from '../../../components/common/ButtonTheme/ButtonTheme'

export default class ButtonThemeContainer extends Component {

  buttonOnPress = () => {
    Actions.Auth()
  }

  render() {
    return(
      <ButtonTheme
        buttonText='開始使用'
        buttonOnPress={ this.buttonOnPress } 
      />
    )
  }
}