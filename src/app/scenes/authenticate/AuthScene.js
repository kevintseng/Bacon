import React, { Component } from 'react'
import { inject } from "mobx-react"
import Intro from '../../components/Intro'

@inject("firebase","SignUpInStore")
export default class AuthScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.UpInStatus = this.props.UpInStatus
    this.SignUpInStore = this.props.SignUpInStore
    this.state = {
      error: null
    }
  }

  componentWillMount() {
    switch(this.UpInStatus) {
      case '註冊':
        this.signUp()
        break
      case '登入':
        this.signIn()
        break
      default:
        break
    } 
  }

  signUp = () => {
    this.firebase.auth().createUserWithEmailAndPassword(this.SignUpInStore.email, this.SignUpInStore.password).catch((error) => {
      const errorMessage = error.message
      this.setState({
          error: errorMessage,
      })
      console.log(error)
    })    
  }

  signIn = () => {
    this.firebase.auth().signInWithEmailAndPassword(this.SignUpInStore.email, this.SignUpInStore.password).catch((error) => {
      const errorMessage = error.message
      this.setState({
          error: errorMessage,
      })
      console.log(error)
    })    
  }

  render(){
    return(
      <Intro
        UpInStatus={this.UpInStatus}
        error={this.state.error}
      />
    )}
}

