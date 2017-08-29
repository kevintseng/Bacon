import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconForm from '../../../views/BaconForm'

@inject('SubjectEditStore','SubjectStore') @observer
export default class DisplayNameContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore  
  }

  componentWillMount() {
    this.SubjectEditStore.setNickname(this.SubjectStore.nickname)      
  }

  render() {
    return(
      <BaconForm
        iconSource={ require('../../../../images/ico_logo_nn.png') }
        placeholder='請輸入2~20字的暱稱'
        value={ this.SubjectEditStore.nickname }
        maxLength={ 20 }
        onChangeText={ this.SubjectEditStore.setNickname }
        //onBlur={ this.SignUpInStore.checkDisplayName }
      />
    )
  }
}
