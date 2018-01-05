import React, { Component }  from 'react'
import { AppState, Platform } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import GeoFire from 'geofire'
import Geolocation from  'Geolocation'
import Moment from 'moment'
import MomentLocale from 'moment/locale/zh-tw'
import InAppBilling from 'react-native-billing'

// 演算法
import { calculateAge } from '../../../app/Utils'
// 頁面
import Loading from '../../views/Loading/Loading'
// 設定
import DefaultLanguages from '../../../configs/DefaultLanguages'

const metadata = {
  contentType: 'image/jpeg'
}

@inject('ControlStore','SignUpStore','SignInStore','SubjectStore','SubjectEditStore','MeetChanceStore','MeetCuteStore','FateStore','LineStore','firebase','ChatStore') @observer
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
    this.LineStore = this.props.LineStore
    this.FateStore = this.props.FateStore
    this.ChatStore = this.props.ChatStore
    this.firebase = this.props.firebase
    this.lastAppState = AppState.currentState
    // 巧遇
    this.geoQuery = null
    this.geoUploadFire = null
    this.geoQueryFire = null

    ////////
    this.visitorsQuery = null
    this.goodImpressionQuery = null
    this.chatRoomCreaterQuery = null
    this.chatRoomRecipientQuery = null
    //this.collectionQuery = null
    this.matchQuery = null
    this.blockadeQuery_A = null
    this.blockadeQuery_B = null
  }

  componentWillMount() {
    this.firebase.auth().onAuthStateChanged( async user => {
      if (user) {
        this.SubjectStore.setUid(user.uid) // 設置 uid
        this.SubjectStore.setEmail(user.email) // 設置 email
        if (this.ControlStore.authenticateIndicator == '註冊') {
          ///////// 非同步 /////////
          this.uploadSignUpData() // 非同步上傳大頭照
          AppState.addEventListener('change', this.handleAppStateChange ) // 非同步註冊 app 狀態監聽
          //this.uploadSignUpProfile() // 非同步上傳註冊資料
          //this.visitorsListener() // 來訪監聽
          //this.goodImpressionListener() // 好感監聽
          //this.matchListener() // 配對
          //this.initChatRoomListener() // 聊天室配對
          //this.blockadeListener() // 封鎖
          
          ///////// 同步 /////////
          //this.uploadEmailVerity()
          this.initSubjectStoreFromSignUpStore() // 同步轉移資料
          this.uxSignIn(this.SignUpStore.email,this.SignUpStore.password)
        } else { 
          // 從登入來的
          //移除所有監聽函數 初始化狀態
          this.initialize()
          this.setOnline(true) // 非同步設置使用者上線
          ///////// 非同步 /////////
          AppState.addEventListener('change', this.handleAppStateChange ) // 非同步註冊 app 狀態監聽
          this.initSubjectStoreFromFirebase() // 非同步抓使用者資料 邂逅監聽
          //this.initChatRoomListener() // 聊天室配對
          await this.initPreySexualOrientation()
          //this.setVip()
          //this.visitorsListener() // 來訪監聽
          //this.goodImpressionListener() // 好感監聽
          //this.matchListener() // 配對
          //this.chatRoomListener() // 聊天室配對
          //this.blockadeListener() // 封鎖
          //this.collectionDB() // 從LocalDB抓配對資料
          ///////// 同步 /////////
          //this.uploadEmailVerity()
        }
        Actions.Drawer({type: 'reset'}) // 進入 Drawer
      } else {
        // 入口點
        // 下線
        await this.setOnline(false)
        //移除所有監聽函數 初始化狀態
        this.initialize()
        // 沒有使用者登入 user = null
        Actions.Welcome({type: 'reset'}) // 轉到 Welcome
      }
    })
    Moment.updateLocale('zh-tw', MomentLocale)
  }

  initialize = () => {
    AppState.removeEventListener('change', this.handleAppStateChange ) // 非同步移除 app 狀態監聽
    this.removeMeetChanceListener() // 非同步移除地理監聽
    //this.removeMeetCuteListener() // 移除邂逅監聽
    //this.removeVisitorsListener() // 移除邂逅監聽
    //this.removeGoodImpressionListener() // 移除好感監聽
    //this.removeMatchListener() // 配對
    //this.removeChatRoomListener() // 聊天室配對
    //this.removeBlockadeListener() // 封鎖
    this.SignUpStore.initialize() // 初始註冊入狀態
    this.SignInStore.initialize() // 初始化登入狀態
    this.SubjectStore.initialize() // 初始主體入狀態
    this.MeetChanceStore.initialize()
    this.MeetCuteStore.initialize()
    this.FateStore.initialize()
    this.ChatStore.initialize()
    //this.LineStore.initialize()
  }

  uploadSignUpData = () => {
    // 上傳註冊資料
    this.firebase.storage().ref('images/avatars/' + this.SubjectStore.uid + '/' + Object.keys(this.SignUpStore.album)[0] + '.jpg')
    .putFile(this.SignUpStore.avatar.replace('file:/',''), metadata)
    .then(uploadedFile => {
      const album = new Object
      album[Object.keys(this.SignUpStore.album)[0]] = uploadedFile.downloadURL
      this.firebase.database().ref('users/' + this.SubjectStore.uid).set({
        avatar: uploadedFile.downloadURL,
        album: album,
        preySexualOrientation: this.oppositeSexualOrientationToString(),
        address: this.SignUpStore.address,
        nickname: this.SignUpStore.nickname,
        birthday: this.SignUpStore.birthday,
        bonus: 0,
        online: true,
        chatStatus: 0
      }).then(() => { 
        console.log('上傳註冊資料成功')
        this.firebase.database().ref('meetCuteList/' + this.sexualOrientationToString() + '/' + this.SubjectStore.uid).set(true)
        this.geoUploadFire = new GeoFire(this.firebase.database().ref('/meetChanceList/' + this.sexualOrientationToString()))
        this.geoQueryFire = new GeoFire(this.firebase.database().ref('/meetChanceList/' + this.oppositeSexualOrientationToString()))
        this.uploadLocationWhenSignUp()
      }).catch(() => {
        console.log('上傳註冊資料失敗')
      })
    }).catch(() => {
      console.log('使用者大頭照上傳失敗')
    })
  }

  uploadLocationWhenSignUp = () => {
    Geolocation.getCurrentPosition(
      location => {
        // 抓到手機地理位置
        this.uploadLocationToProfile(location.coords.latitude,location.coords.longitude)
        this.uploadLocationToMeetChanceList(location.coords.latitude,location.coords.longitude)
        this.setGeoQuery(location.coords.latitude,location.coords.longitude)
        this.setLocation(location.coords.latitude,location.coords.longitude)
      },
      error => {
        if (this.SignUpStore.latitude && this.SignUpStore.longitude) {
          this.uploadLocationToProfile(this.SignUpStore.latitude,this.SignUpStore.longitude)
          this.uploadLocationToMeetChanceList(this.SignUpStore.latitude,this.SignUpStore.longitude)
          this.setGeoQuery(this.SignUpStore.latitude,this.SignUpStore.longitude)
          this.setLocation(this.SignUpStore.latitude,this.SignUpStore.longitude)
        } else {
          console.log('獲取地理位置失敗')
        }
      }
    )    
  }

  uploadLocationWhenSignIn = (latitude,longitude) => {
    Geolocation.getCurrentPosition(
      location => {
        // 抓手機地理位置成功
        this.uploadLocationToProfile(location.coords.latitude,location.coords.longitude)
        this.uploadLocationToMeetChanceList(location.coords.latitude,location.coords.longitude)
        this.setGeoQuery(location.coords.latitude,location.coords.longitude)
        this.setLocation(location.coords.latitude,location.coords.longitude)
      },
      error => {
        //獲取手機地理位置失敗，拿上次資料
        if (latitude && longitude) {
          this.uploadLocationToProfile(latitude,longitude)
          this.uploadLocationToMeetChanceList(latitude,longitude)
          this.setGeoQuery(latitude,longitude)
          this.setLocation(latitude,longitude)
        } else {
          console.log('獲取地理位置失敗')
        }
      }
    )    
  }

  uploadLocationToProfile = (latitude,longitude) => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/latitude').set(latitude)
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/longitude').set(longitude)
  }

  uploadLocationToMeetChanceList = (latitude,longitude) => {
    this.geoUploadFire.set(this.SubjectStore.uid,[latitude,longitude])
      .then(() => {
        console.log('獲取位置成功'+[latitude,longitude])
      }, error => {
        console.log('上傳位置失敗：' + error)
      }
    )    
  }

  setGeoQuery = (latitude,longitude) => {
    this.geoQuery = this.geoQueryFire.query({
      center: [latitude,longitude],
      radius: 394 // 台灣從北到南394公里
    })
    this.geoQuery.on('key_entered', (uid, location, distance) => {
      // ToDo: 同性戀要另外演算法
      this.firebase.database().ref('users/' + uid).once('value').then( snap => {
        this.MeetChanceStore.addPreyToPool(uid,distance,snap.val().nickname,snap.val().avatar,snap.val().birthday,snap.val().hideMeetChance,snap.val().deleted,snap.val().online)
      })
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
    this.SubjectStore.setCollect(new Object) // Object
    this.SubjectStore.setVip(false) // boolean
    this.SubjectStore.setBonus(0) // Int
    this.SubjectStore.setPreySexualOrientation(this.oppositeSexualOrientationToString())
    this.SubjectStore.setChatStatus(0)
  }

  initSubjectStoreFromFirebase = () => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid).once('value',
      (snap) => {
        if (snap.val()) {
          this.SubjectStore.setNickname(snap.val().nickname) // null(placeholder) String
          this.SubjectStore.setAddress(snap.val().address) // null(placeholder) String
          this.SubjectStore.setBirthday(snap.val().birthday) // null -> undefinded
          this.SubjectStore.setBio(snap.val().bio) // null(placeholder) String
          this.SubjectStore.setAvatar(snap.val().avatar) // null(placeholder) String Url
          this.SubjectStore.setAlbum(new Object(snap.val().album)) // Object
          this.SubjectStore.setLanguages(Object.assign({}, DefaultLanguages, snap.val().languages)) // Object
          this.SubjectStore.setHobbies(new Object(snap.val().hobbies)) // Object
          this.SubjectStore.setCollect(new Object(snap.val().collect)) // Object
          this.SubjectStore.setChatStatus(snap.val().chatStatus || 0)
          this.SubjectStore.setBonus(parseInt(snap.val().bonus) || 0)
          if (snap.val().preySexualOrientation) {
            // 如果有性別
            this.geoUploadFire = new GeoFire(this.firebase.database().ref('/meetChanceList/' + this.reverseString(snap.val().preySexualOrientation)))
            this.geoQueryFire = new GeoFire(this.firebase.database().ref('/meetChanceList/' + snap.val().preySexualOrientation))
            this.uploadLocationWhenSignIn(snap.val().latitude,snap.val().longitude)
          }
          // Tasks
          this.SubjectStore.setTask1(snap.val().task1)
          this.SubjectStore.setTask2(snap.val().task2)
          this.SubjectStore.setTask3(snap.val().task3)
          this.SubjectStore.setTask4(snap.val().task4)
          // hide
          //this.SubjectStore.setHideMeetCute(snap.val().hideMeetCute || false)
          //this.SubjectStore.setHideMeetChance(snap.val().hideMeetChance || false)
          //this.SubjectStore.setHideVister(snap.val().hideVister || false)
          //this.SubjectStore.setHideMessage(snap.val().hideMessage || false)
          // stars
          //this.SubjectStore.setAllArticlesStars(snap.val().stars || { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })
          // meetCute config
          //this.MeetCuteStore.setMeetCuteMinAge(snap.val().meetCuteMinAge || 18)
          //this.MeetCuteStore.setMeetCuteMaxAge(snap.val().meetCuteMaxAge || 50)
          //this.MeetCuteStore.setMeetCuteRadar(snap.val().meetCuteRadar)
          //this.MeetCuteStore.setMeetCuteThreePhotos(snap.val().meetCuteThreePhotos)
          // meetChance config
          //this.MeetChanceStore.setMeetChanceMinAge(snap.val().meetChanceMinAge || 18)
          //this.MeetChanceStore.setMeetChanceMaxAge(snap.val().meetChanceMaxAge || 50)
          //this.MeetChanceStore.setMeetChanceRadar(snap.val().meetChanceRadar)
          //this.MeetChanceStore.setMeetChanceOfflineMember(snap.val().meetCuteOfflineMember)
          // LineStore
          //this.LineStore.setUid(this.SubjectStore.uid)
          //this.LineStore.fetchConvList()
          //
          //this.SubjectStore.setLatitude(snap.val().latitude || 25.028031)
          //this.SubjectStore.setLongitude(snap.val().longitude || 121.516815)
          //this.MeetCuteStore.setLatitude(snap.val().latitude || 25.028031)
          //this.MeetCuteStore.setLongitude(snap.val().longitude || 121.516815)
          //this.MeetChanceStore.setLatitude(snap.val().latitude || 25.028031)
          //this.MeetChanceStore.setLongitude(snap.val().longitude || 121.516815)
          //this.FateStore.setLatitude(snap.val().latitude || 25.028031)
          //this.FateStore.setLongitude(snap.val().longitude || 121.516815)
          //
          //this.ChatStore.setNickname(snap.val().nickname)
          //
        } else {
          //
        }
        //this.ControlStore.setSyncDetector(true) // 同步完成
      }, error => {
        //this.ControlStore.setSyncDetector(true) // 同步完成
        console.log(error)
      })

  }

  initPreySexualOrientation = () => (
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/preySexualOrientation').once('value',
      (snap) => {
        this.SubjectStore.setPreySexualOrientation(snap.val())
      })
  )

  uxSignIn = (email,password) => {
    this.SignInStore.setEmail(email)
    this.SignInStore.setPassword(password)
  }

  setOnline = bollean => {
    if (this.SubjectStore.uid) {
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/online').set(bollean)
    }
  }

  handleAppStateChange = nextAppState => {
    if (AppState.currentState === 'active') {
      this.setOnline(true) // 設置使用者上線
    } else if (this.lastAppState.match('active') && (nextAppState === 'inactive' || nextAppState === 'background')) {
      this.setOnline(false) // 設置使用者下線
    }
    this.lastAppState = nextAppState
  }

  setLocation = (latitude,longitude) => {
    this.SubjectStore.setLatitude(latitude)
    this.SubjectStore.setLongitude(longitude)
  }

  // removeListener
  removeMeetChanceListener = () => {
    if (this.geoUploadFire) {
      this.geoUploadFire = null
    }
    if (this.geoQueryFire) {
      this.geoQueryFire = null
    }
    if (this.geoQuery) {
      this.geoQuery.cancel()
      this.geoQuery = null
    }
  }

  render() {
    return (
      <Loading />
    )
  }

  //////演算法//////

  reverseString = str => {
    return str.split("").reverse().join("")
  }

  genderToString = () => (
    this.SignUpStore.gender ? 'm' : 'f'
  )

  sexualOrientationToString = () => (
    this.SignUpStore.sexualOrientation ? (this.genderToString() + 's' + this.genderToString()) : (this.genderToString() + 's' + (this.SignUpStore.gender ? 'f' : 'm'))
  )

  oppositeSexualOrientationToString = () => (
    this.SignUpStore.sexualOrientation ? (this.genderToString() + 's' + this.genderToString()) : ((this.SignUpStore.gender ? 'f' : 'm') + 's' + this.genderToString())
  )

}