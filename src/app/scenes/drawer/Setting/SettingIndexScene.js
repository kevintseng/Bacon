import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import SettingIndex from '../../../components/scenes/SettingIndex/SettingIndex'

export default class SettingIndexScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      leftTopPress: false,
      rightTopPress: false,
      leftBottomPress: false,
      rightBottomPress: false
    }
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  goToSettingAccount() {
    Actions.SettingAccount()
  }

  goToSettingHide() {
    Actions.SettingHide()
  }

  goToSettingRemind() {
    Actions.SettingRemind()
  }

  goToSettingAbout() {
    Actions.SettingAbout()
  }

  leftTopOnShowUnderlay = () => {
    this.setState({
      leftTopPress: true
    })
  }

  leftTopOnHideUnderlay = () => {
    this.setState({
      leftTopPress: false
    })
  }

  rightTopOnShowUnderlay = () => {
    this.setState({
      rightTopPress: true
    })
  }

  rightTopOnHideUnderlay = () => {
    this.setState({
      rightTopPress: false
    })
  }

  leftBottomOnShowUnderlay = () => {
    this.setState({
      leftBottomPress: true
    })    
  }

  leftBottomOnHideUnderlay = () => {
    this.setState({
      leftBottomPress: false
    }) 
  }

  rightBottomOnShowUnderlay = () => {
    this.setState({
      rightBottomPress: true
    }) 
  }

  rightBottomOnHideUnderlay = () => {
    this.setState({
      rightBottomPress: false
    })     
  }

  render() {
    return(
      <SettingIndex
        leftTopText='關於BACON'
        rightTopText='帳號設定'
        leftBottomText='提示設定'
        rightBottomText='隱身設定'
        
        rightTopOnPress={ this.goToSettingAccount }
        rightBottomOnPress={ this.goToSettingHide }
        leftBottomOnPress={ this.goToSettingRemind }
        leftTopOnPress={ this.goToSettingAbout }

        leftTopPress={ this.state.leftTopPress }
        leftTopOnShowUnderlay={ this.leftTopOnShowUnderlay }
        leftTopOnHideUnderlay={ this.leftTopOnHideUnderlay }

        rightTopPress={ this.state.rightTopPress }
        rightTopOnShowUnderlay={ this.rightTopOnShowUnderlay }
        rightTopOnHideUnderlay={ this.rightTopOnHideUnderlay }

        leftBottomPress={ this.state.leftBottomPress }
        leftBottomOnShowUnderlay={ this.leftBottomOnShowUnderlay }
        leftBottomOnHideUnderlay={ this.leftBottomOnHideUnderlay }

        rightBottomPress={ this.state.rightBottomPress }
        rightBottomOnShowUnderlay={ this.rightBottomOnShowUnderlay }
        rightBottomOnHideUnderlay={ this.rightBottomOnHideUnderlay }
      />
    )
  }
}
