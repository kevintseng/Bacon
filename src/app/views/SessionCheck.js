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
    this.state = {
      appState: AppState.currentState
    }
  }

  componentWillMount(){
    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //console.warn(user.uid + "已登入") // 使用者登入
        this.setOnline(user.uid) // 設置使用者上線
        AppState.addEventListener('change', (nextAppState) => { this.handleAppStateChange(nextAppState,user.uid) }) // app 狀態監聽
        Actions.main({ type: 'reset' })
      } else {
        //console.warn("沒有使用者登入")
        AppState.removeEventListener('change', (nextAppState) => { this.handleAppStateChange(nextAppState) })
        Actions.SignUpIn({ type: 'reset' }) // 轉到註冊登入頁面
      }
    })
  }

  handleAppStateChange(nextAppState,user_id){
    if(this.state.appState.match('active') && (nextAppState === 'inactive' || nextAppState === 'background')) {
      this.setOffline(user_id) // 設置使用者下線
    }
    if(nextAppState === 'active') {
      console.warn("設置使用者上線")
      this.setOnline(user_id) // 設置使用者上線
    }
    this.setState({appState: nextAppState})
  }

  setOnline(user_id){
    this.firebase.database().ref("/online/" + user_id).set({
      lastOnline: Math.floor(Date.now() / 1000),
      location: "Taipei, Taiwan"
    });
  }

  setOffline(user_id){
    this.firebase.database().ref("/online/" + user_id).remove()
  }
  
  render(){
    return(
      <LinearGradient colors={colors} style={styles.linearGradient}>
        <View style={styles.linearGradientView}>
          <Image source={require('../../images/ico_intro_logo.png')} />
        </View>
      </LinearGradient>
  )}
}
