import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import BaconRoutes from '../../../../../views/BaconRoutes/BaconRoutes'

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore
  }

  buttonOnPress = () => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/languages').set(this.SubjectEditStore.languages)
    this.SubjectStore.setLanguages(Object.assign({}, this.SubjectEditStore.languages))
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