import React, { Component } from 'react'
import { BackHandler, ToastAndroid } from 'react-native'
import { inject, observer } from "mobx-react"
import { Actions } from 'react-native-router-flux'

// custom components
import Loading from '../views/Loading/Loading'

@inject("firebase","SignUpInStore") @observer
export default class AuthScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SignUpInStore = this.props.SignUpInStore
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid)
    switch(this.SignUpInStore.UpInStatus) {
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

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid)
  }

  _onBackAndroid = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //return false
        BackHandler.exitApp() //最近2秒内按過返回键，可以退出程式
    }
    this.lastBackPressed = Date.now()
    ToastAndroid.show('再按一次離開程式', ToastAndroid.SHORT)
    return true
  }

  signUp = () => {
    this.firebase.auth().createUserWithEmailAndPassword(this.SignUpInStore.email, this.SignUpInStore.password)
      .catch((error) => {
        this.SignUpInStore.setFailureStatus(error.message)
        console.warn('failar')
        Actions.SignUpThree({type: 'reset'})
      })    
  }

  signIn = () => {
    this.firebase.auth().signInWithEmailAndPassword(this.SignUpInStore.email, this.SignUpInStore.password)
      .catch((error) => {
        this.SignUpInStore.setFailureStatus(error.message)
        Actions.signin({type: 'reset'})
      })    
  }

  render(){
    return(
      <Loading
        showWarning
        UpInStatus={ this.SignUpInStore.UpInStatus } // 登入 註冊
        //error={ this.state.error }
      />
    )}
}

