import React, { Component } from 'react'

import UpgradeTitle from '../../../views/UpgradeTitle'

export default class BonusTitleContainer extends Component {


  render() {
    return(
      <UpgradeTitle
        source={require('./img/ico_deposit_1.png')}
        topText='可用Q點來增加每天巧遇留言的次數'
        upperText='來跟更多新朋友打招呼吧'
      />
    )
  }
}