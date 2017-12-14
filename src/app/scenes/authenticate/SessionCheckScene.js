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
        //this.MeetCuteStore.setUid(user.uid)
        this.SubjectStore.setEmail(user.email) // 設置 email
        //this.FateStore.setSelfUid(user.uid) // 設置 uid
        //this.ChatStore.setUid(user.uid) // 設置 uid
        if (this.ControlStore.authenticateIndicator == '註冊') {
          ///////// 非同步 /////////
          this.uploadSignUpData() // 非同步上傳大頭照
          //this.uploadSignUpProfile() // 非同步上傳註冊資料
          //this.visitorsListener() // 來訪監聽
          //this.goodImpressionListener() // 好感監聽
          //this.matchListener() // 配對
          //this.chatRoomListener() // 聊天室配對
          //this.blockadeListener() // 封鎖
          //this.setOnline() // 非同步設置使用者上線
          //AppState.addEventListener('change', this.handleAppStateChange ) // 非同步註冊 app 狀態監聽
          ///////// 同步 /////////
          //this.uploadEmailVerity()
          this.initSubjectStoreFromSignUpStore() // 同步轉移資料
          this.uxSignIn(this.SignUpStore.email,this.SignUpStore.password)
        } else { 
          // 從登入來的
          //移除所有監聽函數 初始化狀態
          this.initialize()
          ///////// 非同步 /////////
          this.initSubjectStoreFromFirebase() // 非同步抓使用者資料 邂逅監聽
          await this.initPreySexualOrientation()
          //this.setVip()
          //this.visitorsListener() // 來訪監聽
          //this.goodImpressionListener() // 好感監聽
          //this.matchListener() // 配對
          //this.chatRoomListener() // 聊天室配對
          //this.blockadeListener() // 封鎖
          //this.collectionDB() // 從LocalDB抓配對資料
          //this.setOnline() // 非同步設置使用者上線
          //AppState.addEventListener('change', this.handleAppStateChange ) // 非同步註冊 app 狀態監聽
          ///////// 同步 /////////
          //this.uploadEmailVerity()
        }
        Actions.Drawer({type: 'reset'}) // 進入 Drawer
      } else {
        // 入口點
        // 下線
        //this.setOffline()
        //移除所有監聽函數 初始化狀態
        this.initialize()
        // 沒有使用者登入 user = null
        Actions.Welcome({type: 'reset'}) // 轉到 Welcome
      }
    })
    Moment.updateLocale('zh-tw', MomentLocale)
  }

  initialize = () => {
    //AppState.removeEventListener('change', this.handleAppStateChange ) // 非同步移除 app 狀態監聽
    this.removeMeetChanceListener() // 非同步移除地理監聽
    //this.removeMeetCuteListener() // 移除邂逅監聽
    this.removeVisitorsListener() // 移除邂逅監聽
    this.removeGoodImpressionListener() // 移除好感監聽
    this.removeMatchListener() // 配對
    this.removeChatRoomListener() // 聊天室配對
    this.removeBlockadeListener() // 封鎖
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
        bonus: 0
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
        //this.setLocation(location.coords.latitude,location.coords.longitude)
      },
      error => {
        if (this.SignUpStore.latitude && this.SignUpStore.longitude) {
          this.uploadLocationToProfile(this.SignUpStore.latitude,this.SignUpStore.longitude)
          this.uploadLocationToMeetChanceList(this.SignUpStore.latitude,this.SignUpStore.longitude)
          this.setGeoQuery(this.SignUpStore.latitude,this.SignUpStore.longitude)
          //this.setLocation(this.SignUpStore.latitude,this.SignUpStore.longitude)
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
        //this.setLocation(location.coords.latitude,location.coords.longitude)
      },
      error => {
        //獲取手機地理位置失敗，拿上次資料
        if (latitude && longitude) {
          this.uploadLocationToProfile(latitude,longitude)
          this.uploadLocationToMeetChanceList(latitude,longitude)
          this.setGeoQuery(latitude,longitude)
          //this.setLocation(latitude,longitude)
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
      console.log(uid)
      // ToDo: 同性戀要另外演算法
      // 丟到meetChancePool裡
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
    //
    //this.SubjectStore.setVisitConvSentToday(0)
    //this.geoFire = new GeoFire(this.firebase.database().ref('/user_locations/' + this.sexualOrientationToString()))
    //this.MeetCuteStore.setSexualOrientation(this.sexualOrientationToString())
    //this.ChatStore.setNickname(this.SignUpStore.nickname)
    //this.ControlStore.setSyncDetector(true) // 同步完成
    //this.meetCuteListener() // 非同步邂逅監聽
    //this.uploadLocation() // 上傳GPS資料 巧遇監聽
    //this.uxSignIn() // 讓登入頁留住帳號密碼
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
          this.SubjectStore.setChatStatus(snap.val().chatStatus)
          this.SubjectStore.setBonus(parseInt(snap.val().bonus) || 0)
          //this.MeetCuteStore.setSexualOrientation(snap.val().sexualOrientation)
          //this.SubjectStore.setConversations(snap.val().conversations)
          //this.SubjectStore.setVisitConvSentToday(snap.val().visitConvSentToday || 0)
          //this.SubjectStore.setUnhandledPass(new Object(snap.val().unhandledPass) || {})
          // tasks
          if (snap.val().preySexualOrientation) {
            // 如果有性別
            this.geoUploadFire = new GeoFire(this.firebase.database().ref('/meetChanceList/' + this.reverseString(snap.val().preySexualOrientation)))
            this.geoQueryFire = new GeoFire(this.firebase.database().ref('/meetChanceList/' + snap.val().preySexualOrientation))
            this.uploadLocationWhenSignIn(snap.val().latitude,snap.val().longitude)
          }
          //
          this.SubjectStore.setTask1(snap.val().task1)
          this.SubjectStore.setTask2(snap.val().task2)
          this.SubjectStore.setTask3(snap.val().task3)
          this.SubjectStore.setTask4(snap.val().task4)
          this.SubjectStore.setTask5(snap.val().task5)
          this.SubjectStore.setTask6(snap.val().task6)
          this.SubjectStore.setTask7(snap.val().task7)
          // hide
          this.SubjectStore.setHideMeetCute(snap.val().hideMeetCute || false)
          this.SubjectStore.setHideMeetChance(snap.val().hideMeetChance || false)
          this.SubjectStore.setHideVister(snap.val().hideVister || false)
          this.SubjectStore.setHideMessage(snap.val().hideMessage || false)
          // stars
          this.SubjectStore.setAllArticlesStars(snap.val().stars || { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })
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

  initPreySexualOrientation = () => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/preySexualOrientation').once('value',
      (snap) => {
        //console.warn(snap.val())
        this.SubjectStore.setPreySexualOrientation(snap.val())
      })
  }

  uxSignIn = (email,password) => {
    this.SignInStore.setEmail(email)
    this.SignInStore.setPassword(password)
  }

  // 聊天室

  chatRoomListener = () => {
    this.chatRoomCreaterQuery = this.firebase.database().ref('chat_rooms').orderByChild('chatRoomCreater').equalTo(this.SubjectStore.uid) // 自己發送的招呼
    this.chatRoomRecipientQuery = this.firebase.database().ref('chat_rooms').orderByChild('chatRoomRecipient').equalTo(this.SubjectStore.uid) // 別人發送的招呼
    /// add
    this.chatRoomCreaterQuery.on('child_added',child => {

        // value作法      
        /*  
        const chatRoomCreaterPromises = child._childKeys.filter(key => child.val()[key].interested === 2).map( key => (
          this.firebase.database().ref('users/' + child.val()[key].chatRoomRecipient).once('value').then( snap => {
            return(
              {
                key: key,
                prey: child.val()[key].chatRoomRecipient,
                name: snap.val().nickname,
                avatar: snap.val().avatar,
                age: calculateAge(snap.val().birthday),
                lastChatContent: child.val()[key].lastMessage,
                userState: '平淡中',
                userStateColor: '#FFD306',
                nonHandleChatCount: 2
              }
            )
          }).catch(err => {
            console.log(err)
          })         
        ))

        Promise.all(chatRoomCreaterPromises)
        .then(arr => {
          console.log(arr)
          this.ChatStore.setAllChatMatchPrey(arr)
        })
        .catch(err => {
          console.log(err)
        })
      */

      
      if (child.val().interested === 2) {
        this.firebase.database().ref('users/' + child.val().chatRoomRecipient).once('value').then( snap => {
          this.ChatStore.setChatMatchPrey({
            key: child.key,
            prey: child.val().chatRoomRecipient,
            name: snap.val().nickname,
            avatar: snap.val().avatar,
            age: calculateAge(snap.val().birthday),
            lastChatContent: child.val().lastMessage,
            userState: '平淡中',
            userStateColor: '#FFD306',
            nonHandleChatCount: 0         
          })
        })
      } else {
        this.firebase.database().ref('users/' + child.val().chatRoomRecipient).once('value').then( snap => {
          this.ChatStore.setChatSendPrey({
            key: child.key,
            prey: child.val().chatRoomRecipient,
            name: snap.val().nickname,
            avatar: snap.val().avatar,
            age: calculateAge(snap.val().birthday),
            lastChatContent: child.val().lastMessage,
            userState: '平淡中',
            userStateColor: '#FFD306',
            nonHandleChatCount: 0         
          })
        })
      }
      
    })

    this.chatRoomRecipientQuery.on('child_added',child => {

        // value作法
        /*
        const chatRoomRecipientPromises = child._childKeys.filter(key => child.val()[key].interested === 2).map( key => (
          this.firebase.database().ref('users/' + child.val()[key].chatRoomCreater).once('value').then( snap => {
            return(
              {
                key: key,
                prey: child.val()[key].chatRoomCreater,
                name: snap.val().nickname,
                avatar: snap.val().avatar,
                age: calculateAge(snap.val().birthday),
                lastChatContent: child.val()[key].lastMessage,
                userState: '平淡中',
                userStateColor: '#FFD306',
                nonHandleChatCount: 2
              }
            )
          }).catch(err => {
            console.log(err)
          })         
        ))

        Promise.all(chatRoomRecipientPromises)
        .then(arr => {
          console.log(arr)
          this.ChatStore.setAllChatMatchPrey(arr)
        })
        .catch(err => {
          console.log(err)
        })
        */
     
      if (child.val().interested === 2) {
        this.firebase.database().ref('users/' + child.val().chatRoomCreater).once('value').then( snap => {
          this.ChatStore.setChatMatchPrey({
            key: child.key,
            prey: child.val().chatRoomCreater,
            name: snap.val().nickname,
            avatar: snap.val().avatar,
            age: calculateAge(snap.val().birthday),
            lastChatContent: child.val().lastMessage,
            userState: '平淡中',
            userStateColor: '#FFD306',
            nonHandleChatCount: 0          
          })
        })
      } else if (child.val().interested === 1) {
        this.firebase.database().ref('users/' + child.val().chatRoomCreater).once('value').then( snap => {
          this.ChatStore.setChatVistorPrey({
            key: child.key,
            prey: child.val().chatRoomCreater,
            name: snap.val().nickname,
            avatar: snap.val().avatar,
            age: calculateAge(snap.val().birthday),
            lastChatContent: child.val().lastMessage,
            userState: '平淡中',
            userStateColor: '#FFD306',
            nonHandleChatCount: 0          
          })
        })
      }
     
    })
    /// changed
    
    this.chatRoomCreaterQuery.on('child_changed',child => {
      //console.log(child)
      if (child.val().interested === 2) {
        const chatRoom = this.ChatStore.chatMatchPrey.find(obj => obj.key === child.key)
        if (chatRoom) {
          chatRoom.lastChatContent = child.val().lastMessage
          //this.ChatStore.setAllChatMatchPrey(this.ChatStore.chatMatchPrey.slice()) // 能不能不要整個重render list
        } else {
          this.firebase.database().ref('users/' + child.val().chatRoomRecipient).once('value').then( snap => {
            this.ChatStore.addChatMatchPrey({
              key: child.key,
              prey: child.val().chatRoomRecipient,
              name: snap.val().nickname,
              avatar: snap.val().avatar,
              age: calculateAge(snap.val().birthday),
              lastChatContent: child.val().lastMessage,
              userState: '平淡中',
              userStateColor: '#FFD306',
              nonHandleChatCount: 0         
            })
            //this.ChatStore.setAllChatMatchPrey(this.ChatStore.chatMatchPrey.slice()) // 能不能不要整個重render list
          })
          //this.ChatStore.setChatMatchPrey(child.val())
          // 加入新chatRoom
        }
      } else {
        const chatRoom = this.ChatStore.chatSendPrey.find(obj => obj.key === child.key)
        //console.warn(chatRoom)
        chatRoom.lastChatContent = child.val().lastMessage
        this.ChatStore.setAllChatSendPrey(this.ChatStore.chatSendPrey.slice()) // 能不能不要整個重render list
      }
    })

    this.chatRoomRecipientQuery.on('child_changed',child => {
      console.log(child)
      if (child.val().interested === 2) {
        const chatRoom = this.ChatStore.chatMatchPrey.find(obj => obj.key === child.key)
        if (chatRoom) {
          chatRoom.lastChatContent = child.val().lastMessage
          //this.ChatStore.setAllChatMatchPrey(this.ChatStore.chatMatchPrey.slice()) // 能不能不要整個重render list
        } else {
          this.firebase.database().ref('users/' + child.val().chatRoomCreater).once('value').then( snap => {
            this.ChatStore.addChatMatchPrey({
              key: child.key,
              prey: child.val().chatRoomRecipient,
              name: snap.val().nickname,
              avatar: snap.val().avatar,
              age: calculateAge(snap.val().birthday),
              lastChatContent: child.val().lastMessage,
              userState: '平淡中',
              userStateColor: '#FFD306',
              nonHandleChatCount: 0          
            })
            //this.ChatStore.setAllChatMatchPrey(this.ChatStore.chatMatchPrey.slice()) // 能不能不要整個重render list
          })
          //this.ChatStore.setChatMatchPrey(chatRoom)
          // 加入新chatRoom
        }
      }
    })
    

/*
    this.chatRoomCreaterQuery = this.firebase.database().ref('chat_rooms').orderByChild('chatRoomCreater').equalTo(this.SubjectStore.uid) // 自己發送的招呼
    this.chatRoomCreaterQuery.on('child_added',child => {
      this.firebase.database().ref('users/' + child.val().chatRoomRecipient).once('value').then( snap => {
        this.ChatStore.addPreyToChatRoomCreaterPool(child.key,child.val().interested,child.val().chatRoomRecipient,snap.val().nickname,snap.val().avatar,child.val().lastMessage,calculateAge(snap.val().birthday),child.val()[child.val().chatRoomRecipient])
      })
      
      this.firebase.database().ref('chat_rooms/' + child.key).on('child_changed',changed_child => {
        if (changed_child.key === 'lastMessage') {
          // 最後一則訊息變了
          this.ChatStore.changeChatRoomCreaterPoolLastMessage(child.key,changed_child.val())
        } else if (changed_child.key === 'interested') {
          // 接受度變了
          this.ChatStore.changeChatRoomCreaterPoolInterested(child.key,changed_child.val())
        }
      })
    })
    this.chatRoomRecipientQuery = this.firebase.database().ref('chat_rooms').orderByChild('chatRoomRecipient').equalTo(this.SubjectStore.uid) // 別人發送的招呼
    this.chatRoomRecipientQuery.on('child_added',child => {
      this.firebase.database().ref('users/' + child.val().chatRoomCreater).once('value').then( snap => {
        this.ChatStore.addPreyToChatRoomRecipientPool(child.key,child.val().interested,child.val().chatRoomCreater,snap.val().nickname,snap.val().avatar,child.val().lastMessage,calculateAge(snap.val().birthday),child.val()[child.val().chatRoomCreater])
      })
      
      this.firebase.database().ref('chat_rooms/' + child.key).on('child_changed',changed_child => {
        if (changed_child.key === 'lastMessage') {
          // 最後一則訊息變了
          this.ChatStore.changeChatRoomRecipientPoolLastMessage(child.key,changed_child.val())
        } else if (changed_child.key === 'interested') {
          // 接受度變了
          this.ChatStore.changeChatRoomRecipientPoolInterested(child.key,changed_child.val())
        }
      })
    })
*/
  }

  // removeListener


  removeMeetChanceListener = () => {
    if (this.geoUploadFire) {
      //console.warn(this.geoUploadFire)
      //this.geoUploadFire.cancel()
      this.geoUploadFire = null
      this.geoQuery = null
    }
    if (this.geoQueryFire) {
      //console.warn(this.geoQueryFire)
      //this.geoQueryFire.cancel()
      this.geoQueryFire = null
      this.geoQuery = null
    }
  }

  removeVisitorsListener = () => {
    if (this.visitorsQuery) {
      this.visitorsQuery.off()
      this.visitorsQuery = null
    }
  }

  removeGoodImpressionListener = () => {
    if (this.goodImpressionQuery) {
      this.goodImpressionQuery.off()
      this.goodImpressionQuery = null
    }
  }

  removeMatchListener = () => {
    if (this.matchQuery) {
      this.matchQuery.off()
      this.matchQuery = null
    }
  }

  removeChatRoomListener = () => {
    if (this.chatRoomCreaterQuery) {
      this.chatRoomCreaterQuery.off()
      this.chatRoomCreaterQuery = null
    } 
    if (this.chatRoomRecipientQuery) {
      this.chatRoomRecipientQuery.off()
      this.chatRoomRecipientQuery = null
    }        
  }

  removeBlockadeListener = () => {
    if (this.blockadeQuery_A) {
      this.blockadeQuery_A.off()
      this.blockadeQuery_A = null
    }
    if (this.blockadeQuery_B) {
      this.blockadeQuery_B.off()
      this.blockadeQuery_B = null
    }
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

  render() {
    return (
      <Loading />
    )
  }
}


  /*

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  updateVisitConvInvites = () => {
    const start = Moment().startOf("day").unix()
    const end = Moment().endOf("day").unix()
    let sent = 0
    this.firebase.database().ref(`users/${this.SubjectStore.uid}/conversations/`)
    .orderByChild("createTime")
    .startAt(start)
    .endAt(end)
    .once("value")
    .then(snap => {
      sent = snap.numChildren()
      snap.forEach(child => {
        if (child.val().wooer != this.SubjectStore.uid) {
          sent -= 1
        }
      })
      return sent
    })
    .then(() => {
      console.log("Total new convs today: ", sent)
      this.SubjectStore.setVisitConvSentToday(sent)
      this.firebase.database().ref(`users/${this.SubjectStore.uid}/visitConvSentToday/`).set(sent)
    })
  }

  seekMeetQs = sexualOrientation => {
    switch (sexualOrientation) {
      case 'msf':
        this.mq('fsm')
        break
      case 'msm':
        this.mq('msm')
        break
      case 'fsm':
        this.mq('msf')
        break
      case 'fsf':
        this.mq('fsf')
        break
    }
  }

  mq = sexualOrientation => {
    //this.meetCuteQuery = this.firebase.database().ref('users').orderByChild('sexualOrientation').equalTo(sexualOrientation)
    //this.meetCuteQuery.on('child_added', child => {
    //  this.MeetCuteStore.addPreyToPool(child.key,child.val().birthday)
    //})
    //this.meetCuteQuery.on('child_changed', child => {
      // birthday changed
    //  if (this.MeetCuteStore.pool[child.key] !== child.val().birthday) {
    //    this.MeetCuteStore.addPreyToPool(child.key,child.val().birthday)
    //  }
    //})
    //this.firebase.database().ref('users').orderByChild('sexualOrientation').equalTo(sexualOrientation).limitToLast(100).once('value',snap => {
    //  this.MeetCuteStore.setNewPreys(snap.val())
    //})
    this.firebase.database().ref('msf/meetCuteList').orderByChild('meetCuteList/aaa').equalTo(null).once('value',snap => {
      console.log(snap.val())
    })
  }

  removeMeetCuteListener = () => {
    if (this.meetCuteQuery) {
      this.meetCuteQuery.off()
      this.meetCuteQuery = null
    }
  }

/*
  meetChanceListener = (geoQuery) => {
    geoQuery.on('key_entered', (uid, location, distance) => {
      console.warn(uid)
      //if (uid !== this.SubjectStore.uid) {
      //  this.firebase.database().ref('users/' + uid).once('value').then( snap => {
      //    if (snap.val().sexualOrientation === this.reverseString(this.SubjectStore.sexualOrientation) && snap.val().album) {
      //      this.MeetChanceStore.addPreyToPool(uid,distance,snap.val().nickname,snap.val().avatar,snap.val().birthday,snap.val().hideMeetChance,snap.val().deleted,snap.val().online,snap.val().popularityDen,snap.val().popularityNum)
      //    }
      //  })
      //}
    })

    geoQuery.on('key_moved', (uid, location, distance) => {
      console.warn(uid)
      //if (uid !== this.SubjectStore.uid) {
        //this.MeetChanceStore.updatePreyToPool(uid,distance)
        // 這裡常常會掛掉
      //}
    })

    geoQuery.on('key_exited', (uid, location, distance) => {
      console.warn(uid)
      //if (uid !== this.SubjectStore.uid) {
      //  this.MeetChanceStore.removePreyToPool(uid)
      //}
    })

  setLocation = (latitude,longitude) => {
    this.SubjectStore.setLatitude(latitude)
    this.SubjectStore.setLongitude(longitude)
    this.MeetCuteStore.setLatitude(latitude)
    this.MeetCuteStore.setLongitude(longitude)
    this.MeetChanceStore.setLatitude(latitude)
    this.MeetChanceStore.setLongitude(longitude)
    this.FateStore.setLatitude(latitude)
    this.FateStore.setLongitude(longitude)
  }
  }

  uploadSignUpProfile = () => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid).set({
      // 非同步上傳註冊資料
      sexualOrientation: this.sexualOrientationToString(),
      address: this.SignUpStore.address,
      nickname: this.SignUpStore.nickname,
      birthday: this.SignUpStore.birthday,
      //vip: false,
      bonus: 0
    }).then(() => {
        this.ControlStore.setSignUpDataUploadIndicator('使用者資料上傳成功')
      }).catch((error) => {
        this.ControlStore.setSignUpDataUploadIndicator('使用者資料上傳失敗')
        console.log(error)
      })
  }

  uploadEmailVerity = () => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/emailVerified').set(this.firebase.auth().currentUser.emailVerified)
    this.SubjectStore.setEmailVerified(this.firebase.auth().currentUser.emailVerified)
  }


  meetCuteListener = () => {
    this.seekMeetQs(this.SubjectStore.sexualOrientation)
  }


  visitorsListener = () => {
    this.visitorsQuery = this.firebase.database().ref('visitors').orderByChild('prey').equalTo(this.SubjectStore.uid)
    this.visitorsQuery.on('child_added', child => {
      this.FateStore.addPreyToVisitorsPool(child.val().wooer,child.val().time)
    })
  }

  goodImpressionListener = () => {
    this.goodImpressionQuery = this.firebase.database().ref('goodImpression').orderByChild('prey').equalTo(this.SubjectStore.uid)
    this.goodImpressionQuery.on('child_added', child => {
      this.FateStore.addPreyToGoodImpressionPool(child.val().wooer,child.val().time)
      this.MeetCuteStore.addPreyToGoodImpressionPool(child.val().wooer,child.val().time)
    })
    this.goodImpressionQuery.on('child_removed', child => {
      this.FateStore.removePreyToGoodImpressionPool(child.val().wooer)
      this.MeetCuteStore.addPreyToGoodImpressionPool(child.val().wooer,child.val().time)
    })
  }

  matchListener = () => {
    this.matchQuery = this.firebase.database().ref('goodImpression').orderByChild('wooer').equalTo(this.SubjectStore.uid)
    this.matchQuery.on('child_added', child => {
      this.FateStore.addPreyToMatchPool(child.val().prey,child.val().time)
      this.MeetCuteStore.addPreyToMatchPool(child.val().prey,child.val().time)
    })
    this.matchQuery.on('child_removed', child => {
      this.FateStore.removePreyToMatchPool(child.val().prey)
      this.MeetCuteStore.removePreyToMatchPool(child.val().prey)
    })
  }

  blockadeListener = () => {
    this.blockadeQuery_A = this.firebase.database().ref('blockade').orderByChild('wooer').equalTo(this.SubjectStore.uid)
    this.blockadeQuery_B = this.firebase.database().ref('blockade').orderByChild('prey').equalTo(this.SubjectStore.uid)
    this.blockadeQuery_A.on('child_added', child => {
      this.MeetCuteStore.addPreyToblockadePool(child.val().prey,child.val().time)
      this.MeetChanceStore.addPreyToblockadePool(child.val().prey,child.val().time)

    })
    this.blockadeQuery_B.on('child_added', child => {
      this.MeetCuteStore.addPreyToblockadePool(child.val().wooer,child.val().time)
      this.MeetChanceStore.addPreyToblockadePool(child.val().prey,child.val().time)
    })
  }

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
    this.firebase.database().ref('/users/' + this.SubjectStore.uid + '/online').set(true)
    this.firebase.database().ref('/online/' + this.SubjectStore.uid).set({
      lastOnline: Math.floor(Date.now() / 1000),
      location: 'Taipei, Taiwan'
    })
    // onlineDaysMonth
    this.firebase.database().ref('/users/' + this.SubjectStore.uid + '/onlineDaysMonth').once('value',snap => {
      const onlineDaysMonth = snap.val() || new Object
      const time_now = new Date()
      const this_month = time_now.getMonth() + 1 // getMonth 都會少一個月 時區問題？
      const today = time_now.getFullYear() + '-' + this_month + '-' + time_now.getDate()
      Object.keys(onlineDaysMonth).forEach(key => {
        if (parseInt(key.split('-')[1]) !== this_month) {
          delete onlineDaysMonth[key] // 清除不屬於這個月份的登入日期
        }
      })
      onlineDaysMonth[today] = true
      this.firebase.database().ref('/users/' + this.SubjectStore.uid + '/onlineDaysMonth').set(onlineDaysMonth)
      this.SubjectStore.setOnlineDaysMonth(onlineDaysMonth)
      //console.log(onlineDaysMonth)
    })
  }

  setOffline() {
    this.firebase.database().ref('/users/' + this.SubjectStore.uid + '/online').set(false)
    // 計算上線時間
    this.firebase.database().ref('/users/' + this.SubjectStore.uid).once('value',snap => {
      const lastOnlineTime = snap.val().onlineTime || 0
      this.firebase.database().ref('/online/' + this.SubjectStore.uid).once('value',snap => {
        const lastOnline = snap.val().lastOnline || 0
        const onlineTime = Math.floor(Date.now() / 1000) - lastOnline
        this.firebase.database().ref('/users/' + this.SubjectStore.uid + '/onlineTime').set(lastOnlineTime + onlineTime)
        this.firebase.database().ref('/online/' + this.SubjectStore.uid).remove().catch(err => { console.log(err) })
      })
    })
  }

  setVip = () => {
    if (Platform.OS === "android") {
      InAppBilling.open()
      .then(() => InAppBilling.getSubscriptionDetailsArray(['3_month', 'premium_3m']).then( productDetailsArray => {
        if (productDetailsArray.length > 0) {
          this.SubjectStore.setVip(true)
        } else {
          this.SubjectStore.setVip(false)
        }
      }).catch(err => console.log(err)))
      .catch(err => console.log(err))
    } else { // iOS
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/vip').once('value').then((snap)=> {
        if (snap.exists()) {
          if (snap.val()) {
            this.SubjectStore.setVip(true)
          } else {
            this.SubjectStore.setVip(false)
          }
        }
      })
    }
  }
*/
  
