import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject } from "mobx-react"

import SettingRemind from '../../../components/SettingRemind/SettingRemind'


@inject("firebase","SubjectStore")
export default class SettingRemindScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      // Remind
      vistorRemind : false,
      goodRemind: false,
      matchRemind: false,
      messageRemind: false,
      photoRemind: false,
      // Shock
      vistorShock : false,
      goodShock: false,
      matchShock: false,
      messageShock: false,
      photoShock: false
    }
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  setVistorRemind = () => {
    this.setState({ vistorRemind : !this.state.vistorRemind})
  }

  setGoodRemind = () => {
    this.setState({ goodRemind : !this.state.goodRemind})
  }

  setMatchRemind = () => {
    this.setState({ matchRemind : !this.state.matchRemind})
  }

  setMessageRemind = () => {
    this.setState({ messageRemind : !this.state.messageRemind})
  }

  setPhotoRemind = () => {
    this.setState({ photoRemind : !this.state.photoRemind}) 
  }

  setVistorShock = () => {
    this.setState({ vistorShock : !this.state.vistorShock})
  }

  setGoodShock = () => {
    this.setState({ goodShock : !this.state.goodShock}) 
  }

  setMatchShock = () => {
    this.setState({ matchShock : !this.state.matchShock})
  }

  setMessageShock = () => {
    this.setState({ messageShock : !this.state.messageShock})
  }

  setPhotoShock = () => {
    this.setState({ photoShock : !this.state.photoShock})
  }


  render() {
    return(
      <SettingRemind
        topFlatListData={
          [
            { key: '會員來訪', switchText: '會員來訪', switchValue: this.state.vistorRemind, switchonValueChange: this.setVistorRemind },
            { key: '對我好感', switchText: '對我好感', switchValue: this.state.goodRemind, switchonValueChange:  this.setGoodRemind },
            { key: '互有好感', switchText: '互有好感', switchValue: this.state.matchRemind, switchonValueChange: this.setMatchRemind },
            { key: '未讀留言', switchText: '未讀留言', switchValue: this.state.messageRemind, switchonValueChange:  this.setMessageRemind },
            { key: '照片更新', switchText: '照片更新', switchValue: this.state.photoRemind, switchonValueChange: this.setPhotoRemind }

          ]
        }
        bottomFlatListData={
          [
            { key: '會員來訪', switchText: '會員來訪', switchValue: this.state.vistorShock, switchonValueChange:  this.setVistorShock },
            { key: '對我好感', switchText: '對我好感', switchValue: this.state.goodShock, switchonValueChange: this.setGoodShock },
            { key: '互有好感', switchText: '互有好感', switchValue: this.state.matchShock, switchonValueChange: this.setMatchShock },
            { key: '未讀留言', switchText: '未讀留言', switchValue: this.state.messageShock, switchonValueChange:  this.setMessageShock },
            { key: '照片更新', switchText: '照片更新', switchValue: this.state.photoShock, switchonValueChange:  this.setPhotoShock }
          ]
        }
      />
    )
  }
}

