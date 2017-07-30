import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

@inject('SignUpInStore') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }


  _buttonOnPress = () => {
    if (this.allChecker()) {
      if (this.birthdayChecker()) {
        if (this.SignUpInStore.policyChecker) {
          Actions.SignUpFour()
        } else {
          alert('請確認同意隱私權政策及服務條款')
        }
      } else {
        alert('請填入生日資料')
      }
    } else {
      alert('請再檢查一次輸入資料')
    }
  }

  allChecker = () => {
    if (this.SignUpInStore.emailChecker && this.SignUpInStore.passwordChecker && this.SignUpInStore.displayNameChecker) {
      return true
    }
    return false
  }

  birthdayChecker = () => {
    if (this.SignUpInStore.birthday) {
      return true 
    }
    return false
  }

  render() {
    return(
      <BaconRoutes
        routesText='下一步'
        routesOnPress={ this._buttonOnPress } 
      />
    )
  }
}