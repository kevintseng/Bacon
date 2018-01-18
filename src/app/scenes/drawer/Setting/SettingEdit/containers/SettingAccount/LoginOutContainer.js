import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import GreyButton from '../../../../../../views/GreyButton/GreyButton'

@inject('firebase','SubjectStore') @observer
export default class LoginOutContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    //this.user = this.firebase.auth().currentUser
  }

  _loginOut = () => {
    this.firebase.auth().signOut().catch( err => {
      alert('登出發生錯誤 :' + err)
    })
    /*
    this.firebase.database().ref('/online/' + this.SubjectStore.uid).once('value',snap => {
      const lastOnline = snap.val().lastOnline
      const location = snap.val().location
      this.firebase.database().ref('/users/' + this.SubjectStore.uid + '/online').set(false)
      this.firebase.database().ref('/users/' + this.SubjectStore.uid).once('value',snap => {
        const lastOnlineTime = snap.val().onlineTime || 0
        this.firebase.database().ref('/online/' + this.SubjectStore.uid).once('value',snap => {
          const lastOnline = snap.val().lastOnline || 0
          const onlineTime = Math.floor(Date.now() / 1000) - lastOnline
          this.firebase.database().ref('/users/' + this.SubjectStore.uid + '/onlineTime').set(lastOnlineTime + onlineTime)
          this.firebase.database().ref('/online/' + this.SubjectStore.uid).remove().catch(err => { console.log(err) })
        })
      })
      .then(() => {
        this.firebase.auth().signOut().catch( err => {
          this.firebase.database().ref('/online/' + this.SubjectStore.uid).set({
            lastOnline: lastOnline,
            location: location
          })
          this.firebase.database().ref('/users/' + this.SubjectStore.uid + '/online').set(true)
          this.firebase.database().ref('/users/' + this.SubjectStore.uid).once('value',snap => {
            const lastOnlineTime = snap.val().onlineTime || 0
            this.firebase.database().ref('/users/' + this.SubjectStore.uid + '/onlineTime').set(lastOnlineTime - 1000)
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
    */
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
