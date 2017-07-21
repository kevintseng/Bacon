// node modules
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'
// custom components
import SignUpOne from '../../../components/SignUpOne/SignUpOne'

@inject("SignUpInStore") @observer
export default class SignUpOneScene extends Component {

  buttonOnPress = () => {
    Actions.SignUpTwo()
  }

  returnOnPress = () => {
    Actions.pop()
  }

  render(){
    return(
      <SignUpOne
        sexButtonLeftText='我是男的'
        sexButtonRightText='我是女的'
        sexButtonOnPress={()=>{}}
        intentionButtonLeftText='喜歡同性'
        intentionButtonRightText='喜歡異性'
        intentionButtonOnPress={()=>{}}
        sexChoose
        intentionChoose
        warning='提醒：請注意性別與性向是不能更改的'
        bottonText='下一步'
        buttonOnPress={this.buttonOnPress}
        returnOnPress={this.returnOnPress}
      />
    )
  }
}