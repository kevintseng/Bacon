import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import SettingIndex from '../../../components/SettingIndex/SettingIndex'

export default class SettingIndexScene extends Component {

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  goToSettingAccount() {
    Actions.SettingAccount()
  }

  render() {
    return(
      <SettingIndex
        leftTopText='關於BACON'
        rightTopText='帳號設定'
        leftBottomText='提示設定'
        rightBottomText='隱身設定'
        rightTopOnPress={ this.goToSettingAccount }
      />
    )
  }
}
