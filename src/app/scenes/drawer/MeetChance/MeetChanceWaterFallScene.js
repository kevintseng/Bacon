import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from "mobx-react"

import MeetChanceWaterFall from '../../../components/MeetChanceWaterFall/MeetChanceWaterFall'


@inject("firebase","SubjectStore") @observer
export default class MeetChanceWaterFallScene extends Component {

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
      <MeetChanceWaterFall/>
    )
  }
}

