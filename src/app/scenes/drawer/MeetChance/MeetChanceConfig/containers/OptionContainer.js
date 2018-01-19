import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Alert } from 'react-native'

import SwitchLists from '../../../../../views/SwitchLists'

@inject('SubjectStore','MeetChanceStore') @observer
export default class OptionContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.MeetChanceStore = this.props.MeetChanceStore
  }

  setVistorPrompt = () => {
    if (this.SubjectStore.vip) {
      this.MeetChanceStore.switchNonShowOfflinePrey()
    } else {
      this.warning()
    }
  }

  setGoodPrompt = () => {
    if (this.SubjectStore.vip) {
      this.MeetChanceStore.switchShowPreyRadar()
    } else {
      this.warning()
    }
  }

  warning = () => {
    Alert.alert( 
      '管理員提示', '此功能僅限高級會員使用', [ 
      {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } 
    )
  }

  switchOptions = () => (
    [
      { key: 0, 
        switchText: '不顯示離線的會員', 
        switchValue: this.MeetChanceStore.nonShowOfflinePrey, 
        switchonValueChange: this.setVistorPrompt 
      },
      { key: 1, 
        switchText: '對方互動狀態分析可見', 
        switchValue: this.MeetChanceStore.showPreyRadar, 
        switchonValueChange: this.setGoodPrompt  
      }
    ] 
  )

  render() {
    return(
      <SwitchLists
        flatListData={this.switchOptions()}
      />
    )
  }
}