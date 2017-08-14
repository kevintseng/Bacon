import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { View, Modal, Text, TouchableOpacity } from 'react-native'

import Policy from '../../views/Policy/Policy'

@inject('SignUpStore') @observer
export default class PolicyContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
  }

  render() {
    return(

        <Policy
          check={ this.SignUpStore.policyDetector }
          onPressCheckBox={ this.SignUpStore.switchPolicyDetector }
          onPressPolicy={ this.SignUpStore.setPolicyModal }
          onPressRule={ this.SignUpStore.setRuleModal }
        />
    )
  }
}