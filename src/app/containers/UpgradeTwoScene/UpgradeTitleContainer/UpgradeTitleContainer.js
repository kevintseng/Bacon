import React, { Component } from 'react'

import UpgradeTitle from '../../../views/UpgradeTitle'

export default class UpgradeTitleContainer extends Component {


  render() {
    return(
      <UpgradeTitle
        source={require('./img/ico_upgrade_2.png')}
        topText='開啟進階選項，排除離線或照片少的會員'
        upperText='讓你的對象更準確'
      />
    )
  }
}