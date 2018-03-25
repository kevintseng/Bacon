import React, { Component }  from 'react'
import { AppState, Platform, NativeModules } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import GeoFire from 'geofire'
import Geolocation from  'Geolocation'
import Moment from 'moment'
import MomentLocale from 'moment/locale/zh-tw'
import InAppBilling from 'react-native-billing'
import iapReceiptValidator from 'iap-receipt-validator'
// 演算法
import { calculateAge } from '../../../api/Utils'
// 頁面
import Loading from '../../views/Loading/Loading'
// 設定
import DefaultLanguages from '../../../configs/DefaultLanguages'

const { InAppUtils } = NativeModules

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
    // Listener
    this.redPointListener = null
    this.timestampListener = null
  }

  componentWillMount() {
    this.firebase.auth().onAuthStateChanged( async user => {
      if (user) {
        this.SubjectStore.setUid(user.uid) // 設置 uid
        this.SubjectStore.setEmail(user.email) // 設置 email
        if (this.ControlStore.authenticateIndicator == '註冊') {
          ///////// 非同步 /////////
          //this.setRedPointListener()
          this.uploadSignUpData() // 非同步上傳大頭照
          AppState.addEventListener('change', this.handleAppStateChange ) // 非同步註冊 app 狀態監聽
          this.initSubjectStoreFromSignUpStore() // 同步轉移資料
          this.setCurrentTimestampListener()
          this.uxSignIn(this.SignUpStore.email,this.SignUpStore.password)
        } else { 
          // 從登入來的
          //移除所有監聽函數 初始化狀態
          this.initialize()
          //this.setRedPointListener()
          this.setOnline(true) // 非同步設置使用者上線
          ///////// 非同步 /////////
          AppState.addEventListener('change', this.handleAppStateChange ) // 非同步註冊 app 狀態監聽
          this.initSubjectStoreFromFirebase() // 非同步抓使用者資料 邂逅監聽
          this.setCurrentTimestampListener()
          await this.setVip()
          await this.initPreySexualOrientation()
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
    this.removeMeetChanceListener() // 移除地理監聽
    this.removeRedPointListener() // 移除紅點監聽
    this.removeTimestampListener() //  移除時間監聽
    this.SignUpStore.initialize() // 初始註冊入狀態
    this.SignInStore.initialize() // 初始化登入狀態
    this.SubjectStore.initialize() // 初始主體入狀態
    this.MeetChanceStore.initialize()
    this.MeetCuteStore.initialize()
    this.FateStore.initialize()
    this.ChatStore.initialize()
  }

  uploadSignUpData = () => {
    // 上傳註冊資料
    this.firebase.storage().ref('images/avatars/' + this.SubjectStore.uid + '/' + Object.keys(this.SignUpStore.album)[0] + '.jpg')
    .putFile(this.SignUpStore.avatar.replace('file:/',''), metadata)
    .then(uploadedFile => {
      const album = new Object
      album[Object.keys(this.SignUpStore.album)[0]] = uploadedFile.downloadURL
      this.firebase.database().ref('bonus/' + this.SubjectStore.uid).set(0)
      this.firebase.database().ref('users/' + this.SubjectStore.uid).set({
        avatar: uploadedFile.downloadURL,
        album: album,
        preySexualOrientation: this.oppositeSexualOrientationToString(),
        address: this.SignUpStore.address,
        nickname: this.SignUpStore.nickname,
        birthday: this.SignUpStore.birthday,
        online: true,
        chatStatus: 0
      }).then(() => { 
        //console.log('上傳註冊資料成功')
        this.firebase.database().ref('meetCuteList/' + this.sexualOrientationToString() + '/' + this.SubjectStore.uid).set(true)
        this.geoUploadFire = new GeoFire(this.firebase.database().ref('/meetChanceList/' + this.sexualOrientationToString()))
        this.geoQueryFire = new GeoFire(this.firebase.database().ref('/meetChanceList/' + this.oppositeSexualOrientationToString()))
        this.uploadLocationWhenSignUp()
      }).catch(() => {
        //console.log('上傳註冊資料失敗')
      })
    }).catch(() => {
      //console.log('使用者大頭照上傳失敗')
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
          if (snap.val().preySexualOrientation) {
            // 如果有性別
            this.geoUploadFire = new GeoFire(this.firebase.database().ref('/meetChanceList/' + this.reverseString(snap.val().preySexualOrientation)))
            this.geoQueryFire = new GeoFire(this.firebase.database().ref('/meetChanceList/' + snap.val().preySexualOrientation))
            this.uploadLocationWhenSignIn(snap.val().latitude,snap.val().longitude)
          }
        } else {
          //
        }
      }, error => {
        console.log(error)
      })
      // bonus
      this.firebase.database().ref('bonus/' + this.SubjectStore.uid).once('value',snap => {
        this.SubjectStore.setBonus(parseInt(snap.val()) || 0)
      }, error => {
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
    this.MeetCuteStore.setLatitude(latitude)
    this.MeetCuteStore.setLongitude(longitude)
  }

  setVip = async () => {
    let isSubscription_premium_1y = false
    let isSubscription_premium_3m = false
    if (Platform.OS === "android") {
      await InAppBilling.close()
      try {
        await InAppBilling.open()
        await InAppBilling.getSubscriptionTransactionDetails('premium_1y').then(
          details => {
            const subscriptionIdArray = details.developerPayload.split(':')
            if (subscriptionIdArray[subscriptionIdArray.length -1] === this.SubjectStore.uid) {
              //this.SubjectStore.setVip(true) // boolean
              //console.log(details)
              isSubscription_premium_1y = true
            }
          }
        ).catch(err => console.log(err))
        await InAppBilling.getSubscriptionTransactionDetails('premium_3m').then(
          details => {
            const subscriptionIdArray = details.developerPayload.split(':')
            if (subscriptionIdArray[subscriptionIdArray.length -1] === this.SubjectStore.uid) {
              //this.SubjectStore.setVip(true) // boolean
              //console.log(details)
              isSubscription_premium_3m = true
            }
          }
        ).catch(err => console.log(err))
      } catch (err) {
        console.log(err)      
      } finally {
        this.SubjectStore.setVip(isSubscription_premium_1y || isSubscription_premium_3m)
        await InAppBilling.close()
      }
    } else { // iOS
      const password = 'd882b9dc156a47b4ae2ff9a094fc53c5'; // Shared Secret from iTunes connect
      const production = false; // use sandbox or production url for validation
      const validateReceipt = iapReceiptValidator(password, production);
        //InAppUtils.loadProducts(['com.kayming.bacon.premium_3m','com.kayming.bacon.premium_1y'],(error, products) => {
          InAppUtils.receiptData(async (error, receiptData)=> {
            if(receiptData) {
               try {
                  const validationData = await validateReceipt(receiptData);
                  const expires_date = validationData['latest_receipt_info'][0].expires_date.substring(0, 19)
                  alert(Date.parse(expires_date))
              //product_id
              //transaction_id
                  // check if Auto-Renewable Subscription is still valid
                  // validationData['latest_receipt_info'][0].expires_date > today
              } catch(err) {
                  alert('error : ' + err.message)
              //    console.log(err.valid, err.error, err.message)
              }
            } else {
              alert('no receiptData')
            }
          })
        //})

      /*
      const password = 'd882b9dc156a47b4ae2ff9a094fc53c5'; // Shared Secret from iTunes connect
      const production = true; // use sandbox or production url for validation
      const validateReceipt = iapReceiptValidator(password, production);
          try {
              const validationData = await validateReceipt('com.kayming.bacon.premium_3m');
              alert(validationData['latest_receipt_info'][0].expires_date)
              // check if Auto-Renewable Subscription is still valid
              // validationData['latest_receipt_info'][0].expires_date > today
          } catch(err) {
              alert('error : ' + err.message)
          //    console.log(err.valid, err.error, err.message)
          }
      */
    }
  }

  setRedPointListener = () => {
    this.redPointListener = this.firebase.database().ref('visitorList/' + this.SubjectStore.uid).orderByChild('showRedPoint').equalTo(true)
    this.redPointListener.on('value',child => {
      this.SubjectStore.setFateBadgeCount(child._childKeys.length)
    })
  }

  setCurrentTimestampListener = () => {
    this.timestampListener = this.firebase.database().ref('currentTimeStamp')
    this.firebase.database().ref('currentTimeStamp').on('value',snap => {
      const currentTimeStamp = snap.val()
      const dateString = Moment(currentTimeStamp).format("YYYYMMDD")
      this.SubjectStore.setCurrentDate(dateString)
    })
  }

  // removeListener

  removeRedPointListener = () => {
    if (this.redPointListener) {
      this.redPointListener.off()
      this.redPointListener = null
    }
  }

  removeTimestampListener = () => {
    if (this.timestampListener) {
      this.timestampListener.off()
      this.timestampListener = null
    }
  }

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