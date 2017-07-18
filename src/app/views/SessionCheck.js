import React, { Component } from "react"
import { View, Image, AppState } from 'react-native'
import { Actions } from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'


const styles = {
  linearGradientView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  linearGradient: {
    flex: 1
  }
}

const colors = ['#f4a764', '#d63768']

export default class SessionCheck extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.fire
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
        AppState.addEventListener('change', this._handleAppStateChange ) // 註冊 app 狀態監聽
        Actions.main({ type: 'reset' })
      } else {
        //console.warn("沒有使用者登入") // 沒有使用者登入
        AppState.removeEventListener('change', this._handleAppStateChange ) // 移除 app 狀態監聽
        Actions.SignUpIn({ type: 'reset' }) // 轉到註冊登入頁面
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
      <LinearGradient colors={colors} style={styles.linearGradient}>
        <View style={styles.linearGradientView}>
          <Image source={require('../../images/ico_intro_logo.png')} />
        </View>
      </LinearGradient>
  )}
}
