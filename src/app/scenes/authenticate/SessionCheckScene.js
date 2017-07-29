import React, { Component } from "react"
import { AppState } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject } from "mobx-react"
// custom components
import Loading from '../../components/scenes/Loading/Loading'

@inject("firebase","SignUpInStore","SubjectStore")
export default class SessionCheckScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SignUpInStore = this.props.SignUpInStore
    this.SubjectStore = this.props.SubjectStore
    this.uid = null
    this.lastAppState = AppState.currentState
    //this.state = {
    //  lastAppState: AppState.currentState
    //}
  }

  componentWillMount() {
    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // 使用者登入
        this.uid = user.uid // 只要登入成功一定有 uid
        console.log('使用者登入')
        this.setOnline(this.uid) // 非同步設置使用者上線
        AppState.addEventListener('change', this._handleAppStateChange ) // 非同步註冊 app 狀態監聽
        this.SubjectStore.setUid(this.uid) // 同步優先設定 uid
        Actions.Drawer({type: 'reset'}) // 切換場景
      } else {
        // 沒有使用者登入 user = null
        this.setOffline(this.SubjectStore.uid) // 非同步設置使用者下線
        AppState.removeEventListener('change', this._handleAppStateChange ) // 非同步移除 app 狀態監聽
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
    //this.setState({lastAppState: nextAppState})
  }

  setOnline(uid) {
    this.firebase.database().ref("/online/" + uid).set({
      lastOnline: Math.floor(Date.now() / 1000),
      location: "Taipei, Taiwan"
    });
  }

  setOffline(uid) {
    this.firebase.database().ref("/online/" + uid).remove()
  }
  
  render() {
    return(
      <Loading/>
  )}
}
