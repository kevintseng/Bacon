import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import BaconCheckMatch from '../../../../../views/BaconCheckMatch'


@inject('MeetCuteStore') @observer
export default class BaconCheckMatchContainer extends Component {

  constructor(props) {
    super(props)
    this.MeetCuteStore = this.props.MeetCuteStore
  }


  render() {
    return(
          <BaconCheckMatch
            visible={this.MeetCuteStore.checking}
            text={'檢查配對中'}
          />
    )
  }
}