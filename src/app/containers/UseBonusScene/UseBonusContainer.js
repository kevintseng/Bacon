import React, { Component } from 'react'
import { View } from 'react-native'
// import { inject, observer } from 'mobx-react'

import UseBonus from '../../views/UseBonus'
import BaconRoutesContainer from './BaconRoutesContainer'

export default class UseBonusContainer extends Component {

  constructor(props) {
    super(props)
    this.balance = this.props.balance
    this.cost = this.props.cost
    this.avatarUrl = this.props.avatarUrl
    this.reasonStr = this.props.reasonStr
    this.preStr = this.props.preStr
    this.postStr = this.props.postStr
  }

  handleConfirmUse = () => {
    this.props.handleUseConfirmed()
  }

  render() {
    return (
      <View>
        <UseBonus
          balance={this.balance}
          cost={this.cost}
          avatarUrl={this.avatarUrl}
          reasonStr={this.reasonStr}
          preStr={this.preStr}
          postStr={this.postStr}
        />
        <BaconRoutesContainer
          balance={this.balance}
          cost={this.cost}
          confirmUse={this.handleConfirmUse}
        />
      </View>
    )
  }
}
