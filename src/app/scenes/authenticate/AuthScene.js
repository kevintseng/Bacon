import React, { Component } from 'react'
import { BackHandler, ToastAndroid } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import Loading from '../../views/Loading/Loading'

@inject('ControlStore','SignUpStore','SignInStore','firebase') @observer
export default class AuthScene extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.SignUpStore = this.props.SignUpStore
    this.SignInStore = this.props.SignInStore
    this.firebase = this.props.firebase
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid)
    switch(this.ControlStore.authenticateIndicator) {
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
    this.firebase.auth().createUserWithEmailAndPassword(this.SignUpStore.email, this.SignUpStore.password)
      .catch((error) => {
        this.SignUpStore.setSignUpIndicator(error.message)
        Actions.SignUpThree({type: 'reset'})
      })    
  }

  signIn = () => {
    this.firebase.auth().signInWithEmailAndPassword(this.SignInStore.email, this.SignInStore.password)
      .catch((error) => {
        this.SignInStore.setSignInIndicator(error.message)
        Actions.signin({type: 'reset'})
      })    
  }

  render(){
    return(
      <Loading
        showWarning
        UpInStatus={ this.ControlStore.authenticateIndicator } // 登入 註冊
      />
    )}
}

