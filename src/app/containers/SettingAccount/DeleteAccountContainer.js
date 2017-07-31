import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import RedLineButton from '../../views/RedLineButton/RedLineButton'

@inject('firebase','SubjectStore') @observer
export default class DeleteAccountContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  deleteAccount() {
    this.firebase.database().ref("users/" + this.SubjectStore.uid + "/delete").set(true)
  }
  
  render() {
    return(
      <RedLineButton
        text='刪除帳號'
        onPress={ this.deleteAccount }
      />
    )
  }
}