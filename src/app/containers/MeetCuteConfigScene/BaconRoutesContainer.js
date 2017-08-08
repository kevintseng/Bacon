import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

@inject('MeetCuteStore','ControlStore') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.MeetCuteStore = this.props.MeetCuteStore
  }
  
  buttonOnPress = () => {
    this.MeetCuteStore.setMeetCuteMinAge(this.ControlStore.meetCuteMinAge)  
    this.MeetCuteStore.setMeetCuteMaxAge(this.ControlStore.meetCuteMaxAge)
    this.MeetCuteStore.resetAge()
    Actions.MeetCuteCourt({type: 'reset'})
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