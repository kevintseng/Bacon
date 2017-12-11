import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

@inject('MeetCuteStore','ControlStore','SubjectStore','firebase') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.MeetCuteStore = this.props.MeetCuteStore
    this.SubjectStore = this.props.SubjectStore
    this.firebase = this.props.firebase
  }
  
  buttonOnPress = () => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/meetCuteMinAge').set(this.ControlStore.meetCuteMinAge)
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/meetCuteMaxAge').set(this.ControlStore.meetCuteMaxAge)
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/meetCuteRadar').set(this.ControlStore.meetCuteRadar)
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/meetCuteThreePhotos').set(this.ControlStore.meetCuteThreePhotos)
    this.MeetCuteStore.setMeetCuteThreePhotos(this.ControlStore.meetCuteThreePhotos)
    this.MeetCuteStore.setMeetCuteRadar(this.ControlStore.meetCuteRadar)
    this.MeetCuteStore.setMeetCuteMinAge(this.ControlStore.meetCuteMinAge)  
    this.MeetCuteStore.setMeetCuteMaxAge(this.ControlStore.meetCuteMaxAge)
    this.MeetCuteStore.resetAge()
    Actions.MeetCuteSwiper({type: 'replace'})
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