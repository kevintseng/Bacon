import React, { Component } from 'react'

import UpgradeTitle from '../../../views/UpgradeTitle'

export default class UpgradeTitleContainer extends Component {


  render() {
    return(
      <UpgradeTitle
        source={require('./img/ico_upgrade_3.png')}
        topText='提高未讀招呼，與收藏的上限'
        upperText='讓難得的緣分不漏接'
      />
    )
  }
}