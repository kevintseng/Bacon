import React, { Component } from 'react'

import UpgradeTitle from '../../../views/UpgradeTitle'

export default class UpgradeTitleContainer extends Component {


  render() {
    return(
      <UpgradeTitle
        source={require('./img/ico_upgrade_4.png')}
        topText='少了會員升級四'
        upperText='少了會員升級四'
      />
    )
  }
}