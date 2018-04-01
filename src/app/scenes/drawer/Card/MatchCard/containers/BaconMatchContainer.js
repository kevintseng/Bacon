import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import BaconMatch from '../../../../../views/BaconMatch'


@inject('MeetCuteStore') @observer
export default class BaconMatchContainer extends Component {

  constructor(props) {
    super(props)
    this.MeetCuteStore = this.props.MeetCuteStore
  }


  render() {
    return(
          <BaconMatch
            visible={this.MeetCuteStore.fateMatch}
            onPressReturn={this.props.onPressReturn}
            leftText={'     回到緣分'}
            onPressRight={this.props.onPressRight}
            onPressLeft={this.props.onPressLeft}
          />
    )
  }
}