import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import SwitchLists from '../../views/SwitchLists'

@inject('SubjectStore') @observer
export default class HideContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  render() {
    return(
      <SwitchLists
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