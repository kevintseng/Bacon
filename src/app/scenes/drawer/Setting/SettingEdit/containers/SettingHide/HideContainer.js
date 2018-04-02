import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import SwitchLists from '../../../../../../views/SwitchLists'

@inject('SubjectStore','firebase') @observer
export default class HideContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.firebase = this.props.firebase
  }

  componentWillUnmount() {
    //this.firebase.database().ref('users/' + this.SubjectStore.uid + '/hideMeetCute').set(this.SubjectStore.hideMeetCute)
    //this.firebase.database().ref('users/' + this.SubjectStore.uid + '/hideMeetChance').set(this.SubjectStore.hideMeetChance)
    //this.firebase.database().ref('users/' + this.SubjectStore.uid + '/hideVister').set(this.SubjectStore.hideVister)
    //this.firebase.database().ref('users/' + this.SubjectStore.uid + '/hideMessage').set(this.SubjectStore.hideMessage)
  }

  render() {
    return(
      <SwitchLists
        flatListData={
          [
            { key: '在邂逅中看不到我', switchText: '在邂逅中看不到我', switchValue: this.SubjectStore.hideMeetCute, switchonValueChange: this.SubjectStore.switchHideMeetCute },
            { key: '在巧遇中看不到我', switchText:'在巧遇中看不到我', switchValue: this.SubjectStore.hideMeetChance, switchonValueChange: this.SubjectStore.switchHideMeetChance },
            { key: '對方看不到我的來訪', switchText:'對方看不到我的來訪', switchValue: this.SubjectStore.hideVister, switchonValueChange: this.SubjectStore.switchHideVister },
            { key: '隱藏我的訊息已讀狀態', switchText:'隱藏我的訊息已讀狀態', switchValue: this.SubjectStore.hideMessage, switchonValueChange: this.SubjectStore.switchHideMessage }
          ]          
        }
      />
    )
  }
}