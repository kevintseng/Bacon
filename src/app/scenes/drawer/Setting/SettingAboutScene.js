import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject } from "mobx-react"

import SettingAbout from '../../../components/SettingAbout/SettingAbout'


@inject("firebase","SubjectStore")
export default class SettingAboutScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  render() {
    return(
      <SettingAbout/>
    )
  }
}

