import React, { Component }  from 'react'
import { AppState } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import Loading from '../views/Loading/Loading'

@inject('firebase','SubjectStore') @observer
export default class SessionCheckScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.uid = null
    this.email = null
    this.lastAppState = AppState.currentState
  }

  componentWillMount() {
    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // 使用者登入 只要登入成功一定有 uid
        this.uid = user.uid
        this.email = user.email
        this.setOnline(this.uid) // 非同步設置使用者上線
        AppState.addEventListener('change', this._handleAppStateChange ) // 非同步註冊 app 狀態監聽
        this.SubjectStore.setUid(this.uid) // 同步優先設定 uid
        this.SubjectStore.setEmail(this.email)
        Actions.Drawer({type: 'reset'}) // 切換場景
      } else {
        // 沒有使用者登入 user = null
        AppState.removeEventListener('change', this._handleAppStateChange ) // 非同步移除 app 狀態監聽
        //await this.delay(1000) // 延遲一下
        Actions.Welcome({type: 'reset'}) // 轉到註冊登入頁面
      }
    })    
  }

  _handleAppStateChange = nextAppState => {
    if (AppState.currentState === 'active') {
      this.setOnline(this.uid) 
      // 設置使用者上線
    } else if (this.lastAppState.match('active') && (nextAppState === 'inactive' || nextAppState === 'background')) {
      this.setOffline(this.uid) 
      // 設置使用者下線
    }
    this.lastAppState = nextAppState
  }

  setOnline(uid) {
    this.firebase.database().ref("/online/" + uid).set({
      lastOnline: Math.floor(Date.now() / 1000),
      location: "Taipei, Taiwan"
    })
  }

  setOffline(uid) {
    this.firebase.database().ref("/online/" + uid).remove()
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  render() {
    return(
      <Loading/>
  )}
}
