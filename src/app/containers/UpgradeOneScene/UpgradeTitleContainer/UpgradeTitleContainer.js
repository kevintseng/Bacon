import React, { Component } from 'react'

import UpgradeTitle from '../../../views/UpgradeTitle'

export default class UpgradeTitleContainer extends Component {


  render() {
    return(
      <UpgradeTitle
        source={require('./img/ico_upgrade_1.png')}
        topText='開啟隱身模式，走過看過不留痕及'
        upperText='讓你擁有完全的主動權'
      />
    )
  }
}