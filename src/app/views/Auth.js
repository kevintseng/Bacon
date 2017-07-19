import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { inject } from "mobx-react"

@inject("firebase","signUp")
export default class Auth extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.email = this.props.signUp.email
    this.password = this.props.signUp.password
    this.state = {
      loginStatus: '註冊中'
    }
  }

  componentDidMount() {
    console.warn(this.email)
    this.firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      switch(errorCode) {
        case 'auth/wrong-password':
          this.setState({
            loginStatus: '密碼錯誤',
          })
          break
        case 'auth/user-not-found':
          this.setState({
            loginStatus: '無此使用者',
          })
          break
        default:
          this.setState({
            loginStatus: errorMessage,
          })
          break
      } 
      console.log(error)
    });
  }

  render(){
    return(

    )}
}

