import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import Infos from '../../views/Infos/Infos'
 
@inject("SubjectStore") @observer
export default class InfosContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  render() {
    return(
      <Infos
        verityEmail={this.SubjectStore.emailVerified} 
        verityPhoto={this.SubjectStore.photoVerified}
        displayName={this.SubjectStore.profileDisplayName}
        bio={this.SubjectStore.profileBio}
        age={this.SubjectStore.profileBirthday}
        langs={this.SubjectStore.profileLangs}
        distance={'79'}
      />
    )
  }
}