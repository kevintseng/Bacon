import React, { Component }  from 'react'
import { AppState } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import GeoFire from 'geofire'
import Geolocation from  'Geolocation'

import Loading from '../../views/Loading/Loading'

@inject('ControlStore','SignUpStore','SignInStore','SubjectStore','SubjectEditStore','MeetChanceStore','firebase',) @observer
export default class SessionCheckScene extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.SignUpStore = this.props.SignUpStore
    this.SignInStore = this.props.SignInStore
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
        this.uid = user.uid // 先有 uid
        this.email = user.email
        if (this.ControlStore.authenticateIndicator == '註冊') {
          this.uploadAvatar() // 非同步上傳相簿
          this.uploadSignUpData() // 非同步上傳資料  
          // 邂逅 巧遇 緣分
          this.setOnline(this.uid) // 非同步設置使用者上線
          AppState.addEventListener('change', this.handleAppStateChange ) // 非同步註冊 app 狀態監聽
          this.initSubjectStoreFromSignUpStore() // 同步轉移資料
        } else {
          this.initSubjectStoreFromFirebase()
          // 邂逅 巧遇 緣分
          this.setOnline(this.uid) // 非同步設置使用者上線
          AppState.addEventListener('change', this.handleAppStateChange ) // 非同步註冊 app 狀態監聽
        }
        Actions.Drawer({type: 'reset'}) // 切換場景
      } else {
        // 入口點 -> 沒有使用者登入 user = null
        // 移除所有監聽函數 初始化狀態
        AppState.removeEventListener('change', this.handleAppStateChange ) // 非同步移除 app 狀態監聽
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

  uploadAvatar = () => {
    this.firebase.storage().ref('images/avatars/' + this.SubjectStore.uid)  
    .putFile(this.SignUpStore.photoUrl.replace('file:/',''), metadata)
    .then(uploadedFile => {
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/photoUrl').set(uploadedFile.downloadUrl)
      .then(() => {
        this.firebase.database().ref('users/' + this.SubjectStore.uid + '/photos').set({ uploadedFile.downloadUrl: true })
        .then(() => {
          this.setState({
            uploadAvatarState: '使用者大頭照上傳成功'
          })})
        .catch(() => {
          this.setState({
            uploadAvatarState: '使用者大頭照上傳失敗'
          })})
      })
      .catch(() => {
        this.setState({
          uploadAvatarState: '使用者大頭照上傳失敗'
        })
      })      
    })
    .catch(() => {
      this.setState({
        uploadAvatarState: '使用者大頭照上傳失敗'
      })
    })
  }

  uploadSignUpData = () => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid).set({
      // 上傳註冊資料
      nickname: this.SignUpStore.nickname,
      address: this.SignUpStore.address,
      birthday: this.SignUpStore.birthday,
      vip: false,
      sexualOrientation: this.sexualOrientationToString(),
      languages: DefaultLanguages
    }).then(() => {
        this.setState({
          uploadSignUpDataState: '使用者資料上傳成功' // signUpDataUploadIndicator
        })
      }).catch((error) => {
        this.setState({
          uploadSignUpDataState: '使用者資料上傳失敗'
        })
        console.log(error)
      })
  }

  initSubjectStoreFromSignUpStore = () => {
    this.SubjectStore.setUid(this.uid)
    this.SubjectStore.setEmail(this.email)
    this.SubjectStore.setNickName(this.SignUpStore.nickname)
    this.SubjectStore.setAddress(this.SignUpStore.address)
    this.SubjectStore.setBirthday(this.SignUpStore.birthday)
    this.SubjectStore.setBio(null)
    this.SubjectStore.setPhotoUrl(this.SignUpStore.photoUrl)
    this.SubjectStore.setPhotos({ this.SignUpInStore.photourl: true }) 
    this.SubjectStore.setLanguages(DefaultLanguages)  
    this.SubjectStore.setHobbies(DefaultHobbies)    
    this.SubjectStore.setVip(false) ///////// 難處理 /////////
    this.SubjectStore.sexualOrientation(this.sexualOrientationToString()) ///////// 難處理 /////////
  }

  handleAppStateChange = nextAppState => {
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
