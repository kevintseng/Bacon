import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import Square from '../../../../../views/Square/Square'
import SettingRemindContainer from '../../SettingEdit/containers/SettingRemind/SettingRemindContainer'

export default class RemindContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      statu: false,
    }
  }

  goToSettingRemind() {
    Actions.SettingEdit({content: <SettingRemindContainer/>})
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
        text='提示設定'
        imageSource={require('../../../../../../images/btn_setting_noti.png')}
        onPressimageSource={require('../../../../../../images/btn_setting_noti_fb.png')}
        statu={ this.state.statu }
        onHideUnderlay={ this.onHideUnderlay }
        onShowUnderlay={ this.onShowUnderlay }
        onPress={ this.goToSettingRemind }
      />
    )
  }
}