import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import BaconRoutes from '../../../../views/BaconRoutes/BaconRoutes'

@inject('MeetChanceStore','ControlStore','SubjectStore','firebase') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.MeetChanceStore = this.props.MeetChanceStore
    this.SubjectStore = this.props.SubjectStore
    this.firebase = this.props.firebase
  }
  
  buttonOnPress = () => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/meetChanceMinAge').set(this.ControlStore.meetChanceMinAge)
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/meetChanceMaxAge').set(this.ControlStore.meetChanceMaxAge)
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/meetChanceRadar').set(this.ControlStore.meetChanceRadar)
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/meetChanceOfflineMember').set(this.ControlStore.meetChanceOfflineMember)
    this.MeetChanceStore.setMeetChanceOfflineMember(this.ControlStore.meetChanceOfflineMember)  
    this.MeetChanceStore.setMeetChanceMinAge(this.ControlStore.meetChanceMinAge)  
    this.MeetChanceStore.setMeetChanceMaxAge(this.ControlStore.meetChanceMaxAge)
    this.MeetChanceStore.setMeetChanceRadar(this.ControlStore.meetChanceRadar)
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