import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"
// custom components
import BirthdayChoose from '../../../components/common/BirthdayChoose/BirthdayChoose'

@inject("SignUpInStore") @observer
export default class BirthdayChooseContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  maxDate() {
    const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    return(
      maxDate.toISOString().substring(0, 10)
    )
  }

  render() {
    return(
      <BirthdayChoose
        maxDate={ this.maxDate() } 
        birthday={ this.SignUpInStore.birthday }
        onChangeBirthday={ this.SignUpInStore.setBirthday }
      />
    )
  }
}