import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BirthdayChoose from '../../../views/BirthdayChoose/BirthdayChoose'

@inject('SubjectEditStore') @observer
export default class BirthdayContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectEditStore = this.props.SubjectEditStore
  }

  render() {
    return(
      <BirthdayChoose
        minAge={ 18 } 
        birthday={ this.SubjectEditStore.birthday }
        onChangeBirthday={ this.SubjectEditStore.setBirthday }
      />
    )
  }
}