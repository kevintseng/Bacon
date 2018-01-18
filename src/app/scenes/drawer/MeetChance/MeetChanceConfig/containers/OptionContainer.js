import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Alert } from 'react-native'

import SwitchLists from '../../../../../views/SwitchLists'

@inject('SubjectStore','ControlStore') @observer
export default class OptionContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.ControlStore = this.props.ControlStore
    //this.state = {
      // Prompt
     // vistorPrompt : false,
     // goodPrompt: false,
    //}
  }

  setVistorPrompt = () => {
    if (this.SubjectStore.vip) {
      this.ControlStore.switchMeetChanceOfflineMember()
    } else {
      Alert.alert( 
        '管理員提示', '此功能僅限高級會員使用', [ 
        {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } 
      )
    }
  }

  setGoodPrompt = () => {
    if (this.SubjectStore.vip) {
      this.ControlStore.switchMeetChanceRadar()
    } else {
      Alert.alert( 
        '管理員提示', '此功能僅限高級會員使用', [ 
        {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } 
      )
    }
  }

  render() {
    return(
      <SwitchLists
        flatListData={
          [
            { key: 0, switchText: '不顯示離線的會員', switchValue: this.ControlStore.meetChanceOfflineMember, switchonValueChange: this.setVistorPrompt },
            { key: 1, switchText: '對方互動狀態分析可見', switchValue: this.ControlStore.meetChanceRadar, switchonValueChange:  this.setGoodPrompt }
          ]          
        }
      />
    )
  }
}