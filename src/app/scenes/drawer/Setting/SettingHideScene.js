import React, { Component } from 'react'
//import { View, Image, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from "mobx-react"

import SettingHide from '../../../components/SettingHide/SettingHide'


@inject("firebase","SubjectStore") @observer
export default class SettingHideScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  render() {
    return(
      <SettingHide
        flatListData={
          [
            { switchText: '在邂逅中看不到我', switchValue: this.SubjectStore.hideMeetCute, switchonValueChange: this.SubjectStore.setHideMeetCute },
            { switchText:'在巧遇中看不到我', switchValue: this.SubjectStore.hideMeetChance, switchonValueChange: this.SubjectStore.setHideMeetChance },
            { switchText:'對方看不到我的來訪', switchValue: this.SubjectStore.hideVister, switchonValueChange: this.SubjectStore.setHideVister },
            { switchText:'隱藏我的訊息已讀狀態', switchValue: this.SubjectStore.hideMessage, switchonValueChange: this.SubjectStore.setHideMessage }
          ]
        }
      />
    )
  }
}

