import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconForm from '../../../views/BaconForm'

@inject('SubjectEditStore') @observer
export default class DisplayNameContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectEditStore = this.props.SubjectEditStore
  }

  render() {
    return(
      <BaconForm
        iconSource={ require('../../../../images/ico_logo_nn.png') } 
        placeholder='請輸入2~6字的暱稱'
        value={ this.SubjectEditStore.nickname }
        maxLength={ 6 } 
        onChangeText={ this.SubjectEditStore.setNickname }
        //onBlur={ this.SignUpInStore.checkDisplayName }
      />
    )
  }
}