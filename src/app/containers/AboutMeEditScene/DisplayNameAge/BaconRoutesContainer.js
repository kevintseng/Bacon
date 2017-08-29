import React, { Component } from 'react'
import { Alert } from 'react-native'
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
        Alert.alert(
          '輸入錯誤', '請輸入您的生日', [
          {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false }
        )
      }
    } else {
      Alert.alert(
        '輸入錯誤', '請輸入2~20字的暱稱', [
        {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false }
      )
    }
  }

  nicknameChecker = () => {
    if (/^[^null]{2,20}$/.test(this.SubjectEditStore.nickname)) {
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
