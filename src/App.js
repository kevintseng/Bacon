import React, { Component } from 'react'
import Orientation from 'react-native-orientation-locker'
import { Provider } from 'mobx-react/native'
import { PermissionsAndroid } from 'react-native'
// initial config
import AppInitial from './configs/AppInitial'
import Routes from './app/Routes'

export default class App extends Component {

  componentWillMount() {
    Orientation.lockToPortrait()
    //this.requestCameraPermission()
  }

  requestCameraPermission = async () => { 
    try { 
      const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
        { 'title': '開啟地理位置權限', 
          'message': '請開啟地理位置權限讓Bacon提供最佳的用戶體驗' } ) 
      if (granted === PermissionsAndroid.RESULTS.GRANTED) { 
        console.log("You can use the camera") 
      } else { 
        console.log("Camera permission denied") 
      } 
    } catch (err) { 
      console.warn(err) 
    } 
  }

  render() {
    return (
      <Provider
        firebase={AppInitial.firebase}

        ControlStore={AppInitial.ControlStore}

        SignUpStore={AppInitial.SignUpStore}
        SignInStore={AppInitial.SignInStore}
        PasswordStore={AppInitial.PasswordStore}
        SubjectStore={AppInitial.SubjectStore}
        SubjectEditStore={AppInitial.SubjectEditStore}
        MeetChanceStore={AppInitial.MeetChanceStore}
        MeetCuteStore={AppInitial.MeetCuteStore}
        FateStore={AppInitial.FateStore}
        LineStore={AppInitial.LineStore}
        ChatStore={AppInitial.ChatStore}
      >
        <Routes />
      </Provider>
    )
  }
}
//SignUpInStore={ AppInitial.SignUpInStore }
