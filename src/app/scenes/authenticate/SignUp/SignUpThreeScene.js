// node modules
import React, { Component } from 'react'
import { Actions } from "react-native-router-flux"
import { inject, observer } from "mobx-react"
// custom components
import SignUpThree from '../../../components/SignUpThree/SignUpThree'
import { checkEmail } from '../../../Utils'

@inject("firebase","SignUpInStore") @observer
export default class SignUpThreeScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SignUpInStore = this.props.SignUpInStore
    this.state = {
      emailChecker: false,
      passwordChecker: false,
      displayNameChecker: false,
      policyChecker: false,
      //birthdayChecker: false,
      emailError: null,
      passwordError: null,
      displayNameError: null,
      policyError: null
      //birthdayError: null
    }
  }

  buttonOnPress = () => {
    if (this.allChecker()) {
      Actions.SignUpFour()
    } else {
      //console.warn(this.allChecker())
      alert("請再檢查一次輸入資料")
    }
  }

  allChecker = () => {
    if (this.state.emailChecker && this.state.passwordChecker && this.state.displayNameChecker && this.state.policyChecker) {
      return true
    }
    return false
  }

  emailChecker = () => {
    if (checkEmail(this.SignUpInStore.email)) {
      this.firebase.database().ref('users/').orderByChild('email').equalTo(this.SignUpInStore.email.toString().toLowerCase().trim()).once("value", (data) => {
        if (data.val()) {
          this.setState({
            emailChecker: false,
            emailError: '此帳號已註冊'
          })
        } else {
          this.setState({
            emailChecker: true,
            emailError: '此帳號可以使用'
          })
          return true
        }
        return false 
      })
    } else {
      this.setState({
        emailChecker: false,
        emailError: '帳號格式錯誤'
      })
      return false 
    }
  }
  
  passwordChecker = () => {
    const passw =  /^[A-Za-z0-9]{6,10}$/;
    if (this.SignUpInStore.password.match(passw)) {
      this.setState({
        passwordChecker: true,
        passwordError: '此密碼可以使用'
      }) 
    } else {
      this.setState({
        passwordChecker: false,
        passwordError: '請輸入數字或英文字母組合的6~10字密碼'
      }) 
      return false    
    }
    return true
  }

  displayNameChecker = () => {
    if (this.SignUpInStore.displayName.length < 2) {
      this.setState({
        displayNameChecker: false,
        displayNameError: '請輸入2個字以上的暱稱'
      })
    } else {
      this.setState({
        displayNameChecker: true,
        displayNameError: '此暱稱可以使用'
      }) 
      return true     
    }
    return false   
  }
/*
  birthdayChecker() {
    //check birthday must not be ''
    if(this.SignUpInStore.birthday == '') {
      this.setState({
        birthdayChecker: false,
        birthdayError: '請提供您的生日'
      })
      return false
    }
    // Check age must be 18 and above
    if(getAge(this.SignUpInStore.birthday) < 18) {
      this.setState({
        birthdayChecker: false,
        birthdayError: '本App僅提供滿18歲以上用戶使用'
      })
      return false
    }
    return true
  }
*/
  onPressPolicy = () => {
    this.setState({
      policyChecker: !this.state.policyChecker
    })
  }

  maxDate() {
    const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    return(
      maxDate.toISOString().substring(0, 10)
    )
  }

  render(){
    return(
      <SignUpThree
        buttonText='最後一步'
        buttonOnPress={ this.buttonOnPress }
        email={ this.SignUpInStore.email }
        onChangeEmail={ this.SignUpInStore.setEmail }
        password={ this.SignUpInStore.password }
        onChangePassword={ this.SignUpInStore.setPassword }
        displayName={ this.SignUpInStore.displayName }
        onChangeDisplayName={ this.SignUpInStore.setDisplayName }
        birthday={ this.SignUpInStore.birthday }
        onChangeBirthday={ this.SignUpInStore.setBirthday }
        policy={ this.state.policyChecker }
        onPressPolicy={ this.onPressPolicy }
        emailError={ this.state.emailError}
        passwordError={ this.state.passwordError}
        displayNameError={ this.state.displayNameError}
        policyError={ this.state.policyError }
        onBlurEmail={ this.emailChecker }
        onBlurPassword={ this.passwordChecker }
        onBlurDisplayName={ this.displayNameChecker }
        maxDate={ this.maxDate() }
      />
    )
  }
}