// node modules
import React, { Component } from 'react'
//import { Actions } from 'react-native-router-flux'
// custom components
import BaconTheme from '../components/BaconTheme/BaconTheme'

export default class TestScene extends Component {
  render(){
    return(
      <BaconTheme
        title = '邂逅'
        bottonText = '登入'
        warningText= '忘記密碼？申請密碼重設'
      />
    )
  }
}
