import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import Infos from '../../../../views/Infos/Infos'

@inject('SubjectStore') @observer
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
        displayName={this.SubjectStore.nickname}
        address={ this.SubjectStore.address }
        bio={this.SubjectStore.bio}
        age={this.SubjectStore.age}
        langs={this.SubjectStore.languagesToString}
        distance={'79'}
      />
    )
  }
}
