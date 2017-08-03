import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import BaconRoutes from '../../../views/BaconRoutes/BaconRoutes'

@inject('firebase','SignUpInStore','SubjectStore') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SignUpInStore = this.props.SignUpInStore
    this.SubjectStore = this.props.SubjectStore
  }
  
  buttonOnPress = () => {
    if (this.SignUpInStore.city) {
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/city').set(this.SignUpInStore.city)
      this.SubjectStore.setCity(this.SignUpInStore.city)
      Actions.AboutMeTab({type: 'reset'})
    } else {
      alert('請填入位置')
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