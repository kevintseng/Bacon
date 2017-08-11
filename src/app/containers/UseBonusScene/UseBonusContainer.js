import React, { Component } from 'react'
// import { View, TouchableOpacity, Text, Button } from 'react-native'
import { inject, observer } from 'mobx-react'

import UseBonus from '../../views/UseBonus'

@inject('SubjectStore') @observer
export default class UseBonusContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  render() {
    return (
      <UseBonus />
    )
  }
}
