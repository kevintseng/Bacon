import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import GeoFire from 'geofire'

import MeetChanceWaterFall from '../../../components/MeetChanceWaterFall/MeetChanceWaterFall'

@inject("firebase","SubjectStore") @observer
export default class MeetChanceWaterFallScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      preyLists: new Array
    }
  }

  componentWillMount() {
    this.fetchPreyListsByMeetChance()
    Actions.refresh({ key: 'Drawer', open: false })
  }

  fetchPreyListsByMeetChance = () => {
    const longitude = 120.7120023
    const latitude = 22.6158015
    const query = new GeoFire(this.firebase.database().ref("/user_locations/")).query({
      center: [latitude, longitude],
      radius: 1000
    })
    query.on("key_entered", (uid) => {
      if (!(uid === this.SubjectStore.uid)){
        this.state.preyLists.push({key: uid})
      }
    })
    query.on("ready", () => {
      this.state.preyLists.forEach((item) => 
        {
          this.firebase.database().ref('users/' + item.key).once('value').then(
            (snap) => { 
              if (!(snap.val() == null)){
                item.displayName = snap.val().displayName
                item.photoURL = snap.val().photoURL
                item.onPressButton = this.onPressButton
              } 
            }
          ).catch((error) => {
            console.warn(error)
          }) 
        }
      )
    })
  }

  onPressButton = () => {
    Actions.MeetChanceCourt()
  }

  render() {
    return(
      <MeetChanceWaterFall flatListData={ this.state.preyLists } />
    )
  }
}

