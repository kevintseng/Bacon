import React, { Component } from 'react'
//import { View, Image, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from "mobx-react"

import SettingHide from '../../../components/scenes/SettingHide/SettingHide'


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
            { key: '在邂逅中看不到我', switchText: '在邂逅中看不到我', switchValue: this.SubjectStore.hideMeetCute, switchonValueChange: this.SubjectStore.setHideMeetCute },
            { key: '在巧遇中看不到我', switchText:'在巧遇中看不到我', switchValue: this.SubjectStore.hideMeetChance, switchonValueChange: this.SubjectStore.setHideMeetChance },
            { key: '對方看不到我的來訪', switchText:'對方看不到我的來訪', switchValue: this.SubjectStore.hideVister, switchonValueChange: this.SubjectStore.setHideVister },
            { key: '隱藏我的訊息已讀狀態', switchText:'隱藏我的訊息已讀狀態', switchValue: this.SubjectStore.hideMessage, switchonValueChange: this.SubjectStore.setHideMessage }
          ]
        }
      />
    )
  }
}

