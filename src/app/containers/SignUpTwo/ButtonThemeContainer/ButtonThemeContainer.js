import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'
// custom components
import ButtonTheme from '../../../components/common/ButtonTheme/ButtonTheme'

@inject("SignUpInStore") @observer
export default class ButtonThemeContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }
  
  buttonOnPress = () => {
    if (this.SignUpInStore.city) {
      Actions.SignUpThree()
    } else {
      alert('請填入位置')
    }
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