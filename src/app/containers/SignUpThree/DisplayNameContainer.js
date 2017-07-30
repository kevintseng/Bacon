import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconForm from '../../views/BaconForm'

@inject("SignUpInStore") @observer
export default class DisplayNameContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  displayNameChecker = () => {
    if (this.SignUpInStore.displayName.length < 2) {
      this.SignUpInStore.setDisplayNameChecker(false)
      this.SignUpInStore.setDisplayNameStatus('請輸入2個字以上的暱稱')
    } else {
      this.SignUpInStore.setDisplayNameChecker(true)
      this.SignUpInStore.setDisplayNameStatus('此暱稱可以使用')
      return true     
    }
    return false   
  }

  render() {
    return(
      <BaconForm
        iconSource={ require('../../../images/ico_logo_nn.png') } 
        placeholder='請輸入2個字以上的暱稱'
        value={ this.SignUpInStore.displayName }
        maxLength={ 10 } 
        onChangeText={ this.SignUpInStore.setDisplayName }
        onBlur={ this.displayNameChecker }
      />
    )
  }
}