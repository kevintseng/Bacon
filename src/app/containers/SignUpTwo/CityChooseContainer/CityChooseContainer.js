import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import CityChoose from '../../../components/common/CityChoose/CityChoose'

@inject("SignUpInStore") @observer
export default class CityChooseContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  render() {
    return(
      <CityChoose
        placeholder='請輸入所在位置'
        value={ this.SignUpInStore.city }
        onChangeText={ this.SignUpInStore.setTextInputCity }
        googleOnPress={ this.SignUpInStore.setGoogleCity }
      />
    )
  }
}