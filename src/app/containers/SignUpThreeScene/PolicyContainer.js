import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import Policy from '../../views/Policy/Policy'

@inject('SignUpStore') @observer
export default class PolicyContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
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
        check={ this.SignUpStore.policyDetector }
        onPressCheckBox={ this.SignUpStore.switchPolicyDetector }
        onPressPolicy={ this.showPolicy }
        onPressRule={ this.showRule }
      />
    )
  }
}