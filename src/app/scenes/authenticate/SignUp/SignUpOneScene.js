// node modules
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'
// custom components
import SignUpOne from '../../../components/scenes/SignUpOne/SignUpOne'

@inject("SignUpInStore") @observer
export default class SignUpOneScene extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  buttonOnPress = () => {
    Actions.SignUpTwo()
  }

  render(){
    return(
      <SignUpOne
        genderButtonLeftText='我是男的'
        genderButtonRightText='我是女的'
        sexOrientationButtonLeftText='喜歡同性'
        sexOrientationButtonRightText='喜歡異性'
        gender={ this.SignUpInStore.gender }
        genderButtonOnPress={ this.SignUpInStore.setGender }
        sexOrientation={ this.SignUpInStore.sexOrientation }
        sexOrientationButtonOnPress={ this.SignUpInStore.setSexOrientation }
        warningText='提醒：請注意性別與性向是不能更改的'
        buttonText='下一步'
        buttonOnPress={ this.buttonOnPress }
      />
    )
  }
}