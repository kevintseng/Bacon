import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import Square from '../../views/Square/Square'

export default class AccountContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      statu: false,
    }
  }

  goToSettingAccount() {
    Actions.SettingAccount()
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
        text='帳號設定'
        imageSource={require('../../../images/btn_setting_account.png')}
        onPressimageSource={require('../../../images/btn_setting_account_fb.png')}
        statu={ this.state.statu }
        onHideUnderlay={ this.onHideUnderlay }
        onShowUnderlay={ this.onShowUnderlay }
        onPress={ this.goToSettingAccount }
      />
    )
  }
}