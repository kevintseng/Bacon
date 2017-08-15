import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

@inject('MeetChanceStore','ControlStore') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.MeetChanceStore = this.props.MeetChanceStore
  }
  
  buttonOnPress = async () => {
    await this.MeetChanceStore.setMeetChanceMinAge(this.ControlStore.meetChanceMinAge)  
    await this.MeetChanceStore.setMeetChanceMaxAge(this.ControlStore.meetChanceMaxAge)
    this.MeetChanceStore.setPreyList()
    this.MeetChanceStore.setRealPreys()
    Actions.MeetChanceWaterFall({type: 'reset'})
  }

  render() {
    return(
      <BaconRoutes
        routesText='完成'
        routesOnPress={ this.buttonOnPress } 
      />
    )
  }
}