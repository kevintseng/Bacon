import React, { Component } from 'react'

import UpgradeTitle from '../../../views/UpgradeTitle'

export default class BonusTitleContainer extends Component {


  render() {
    return(
      <UpgradeTitle
        source={require('./img/ico_deposit_2.png')}
        topText='可用Q點來進行更多的來訪留言'
        upperText='讓對方的印象深刻'
      />
    )
  }
}