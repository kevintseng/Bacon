import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconForm from '../../../views/BaconForm'

@inject('SignUpInStore') @observer
export default class BioInputContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  render() {
    return(
      <BaconForm
        //iconSource={ require('../../../../images/ico_logo_nn.png') } 
        placeholder='請輸入自我介紹'
        value={ this.SignUpInStore.bio }
        maxLength={ 500 } 
        onChangeText={ this.SignUpInStore.setBio }
        //onBlur={ this.SignUpInStore.checkDisplayName }
      />
    )
  }
}