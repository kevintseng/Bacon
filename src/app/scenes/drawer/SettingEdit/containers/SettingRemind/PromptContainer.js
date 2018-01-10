import React, { Component } from 'react'

import SwitchLists from '../../../../../views/SwitchLists'

export default class PromptContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // Prompt
      vistorPrompt : false,
      goodPrompt: false,
      matchPrompt: false,
      messagePrompt: false,
      photoPrompt: false,
    }
  }

  setVistorPrompt = () => {
    this.setState({ vistorPrompt : !this.state.vistorPrompt})
  }

  setGoodPrompt = () => {
    this.setState({ goodPrompt : !this.state.goodPrompt})
  }

  setMatchPrompt = () => {
    this.setState({ matchPrompt : !this.state.matchPrompt})
  }

  setMessagePrompt = () => {
    this.setState({ messagePrompt : !this.state.messagePrompt})
  }

  setPhotoPrompt = () => {
    this.setState({ photoPrompt : !this.state.photoPrompt}) 
  }

  render() {
    return(
      <SwitchLists
        flatListData={
          [
            { key: '會員來訪', switchText: '會員來訪', switchValue: this.state.vistorPrompt, switchonValueChange: this.setVistorPrompt },
            { key: '對我好感', switchText: '對我好感', switchValue: this.state.goodPrompt, switchonValueChange:  this.setGoodPrompt },
            { key: '互有好感', switchText: '互有好感', switchValue: this.state.matchPrompt, switchonValueChange: this.setMatchPrompt },
            { key: '未讀留言', switchText: '未讀留言', switchValue: this.state.messagePrompt, switchonValueChange:  this.setMessagePrompt },
            { key: '照片更新', switchText: '照片更新', switchValue: this.state.photoPrompt, switchonValueChange: this.setPhotoPrompt }
          ]          
        }
      />
    )
  }
}