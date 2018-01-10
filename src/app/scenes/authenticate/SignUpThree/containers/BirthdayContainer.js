import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import BirthdayChoose from '../../../../views/BirthdayChoose/BirthdayChoose'

@inject('SignUpStore') @observer
export default class BirthdayContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
  }

  render() {
    return(
      <BirthdayChoose
        minAge={18} 
        birthday={ this.SignUpStore.birthday }
        onChangeBirthday={ this.SignUpStore.setBirthday }
      />
    )
  }
}