import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import GreyButton from '../../views/GreyButton/GreyButton'

@inject('firebase','SubjectStore') @observer
export default class LoginOutContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    //this.user = this.firebase.auth().currentUser
  }

  _loginOut = () => {
    this.firebase.database().ref('/online/' + this.SubjectStore.uid).once('value',snap => {
      const lastOnline = snap.val().lastOnline
      const location = snap.val().location
      this.firebase.database().ref('/online/' + this.SubjectStore.uid).remove()
      .then(() => {
        this.firebase.auth().signOut().catch( err => {
          this.firebase.database().ref('/online/' + this.SubjectStore.uid).set({
            lastOnline: lastOnline,
            location: location
          })
          console.log(err)
          alert('登出發生錯誤')
        })
      })
      .catch(err => { 
        alert('登出發生錯誤')
        console.log(err) 
      })
    })
  }

  render() {
    return(
      <GreyButton
        text='登出'
        onPress={ this._loginOut }
      />
    )
  }
}
