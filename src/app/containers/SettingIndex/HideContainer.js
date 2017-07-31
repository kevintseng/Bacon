import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import Square from '../../views/Square/Square'

@inject("SignUpInStore") @observer
export default class HideContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      statu: false,
    }
  }

  goToSettingHide() {
    Actions.SettingHide()
  }

  onShowUnderlay = () => {
    this.setState({
      statu: true
    }) 
  }

  onHideUnderlay = () => {
    this.setState({
      statu: false
    })     
  }
  
  render() {
    return(
      <Square
        text='隱身設定'
        imageSource={require('../../../images/btn_setting_hide.png')}
        onPressimageSource={require('../../../images/btn_setting_hide_fb.png')}
        statu={ this.state.statu }
        onHideUnderlay={ this.onHideUnderlay }
        onShowUnderlay={ this.onShowUnderlay }
        onPress={ this.goToSettingHide }
      />
    )
  }
}