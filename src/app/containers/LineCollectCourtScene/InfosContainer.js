import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import Infos from '../../views/Infos/Infos'
 
@observer
export default class InfosContainer extends Component {

  constructor(props) {
    super(props)
    this.Store = this.props.Store // MeetChanceStore FateStore
  }

  render() {
    return(
      <Infos
        verityEmail={ this.Store.emailVerified } 
        verityPhoto={ this.Store.photoVerified }
        displayName={ this.Store.nickname }
        bio={ this.Store.bio }
        age={ this.Store.age }
        langs={ this.Store.languagesToString }
        distance='35'
      />
    )
  }
}