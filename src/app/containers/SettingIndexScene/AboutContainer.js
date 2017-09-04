import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import Square from '../../views/Square/Square'

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
        text='關於BACON'
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