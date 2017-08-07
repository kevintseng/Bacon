import React, { Component } from 'react'

import SwitchLists from '../../views/SwitchLists'

export default class OptionContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // Prompt
      vistorPrompt : false,
      goodPrompt: false,
    }
  }

  setVistorPrompt = () => {
    this.setState({ vistorPrompt : !this.state.vistorPrompt})
  }

  setGoodPrompt = () => {
    this.setState({ goodPrompt : !this.state.goodPrompt})
  }

  render() {
    return(
      <SwitchLists
        flatListData={
          [
            { key: 0, switchText: '顯示離線的會員', switchValue: this.state.vistorPrompt, switchonValueChange: this.setVistorPrompt },
            { key: 1, switchText: '對方互動狀態分析可見', switchValue: this.state.goodPrompt, switchonValueChange:  this.setGoodPrompt }
          ]          
        }
      />
    )
  }
}