import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import Infos from '../../views/Infos/Infos'
 
@inject("SignUpInStore") @observer
export default class InfosContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  render() {
    return(
      <Infos
        verityEmail={false} 
        verityPhoto={false}
        displayName='王大頭'
        bio='qwdqwdqdqd'
        age='20'
        langs='中文'
        distance='35'
      />
    )
  }
}