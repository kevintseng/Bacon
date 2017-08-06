import React, { Component }  from 'react'
import { AppState } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import GeoFire from 'geofire'
import Geolocation from  'Geolocation'
import UUIDGenerator from 'react-native-uuid-generator'

import Loading from '../../views/Loading/Loading'

const metadata = {
  contentType: 'image/jpeg'
}

const DefaultLanguages =  { 
  中文: false, 
  英文: false, 
  韓文: false
}

@inject('ControlStore','SignUpStore','SignInStore','SubjectStore','SubjectEditStore','MeetChanceStore','MeetCuteStore','firebase',) @observer
export default class SessionCheckScene extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.SignUpStore = this.props.SignUpStore
    this.SignInStore = this.props.SignInStore
    this.SubjectStore = this.props.SubjectStore
    this.SubjectEditStore = this.props.SubjectEditStore
    this.MeetChanceStore = this.props.MeetChanceStore
    this.MeetCuteStore = this.props.MeetCuteStore
    this.firebase = this.props.firebase
    this.lastAppState = AppState.currentState
    this.geoQuery = null
    this.geoFire = null
    this.mqQuery = null
  }

  componentWillMount() {
    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // 使用者登入 只要登入成功一定有 uid
        this.SubjectStore.setUid(user.uid)
        this.SubjectStore.setEmail(user.email) // String
        if (this.ControlStore.authenticateIndicator == '註冊') {
          this.uploadAvatar() // 非同步上傳相簿
          this.uploadSignUpData() // 非同步上傳註冊資料  
          this.setOnline() // 非同步設置使用者上線
          AppState.addEventListener('change', this.handleAppStateChange ) // 非同步註冊 app 狀態監聽
          this.uploadLocation() // 上傳GPS資料 巧遇
          this.initSubjectStoreFromSignUpStore() // 同步轉移資料
          this.grepMeetCute() // 邂逅
        } else {
          // 全部都是非同步
          this.setOnline() // 非同步設置使用者上線
          AppState.addEventListener('change', this.handleAppStateChange ) // 非同步註冊 app 狀態監聽
          this.uploadLocation() // 上傳GPS資料 巧遇
          this.initSubjectStoreFromFirebase() // 非同步抓使用者資料
        }
        Actions.Drawer({type: 'reset'}) // 切換場景
      } else {
        // 入口點 -> 沒有使用者登入 user = null
        // 移除所有監聽函數 初始化狀態
        AppState.removeEventListener('change', this.handleAppStateChange ) // 非同步移除 app 狀態監聽
        this.removeMeetChanceListener() // 非同步移除地理監聽
        this.removeMeetCuteListener() // 移除邂逅監聽
        this.SignUpStore.initialize() // 初始註冊入狀態
        this.SignInStore.initialize() // 初始化登入狀態
        this.SubjectStore.initialize() // 初始主體入狀態
        this.MeetChanceStore.initialize()
        Actions.Welcome({type: 'reset'}) // 轉到註冊登入頁面
      }
    })    
  }

  uploadAvatar = () => {
    // 非同步上傳大頭照
    this.firebase.storage().ref('images/avatars/' + this.SubjectStore.uid + '/' + Object.keys(this.SignUpStore.album)[0] + '.jpg')  
    .putFile(this.SignUpStore.avatar.replace('file:/',''), metadata)
    .then(uploadedFile => {
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/avatar').set(uploadedFile.downloadUrl)
      .then(() => {
          this.firebase.database().ref('users/' + this.SubjectStore.uid + '/album' + '/' + Object.keys(this.SignUpStore.album)[0]).set(uploadedFile.downloadUrl)
        .then(() => {
            this.ControlStore.setAvatarUploadIndicator('使用者大頭照上傳成功')
          })
        .catch(() => {
          this.ControlStore.setAvatarUploadIndicator('使用者大頭照上傳失敗')
          })
      })
      .catch(() => {
        this.ControlStore.setAvatarUploadIndicator('使用者大頭照上傳成功')
      })      
    })
    .catch(() => {
      this.ControlStore.setAvatarUploadIndicator('使用者大頭照上傳失敗')
    })
  }

  uploadSignUpData = () => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid).set({
      // 非同步上傳註冊資料
      sexualOrientation: this.sexualOrientationToString(),
      address: this.SignUpStore.address,
      nickname: this.SignUpStore.nickname,
      birthday: this.SignUpStore.birthday,
    }).then(() => {
        this.ControlStore.setSignUpDataUploadIndicator('使用者資料上傳成功')
      }).catch((error) => {
        this.ControlStore.setSignUpDataUploadIndicator('使用者資料上傳失敗')
        console.log(error)
      })
  }

  initSubjectStoreFromSignUpStore = () => {
    this.SubjectStore.setNickname(this.SignUpStore.nickname) // String
    this.SubjectStore.setAddress(this.SignUpStore.address) // String
    this.SubjectStore.setBirthday(this.SignUpStore.birthday) // String
    this.SubjectStore.setBio(null) // null(placeholder)
    this.SubjectStore.setAvatar(this.SignUpStore.avatar) // String
    this.SubjectStore.setAlbum(this.SignUpStore.album) // Object 
    this.SubjectStore.setLanguages(DefaultLanguages) // Object 
    this.SubjectStore.setHobbies(new Object) // Object 
    this.SubjectStore.setVip(false) // boolean
    this.SubjectStore.setSexualOrientation(this.sexualOrientationToString())
    this.ControlStore.setSyncDetector(true) // 同步完成
  }

  initSubjectStoreFromFirebase = async () => {
    await this.firebase.database().ref('users/' + this.SubjectStore.uid).once('value',
      (snap) => {
        if (snap.val()) {
          console.log(snap.val().sexualOrientation)
          this.SubjectStore.setNickname(snap.val().nickname) // null(placeholder) String
          this.SubjectStore.setAddress(snap.val().address) // null(placeholder) String
          this.SubjectStore.setBirthday(snap.val().birthday) // null -> undefinded
          this.SubjectStore.setBio(snap.val().bio) // null(placeholder) String
          this.SubjectStore.setAvatar(snap.val().avatar) // null(placeholder) String Url
          this.SubjectStore.setAlbum(new Object(snap.val().album)) // Object 
          this.SubjectStore.setLanguages(snap.val().languages || DefaultLanguages) // Object 
          this.SubjectStore.setHobbies(new Object(snap.val().hobbies)) // Object 
          this.SubjectStore.setVip(Boolean(snap.val().vip))
          this.SubjectStore.setSexualOrientation(snap.val().sexualOrientation) //null(placeholder->邂逅) String
        } else {
          //this.SubjectStore.initialize()
        }
        this.ControlStore.setSyncDetector(true) // 同步完成
      }, error => {
        //this.SubjectStore.initialize()
        this.ControlStore.setSyncDetector(true) // 同步完成
        console.log(error)
      })
    this.grepMeetCute() // 邂逅
  }

  genderToString = () => (
    this.SignUpStore.gender ? 'm' : 'f'
  )

  sexualOrientationToString = () => (
    this.SignUpStore.sexualOrientation ? (this.genderToString() + 's' + this.genderToString()) : (this.genderToString() + 's' + (this.SignUpStore.gender ? 'f' : 'm'))    
  )

  handleAppStateChange = nextAppState => {
    if (AppState.currentState === 'active') {
      this.setOnline() 
      // 設置使用者上線
    } else if (this.lastAppState.match('active') && (nextAppState === 'inactive' || nextAppState === 'background')) {
      this.setOffline() 
      // 設置使用者下線
    }
    this.lastAppState = nextAppState
  }

  setOnline = () => {
    this.firebase.database().ref("/online/" + this.SubjectStore.uid).set({
      lastOnline: Math.floor(Date.now() / 1000),
      location: "Taipei, Taiwan"
    })
  }

  setOffline() {
    this.firebase.database().ref("/online/" + this.SubjectStore.uid).remove()
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
        this.MeetChanceStore.addPreyToPool({uid: uid, distance: distance})
      }
    })

    geoQuery.on("key_moved", (uid, location, distance) => {
      if (!(uid === this.SubjectStore.uid)) {
        this.MeetChanceStore.updatePreyToPool(uid,distance)
      }
    })

    geoQuery.on("key_exited", (uid, location, distance) => {
      if (!(uid === this.SubjectStore.uid)) {
        this.MeetChanceStore.removePreyToPool(uid)
      }
    })
  }

  removeMeetChanceListener = () => {
    if (this.geoQuery) {
      this.geoQuery.cancel()
    }
  }

  removeMeetCuteListener = () => {
    if (this.mqQuery) {
      this.mqQuery.remove()
    }
  }

  grepMeetCute = () => {
    this.seekMeetQs(this.SubjectStore.sexualOrientation)
  }

  seekMeetQs = sexualOrientation => {
    switch (sexualOrientation) {
      case "msf":
        this.mq("fsm");
        break;
      case "msm":
        this.mq("msm");
        break;
      case "fsm":
        this.mq("msf");
        break;
      case "fsf":
        this.mq("fsf");
        break;
    }
  }

  mq = sexualOrientation => {
    this.mqQuery = this.firebase.database().ref('users').orderByChild('sexOrientation').equalTo(sexualOrientation)
    this.mqQuery.on('value', snap => {
      snap.forEach( childsnap => {
        this.MeetCuteStore.addPreyToPool(childsnap.key)
      })
    })
  }

  render() {
    return(
      <Loading/>
  )}
}