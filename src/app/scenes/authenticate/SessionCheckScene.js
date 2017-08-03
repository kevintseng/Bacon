import React, { Component }  from 'react'
import { AppState } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import GeoFire from 'geofire'
import Geolocation from  'Geolocation'

import Loading from '../../views/Loading/Loading'

@inject('SignInStore','SignUpStore','SubjectStore','SubjectEditStore','MeetChanceStore','firebase',) @observer
export default class SessionCheckScene extends Component {

  constructor(props) {
    super(props)
    this.SignInStore = this.props.SignInStore
    this.SignUpStore = this.props.SignUpStore
    this.SubjectStore = this.props.SubjectStore
    this.SubjectEditStore = this.props.SubjectEditStore
    this.firebase = this.props.firebase

    this.MeetChanceStore = this.props.MeetChanceStore
    this.uid = null
    this.email = null
    this.geoQuery = null
    this.geoFire = null
    this.lastAppState = AppState.currentState
  }

  componentWillMount() {
    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // 使用者登入 只要登入成功一定有 uid
        this.uid = user.uid
        this.email = user.email
        this.setOnline(this.uid) // 非同步設置使用者上線
        //this.uploadLocation() // 非同步上傳地理位置
        AppState.addEventListener('change', this._handleAppStateChange ) // 非同步註冊 app 狀態監聽
        this.SubjectStore.setUid(this.uid) // 同步優先設定 uid
        this.SubjectStore.setEmail(this.email)
        Actions.Drawer({type: 'reset'}) // 切換場景
      } else {
        // 入口點 -> 沒有使用者登入 user = null
        // 移除所有監聽函數 初始化狀態
        AppState.removeEventListener('change', this._handleAppStateChange ) // 非同步移除 app 狀態監聽
        //this.removeMeetChanceListener() // 非同步移除地理監聽
        this.SignUpStore.initialize() // 初始註冊入狀態
        this.SignInStore.initialize() // 初始化登入狀態
        this.SubjectStore.initialize() // 初始主體入狀態
        this.SubjectEditStore.initialize() // 初始編輯入狀態

        //this.MeetChanceStore.setpreyList(new Array)
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

  uploadLocation = () => {
    Geolocation.getCurrentPosition(
      location => {
        this.geoFire = new GeoFire(this.firebase.database().ref('/user_locations/'))
        this.geoQuery = this.geoFire.query({
          center: [location.coords.latitude,location.coords.longitude],
          radius: 3000
        })
        this.grepMeetChance(this.geoQuery)
        this.geoFire.set(this.SubjectStore.uid,[location.coords.latitude,location.coords.longitude])
          .then(() => {
            console.log("獲取位置成功並上傳"+[location.coords.latitude,location.coords.longitude]);
          }, error => {
            console.log("上傳位置失敗：" + error);
          }
        ) 

      },
      error => {
        console.log("獲取位置失敗："+ error)
      }
    )
  }

  grepMeetChance = (geoQuery) => {
    geoQuery.on("key_entered", (uid, location, distance) => {
      //
      if (!(uid === this.SubjectStore.uid)) {
        this.MeetChanceStore.addPrey({uid: uid, distance: distance})
      }
    })

    geoQuery.on("key_moved", (uid, location, distance) => {
      if (!(uid === this.SubjectStore.uid)) {
        this.MeetChanceStore.updatePrey(uid,distance)
      }
    })

    geoQuery.on("key_exited", (uid, location, distance) => {
      if (!(uid === this.SubjectStore.uid)) {
        this.MeetChanceStore.removePrey(uid)
      }
    })
  }

  removeMeetChanceListener = () => {
    if (this.geoQuery) {
      this.geoQuery.cancel()
    }
  }

  render() {
    return(
      <Loading/>
  )}
}
