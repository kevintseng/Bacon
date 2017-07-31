import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import Square from '../../views/Square/Square'

@inject("SignUpInStore") @observer
export default class AboutContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      statu: false,
    }
  }

  goToSettingAbout() {
    Actions.SettingAbout()
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
        text='關於Bacon'
        imageSource={require('../../../images/btn_setting_about.png')}
        onPressimageSource={require('../../../images/btn_setting_about_fb.png')}
        statu={ this.state.statu }
        onHideUnderlay={ this.onHideUnderlay }
        onShowUnderlay={ this.onShowUnderlay }
        onPress={ this.goToSettingAbout }
      />
    )
  }
}