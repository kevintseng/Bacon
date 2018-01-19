import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Alert } from 'react-native'

import SwitchLists from '../../../../../views/SwitchLists'




@inject('SubjectStore','MeetCuteStore') @observer
export default class OptionContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.MeetCuteStore = this.props.MeetCuteStore
    //this.state = {
      // Prompt
      //vistorPrompt : false,
      //goodPrompt: false,
    //}
  }

  setVistorPrompt = () => {
    if (this.SubjectStore.vip) {
      this.MeetCuteStore.switchOnlyShowThreePhotoPrey()
    } else {
      this.warning()
    }
  }

  setGoodPrompt = () => {
    if (this.SubjectStore.vip) {
      this.MeetCuteStore.switchShowPreyRadar()
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
        switchText: '僅顯示三張照片以上的會員', 
        switchValue: this.MeetCuteStore.onlyShowThreePhotoPrey, 
        switchonValueChange: this.setVistorPrompt 
      },
      { key: 1, 
        switchText: '對方互動狀態分析可見', 
        switchValue: this.MeetCuteStore.showPreyRadar, 
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