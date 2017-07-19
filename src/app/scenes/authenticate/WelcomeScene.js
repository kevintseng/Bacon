import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import LogoButton from '../../components/LogoButton'


export default class WelcomeScene extends Component {
  render(){
    return(
      <LogoButton
        title='遇見更多的她/他'
        topButtonPic={require('../../../images/btn_index_join.png')}
        bottomButtonPic={require('../../../images/btn_gredient.png')}
        topButtonText='+ 免費加入'
        bottomButtonText='登入'
        topButtonOnPress={() => {Actions.SignUp()}}
        bottomButtonOnPress={() => {Actions.SignIn()}}
        topLogo={require('../../../images/ic_index_logo.png')}
        bottomLog={require('../../../images/pic_index_wave.png')}
      />
    )
  }
}