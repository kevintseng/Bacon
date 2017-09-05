import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Alert } from 'react-native'

import SwitchLists from '../../views/SwitchLists'

@inject('SubjectStore') @observer
export default class OptionContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      // Prompt
      vistorPrompt : false,
      goodPrompt: false,
    }
  }

  setVistorPrompt = () => {
    if (this.SubjectStore.vip) {
      this.setState({ vistorPrompt : !this.state.vistorPrompt})
    } else {
      Alert.alert( 
        '管理員提示', '此功能僅限高級會員使用', [ 
        {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } 
      )
    }
  }

  setGoodPrompt = () => {
    if (this.SubjectStore.vip) {
      this.setState({ goodPrompt : !this.state.goodPrompt})
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
            { key: 0, switchText: '僅顯示三張照片以上的會員', switchValue: this.state.vistorPrompt, switchonValueChange: this.setVistorPrompt },
            { key: 1, switchText: '對方互動狀態分析可見', switchValue: this.state.goodPrompt, switchonValueChange:  this.setGoodPrompt }
          ]          
        }
      />
    )
  }
}