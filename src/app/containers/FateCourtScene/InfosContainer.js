import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import Infos from '../../views/Infos/Infos'
 
@inject('FateStore') @observer
export default class InfosContainer extends Component {

  constructor(props) {
    super(props)
    this.FateStore = this.props.FateStore
  }

  render() {
    return(
      <Infos
        verityEmail={ this.FateStore.emailVerified } 
        verityPhoto={ this.FateStore.photoVerified }
        displayName={ this.FateStore.nickname }
        bio={ this.FateStore.bio }
        age={ this.FateStore.age }
        langs={ this.FateStore.languagesToString }
        distance='35'
      />
    )
  }
}