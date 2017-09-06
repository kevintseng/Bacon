import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconForm from '../../views/BaconForm'

@inject('SignUpStore') @observer
export default class NickNameContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
  }

  realTimeCheckNickname = str => {
    this.SignUpStore.setNickname(str)
    //this.SignUpStore.checkNickname()
  }

  render() {
    return(
      <BaconForm
        iconSource={ require('../../../images/ico_logo_nn.png') }
        placeholder='請輸入2~20字的暱稱'
        value={ this.SignUpStore.nickname }
        maxLength={ 20 }
        onChangeText={ this.realTimeCheckNickname }
        //onBlur={ this.SignUpStore.checkNickname }
      />
    )
  }
}
