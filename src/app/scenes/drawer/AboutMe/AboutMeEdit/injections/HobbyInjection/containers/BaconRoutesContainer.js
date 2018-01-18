import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import BaconRoutes from '../../../../../../../views/BaconRoutes/BaconRoutes'

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore
  }

  filter = () => (
    Object.keys(this.SubjectEditStore.hobbies).reduce((r, e) => {
      if (this.SubjectEditStore.hobbies[e] === true ) r[e] = true
      return r;
    }, {})
  )


  buttonOnPress = () => {
    const filteredHobbies = this.filter()
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/hobbies').set(filteredHobbies)
    this.SubjectStore.setHobbies(filteredHobbies)
    Actions.AboutMeTab({type: 'reset'})
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