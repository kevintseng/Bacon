import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"
// custom components
import Policy from '../../../components/common/Policy/Policy'

@inject("SignUpInStore") @observer
export default class PolicyContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
    this.state = {
      check: false
    }
  }

  setCheck = () => {
    this.setState({
      check: !this.state.check
    })
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
        check={ this.state.check }
        onPressCheckBox={ this.setCheck }
        onPressPolicy={ this.showPolicy }
        onPressRule={ this.showRule }
      />
    )
  }
}