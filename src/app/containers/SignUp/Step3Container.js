import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import Step3 from '../../views/SignUp/Step3'

@inject("signUp") @observer 
export default class Step3Container extends Component {

  render(){
    return(
      <Step3
        email={this.props.signUp.email}
        password={this.props.signUp.password}
        nickname={this.props.signUp.nickname}
        birthday={this.props.signUp.birthday}
        onChangeEmail={this.props.signUp.onChangeEmail}
        onChangePassword={this.props.signUp.onChangePassword}
        onChangeNickname={this.props.signUp.onChangeNickname}
        onChangeBirthday={this.props.signUp.onChangeBirthday}
      />
    )
  }
}
