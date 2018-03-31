import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import SexChoose from '../../../../views/SexChoose/SexChoose'

@inject("SignUpStore") @observer
export default class SexChooseContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
  }

  render() {
    return(
      <SexChoose
        genderButtonLeftText='我是男的'
        genderButtonRightText='我是女的'
        genderButtonOnPress={ this.SignUpStore.switchGender }
        sexOrientationButtonLeftText='喜歡同性'
        sexOrientationButtonRightText='喜歡異性'
        sexOrientationButtonOnPress={ this.SignUpStore.switchSexualOrientation }
        gender={ this.SignUpStore.gender }
        sexOrientation={ this.SignUpStore.sexualOrientation }
        warningText='提醒：請注意性別與性向是不能更改的'
      />
    )
  }
}