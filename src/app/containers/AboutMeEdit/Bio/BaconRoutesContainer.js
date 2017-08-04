import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import BaconRoutes from '../../../views/BaconRoutes/BaconRoutes'

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore
  }
  
  buttonOnPress = () => {
    if (this.SubjectEditStore.bio) {
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/bio').set(this.SubjectEditStore.bio)
      this.SubjectStore.setBio(this.SubjectEditStore.bio)
      Actions.AboutMeTab({type: 'reset'})
    } else {
      alert('請填入自我介紹')
    }
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