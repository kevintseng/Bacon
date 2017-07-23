import React, { Component } from "react"
import { AppState } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject } from "mobx-react"

import Loading from '../../components/Loading/Loading'

@inject("firebase","SignUpInStore")
export default class SessionCheckScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SignUpInStore = this.props.SignUpInStore
    this.user_id = null
    this.state = {
      lastAppState: AppState.currentState
    }
  }

  componentWillMount() {
    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //console.warn(user.uid + "已登入") // 使用者登入
        this.user_id = user.uid
        this.setOnline(this.user_id) // 設置使用者上線
        this.SignUpInStore.setUid(this.user_id)
        AppState.addEventListener('change', this._handleAppStateChange ) // 註冊 app 狀態監聽
        Actions.Drawer({type: 'reset'})
      } else {
        //console.warn("沒有使用者登入") // 沒有使用者登入
        AppState.removeEventListener('change', this._handleAppStateChange ) // 移除 app 狀態監聽
        Actions.Welcome({type: 'reset'}) // 轉到註冊登入頁面
      }
    })
  }

  _handleAppStateChange = nextAppState => {
    if (AppState.currentState === 'active') {
      this.setOnline(this.user_id) 
      // 設置使用者上線
    } else if (this.state.lastAppState.match('active') && (nextAppState === 'inactive' || nextAppState === 'background')) {
      this.setOffline(this.user_id) 
      // 設置使用者下線
    }
    this.setState({lastAppState: nextAppState})
  }

  setOnline(user_id) {
    this.firebase.database().ref("/online/" + user_id).set({
      lastOnline: Math.floor(Date.now() / 1000),
      location: "Taipei, Taiwan"
    });
  }

  setOffline(user_id) {
    this.firebase.database().ref("/online/" + user_id).remove()
  }
  
  render() {
    return(
      <Loading/>
  )}
}
