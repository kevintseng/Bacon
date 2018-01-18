import React, { Component } from 'react'

import SwitchLists from '../../../../../../views/SwitchLists'

export default class ShakeContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // Shake
      vistorShake : false,
      goodShake: false,
      matchShake: false,
      messageShake: false,
      photoShake: false
    }
  }

  setVistorShake = () => {
    this.setState({ vistorShake : !this.state.vistorShake})
  }

  setGoodShake = () => {
    this.setState({ goodShake : !this.state.goodShake}) 
  }

  setMatchShake = () => {
    this.setState({ matchShake : !this.state.matchShake})
  }

  setMessageShake = () => {
    this.setState({ messageShake : !this.state.messageShake})
  }

  setPhotoShake = () => {
    this.setState({ photoShake : !this.state.photoShake})
  }

  render() {
    return(
      <SwitchLists
        flatListData={
          [
            { key: '會員來訪', switchText: '會員來訪', switchValue: this.state.vistorShake, switchonValueChange:  this.setVistorShake },
            { key: '對我好感', switchText: '對我好感', switchValue: this.state.goodShake, switchonValueChange: this.setGoodShake },
            { key: '互有好感', switchText: '互有好感', switchValue: this.state.matchShake, switchonValueChange: this.setMatchShake },
            { key: '未讀留言', switchText: '未讀留言', switchValue: this.state.messageShake, switchonValueChange:  this.setMessageShake },
            { key: '照片更新', switchText: '照片更新', switchValue: this.state.photoShake, switchonValueChange:  this.setPhotoShake }
          ]          
        }
      />
    )
  }
}