import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'
// custom components
import SexChoose from '../../../components/common/SexChoose/SexChoose'

@inject("SignUpInStore") @observer
export default class SexChooseContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  buttonOnPress = () => {
    Actions.SignUpTwo()
  }

  render() {
    return(
      <SexChoose
        genderButtonLeftText='我是男的'
        genderButtonRightText='我是女的'
        genderButtonOnPress={ this.SignUpInStore.setGender }
        sexOrientationButtonLeftText='喜歡同性'
        sexOrientationButtonRightText='喜歡異性'
        sexOrientationButtonOnPress={ this.SignUpInStore.setSexOrientation }
        gender={ this.SignUpInStore.gender }
        sexOrientation={ this.SignUpInStore.sexOrientation }
        warningText='提醒：請注意性別與性向是不能更改的'
      />
    )
  }
}