import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import Policy from '../../views/Policy/Policy'

@inject("SignUpInStore") @observer
export default class PolicyContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  showPolicy = () => {
    alert('showPolicy')
  }

  showRule = () => {
    alert('showRule')
  }

  render() {
    return(
      <Policy
        check={ this.SignUpInStore.policyChecker }
        onPressCheckBox={ this.SignUpInStore.setPolicyNameChecker }
        onPressPolicy={ this.showPolicy }
        onPressRule={ this.showRule }
      />
    )
  }
}