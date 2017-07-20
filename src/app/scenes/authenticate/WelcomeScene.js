// node modules
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
// custom components
import LogoButton from '../../components/Welcome/Welcome'

export default class WelcomeScene extends Component {
  render(){
    return(
      <LogoButton
        title='遇見更多的她/他'
        topButtonText='免費加入'
        bottomButtonText='登入'
        topButtonOnPress={() => {Actions.SignUp()}}
        bottomButtonOnPress={() => {Actions.SignIn()}}
      />
    )
  }
}