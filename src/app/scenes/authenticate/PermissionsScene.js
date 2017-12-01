import React, { Component } from 'react'
import { BackHandler, ToastAndroid, Platform } from 'react-native'
import { Actions } from 'react-native-router-flux'
import RNExitApp from 'react-native-exit-app'
import { PermissionsAndroid } from 'react-native'

import Loading from '../../views/Loading/Loading'

export default class PermissionsScene extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    //console.warn(height)
    if (Platform.OS === 'android') {
      this.requestPermission()
    }
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //return false
        //BackHandler.exitApp() //最近2秒内按過返回键，可以退出程式
        RNExitApp.exitApp()
    }
    this.lastBackPressed = Date.now()
    ToastAndroid.show('再按一次離開程式', ToastAndroid.SHORT)
    return true
  }

  requestPermission = async () => { 
    try { 
      const locationPermission = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
        { 'title': 'Bacon權限提醒', 
          'message': '請開啟地理位置權限讓Bacon提供最佳的用戶體驗' } ) 
      const cameraPermission = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.CAMERA, 
        { 'title': 'Bacon權限提醒', 
          'message': '請開啟拍照及錄影權限讓Bacon提供最佳的用戶體驗' } ) 
      const writeExternalStorgePermission = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, 
        { 'title': '開啟相機權限', 
          'message': '請開啟檔案儲存權限讓Bacon提供最佳的用戶體驗' } ) 
      const readExternalStorgePermission = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, 
        { 'title': '開啟相機權限', 
          'message': '請開啟檔案讀取權限讓Bacon提供最佳的用戶體驗' } ) 
      ///      
      if ((locationPermission === PermissionsAndroid.RESULTS.GRANTED) 
        && (cameraPermission === PermissionsAndroid.RESULTS.GRANTED)
        && (writeExternalStorgePermission === PermissionsAndroid.RESULTS.GRANTED)
        && (readExternalStorgePermission === PermissionsAndroid.RESULTS.GRANTED)) { 
        Actions.SessionCheck({type: 'reset'})
      } else { 
        Actions.SessionCheck({type: 'reset'})
        //RNExitApp.exitApp()
      } 
    } catch (err) { 
      Actions.SessionCheck({type: 'reset'})
      //RNExitApp.exitApp()
    } 
  }


  render(){
    return(
      <Loading
        showWarning={false}
        //UpInStatus={ this.ControlStore.authenticateIndicator } // 登入 註冊
      />
    )}
}

