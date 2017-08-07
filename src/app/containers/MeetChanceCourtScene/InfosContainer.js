import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import Infos from '../../views/Infos/Infos'
 
@inject('MeetChanceStore') @observer
export default class InfosContainer extends Component {

  constructor(props) {
    super(props)
    this.MeetChanceStore = this.props.MeetChanceStore
  }

  render() {
    return(
      <Infos
        verityEmail={ this.MeetChanceStore.emailVerified } 
        verityPhoto={ this.MeetChanceStore.photoVerified }
        displayName={ this.MeetChanceStore.nickname }
        bio={ this.MeetChanceStore.bio }
        age={ this.MeetChanceStore.age }
        langs={ this.MeetChanceStore.languagesToString }
        distance='35'
      />
    )
  }
}