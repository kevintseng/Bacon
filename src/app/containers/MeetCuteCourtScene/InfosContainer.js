import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import Infos from '../../views/Infos/Infos'
 
@inject('MeetCuteStore') @observer
export default class InfosContainer extends Component {

  constructor(props) {
    super(props)
    this.MeetCuteStore = this.props.MeetCuteStore
  }

  render() {
    return(
      <Infos
        verityEmail={ this.MeetCuteStore.emailVerified } 
        verityPhoto={ this.MeetCuteStore.photoVerified }
        displayName={ this.MeetCuteStore.nickname }
        bio={ this.MeetCuteStore.bio }
        age={ this.MeetCuteStore.age }
        langs={ this.MeetCuteStore.languagesToString }
        distance='35'
      />
    )
  }
}