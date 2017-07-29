import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"
// custom components
import ButtonTheme from '../../../components/common/ButtonTheme/ButtonTheme'

@inject("SignUpInStore") @observer
export default class ButtonThemeContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  _buttonOnPress = () => {
    this.SignUpInStore.setUpInStatus('登入')
    Actions.Auth({ type: 'reset' })
  }

  _warningOnPress = () => {

  }

  render() {
    return(
      <ButtonTheme
        buttonText='登入'
        buttonOnPress={ this._buttonOnPress } 
        warningText='忘記密碼？申請密碼重設'
        warningOnPress={ this._warningOnPress }
      />
    )
  }
}