import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconRoutes from '../../../views/BaconRoutes/BaconRoutes'

@inject('firebase','SubjectStore','SubjectEditStore') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.SubjectEditStore = this.props.SubjectEditStore
  }

  _buttonOnPress = () => {
    if (this.nicknameChecker()) {
      if (this.birthdayChecker()) {
        this.firebase.database().ref('users/' + this.SubjectStore.uid + '/nickname').set(this.SubjectEditStore.nickname)
        this.firebase.database().ref('users/' + this.SubjectStore.uid + '/birthday').set(this.SubjectEditStore.birthday)
        this.SubjectStore.setNickname(this.SubjectEditStore.nickname)
        this.SubjectStore.setBirthday(this.SubjectEditStore.birthday)
        Actions.AboutMeTab({type: 'reset'})
      } else {
        alert('請輸入生日資料')
      }
    } else {
      alert('請輸入2~6字暱稱')
    }
  }

  nicknameChecker = () => {
    if (/^[^null]{2,6}$/.test(this.SubjectEditStore.nickname)) {
      return true
    }
    return false
  }

  birthdayChecker = () => {
    if (this.SubjectEditStore.birthday) {
      return true 
    }
    return false
  }

  render() {
    return(
      <BaconRoutes
        routesText='完成'
        routesOnPress={ this._buttonOnPress } 
      />
    )
  }
}