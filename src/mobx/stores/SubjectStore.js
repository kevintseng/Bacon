import { useStrict, observable, action, computed } from 'mobx'
import { calculateAge } from '../../app/Utils'

useStrict(true)

const DefaultLanguages = {
  中文: false,
  英文: false,
  韓文: false,
}

const DefaultHobbies = {
  打球: true,
  唱歌: true,
}

export default class SubjectStore {
  // user data
  @observable avatar
  @observable album
  @observable nickname
  @observable preySexualOrientation
  @observable address
  @observable birthday
  @observable bio
  @observable photos
  @observable vip
  @observable bonus
  @observable languages
  @observable hobbies
  @observable collect
  @observable emailVerified
  @observable photoVerified
  @observable radar
  @observable latitude
  @observable longitude
  @observable stars
  // hide function
  @observable hideMeetCute
  @observable hideMeetChance
  @observable hideVister
  @observable hideMessage
  @observable conversations
  @observable chatStatus
  @observable visitConvSentToday
  @observable unhandledPass
  // task 
  @observable tasks
  @observable meetCuteModal
  // meetCute
  @observable meetCutePreys
  @observable profileModal
  @observable settingModal

  constructor(firebase) {
    this.firebase = firebase
    this.initialize()
  }

  // String to Value

  @computed get age() {
    return calculateAge(this.birthday)
  }

  @computed get maxCollect() {
    return this.vip ? 10 : 5
  }

  // Object to String

  @computed get languagesToString() {
    return Object.keys(this.languages).filter(key => this.languages[key] !== 0).map( key => key + this.masterLevel(this.languages[key]) ).join('，')
    // { 中文: 1, 英文: 2 } -> 中文(一般),英文(普通)
  }

  // Object to Array FlatList

  @computed get albumToFlatList() {
    return Object.keys(this.album).sort().map((key, index) => ({ key, uri: this.album[key], avatar: this.album[key] === this.avatar }))
    // { url: true } -> [{key: index, uri: url}]
  }

  @computed get languagesToFlatList() {
    return Object.keys(this.languages).map((key, index) => ({ key, check: this.languages[key] }))
    // { 中文: true } -> [{key: 中文, check: true}]
  }

  @computed get hobbiesToFlatList() {
    return Object.keys(this.hobbies).map((key, index) => ({ key, check: this.hobbies[key] }))
    // { 打球: true } -> [{key: 打球, check: true}]
  }

  @computed get collectCount() {
    return Object.keys(this.collect).length
  }

  @computed get tasksToFlatList() {
    const tasks_title = ['電子郵件認證獎勵','上傳三張照片獎勵','完成自我介紹獎勵','完成興趣愛好獎勵']
    const tasks_bonus = [20,20,20,20]
    return Object.keys(this.tasks).map((key, index) => ({ key, task: tasks_title[index], bonus: tasks_bonus[index], taken: this.tasks[key] })).filter( ele => !ele.taken)
  }

  @computed get onlineDaysMonthLength() {
    return Object.keys(this.onlineDaysMonth).length
  }

  // action

  @action initialize = () => {
    // user data
    //this.uid = null
    //this.email = null
    this.nickname = null
    this.address = null
    this.birthday = null
    this.bio = null
    this.languages = DefaultLanguages
    this.hobbies = new Object
    this.collect = new Object
    this.album = new Object
    this.avatar = null
    this.vip = false
    this.preySexualOrientation = null // 有可能 null -> 萬一上傳失敗拿不到就永遠都是null了 -> 邂逅那邊先做特別處理
    this.emailVerified = false
    this.photoVerified = false
    // hide function
    this.hideMeetCute = false
    this.hideMeetChance = false
    this.hideVister = false
    this.hideMessage = false
    this.conversations = null
    this.chatStatus = 0
    this.bonus = null
    this.radar = [{
      "熱門度": 0,
      "好感度": 0,
      "友好度": 0,
      "活耀度": 0,
      "魅力值": 0,
    }]
    this.latitude = null
    this.longitude = null
    this.unhandledPass = new Object
    //
    this.tasks = {
      1: false,
      2: false,
      3: false,
      4: false
    }
    //
    this.stars = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    this.onlineDaysMonth = new Object
    this.meetCuteModal = true
    this.meetCutePreys = new Array
    this.profileModal = true
    this.settingModal = true
  }

  @action setUid = uid => {
    this.uid = uid
  }

  @action setEmail = str => {
    this.email = str
  }

  @action setNickname = str => {
    this.nickname = str
  }

  @action setBirthday = str => {
    this.birthday = str
  }

  @action setAddress = str => {
    this.address = str
  }

  @action setAvatar = url => {
    this.avatar = url
  }

  @action setPreySexualOrientation = str => {
    this.preySexualOrientation = str
  }

  @action setBio = str => {
    this.bio = str
  }

  @action setAlbum = object => {
    this.album = object
  }

  @action addPhoto = (key, url) => {
    this.album[key] = url
    this.album = Object.assign({}, this.album)
  }

  @action deletePhoto = key => {
    delete this.album[key]
    this.album = Object.assign({}, this.album)
  }

  @action setVip = boolean => {
    this.vip = boolean
  }

  @action setLanguages = object => {
    this.languages = object
  }

  @action setHobbies = object => {
    this.hobbies = object
  }

  @action setCollect = object => {
    this.collect = object
  }

  @action switchCollect = key => {
    if (this.collect[key]) {
      this.collect[key] = false
    } else {
      this.collect[key] = Date.now()
    }
    //this.collect[key] = !this.collect[key]
    this.collect = Object.assign({}, this.collect)
  }

  @action filterCollect = () => {
    this.collect = Object.keys(this.collect).reduce((r, e) => {
      if (this.collect[e] !== false ) r[e] = this.collect[e]
      return r;
    }, {})
  }

  @action setBonus = (bonus) => {
    this.bonus = bonus
  }

  @action setEmailVerified = boolean => {
    this.emailVerified = boolean
  }

  @action setRadar = radar => {
    this.radar = radar
  }

  @action setLatitude = latitude => {
    this.latitude = latitude
  }

  @action setLongitude = longitude => {
    this.longitude = longitude
  }
  // switch hide function

  @action switchHideMeetCute = () => {
    this.hideMeetCute = !this.hideMeetCute
  }

  @action switchHideMeetChance = () => {
    this.hideMeetChance = !this.hideMeetChance
  }

  @action switchHideVister = () => {
    this.hideVister = !this.hideVister
  }

  @action switchHideMessage = () => {
    this.hideMessage = !this.hideMessage
  }
  // set hide function
  @action setHideMeetCute = boolen => {
    this.hideMeetCute = boolen
  }

  @action setHideMeetChance = boolen => {
    this.hideMeetChance = boolen
  }

  @action setHideVister = boolen => {
    this.hideVister = boolen
  }

  @action setHideMessage = boolen => {
    this.hideMessage = boolen
  }

  //

  @action setVisitConvSentToday = val => {
    this.visitConvSentToday = val
  }

  @action setUnhandledPass = object => {
    this.unhandledPass = object
  }

  @action deleteUnhandledPass = key => {
    delete this.unhandledPass[key]
    this.unhandledPass = Object.assign({}, this.unhandledPass)
  }

  @action addUnhandledPass = (key) => {
    this.unhandledPass[key] = true
    this.unhandledPass = Object.assign({}, this.unhandledPass)
  }

  @action addOneToVisitConvSentToday = () => {
    this.visitConvSentToday = this.visitConvSentToday + 1
  }

  @action addBonus = (points) => {
    if (!this.bonus) {
      this.bonus = 0
    }
    this.bonus = this.bonus + points
  }

  @action deductBonus = (points) => {
    if (!this.bonus) {
      this.bonus = 0
    }
    const deducted = this.bonus - points
    if (deducted < 0 || !deducted) {
      this.bonus = 0
    } else {
      this.bonus = deducted
    }
    return this.bonus
  }

  @action setChatStatus = status => {
    this.chatStatus = status
  }

  @action setConversations = object => {
    this.conversations = object
  }

  @action addConv = (uid, data) => {
    this.conversations[uid] = data
    this.conversations = Object.assign({}, this.conversations)
  }

  @action deleteConv = (uid) => {
    delete this.conversations[uid]
    this.conversations = Object.assign({}, this.conversations)
  }

  @action setConvVisit = (uid, boolean) => {
    this.conversations[uid].visit = boolean
  }

  @action setAllArticlesStars = stars => {
    this.stars = stars
  }

  @action setStars = (id,rating) => {
    this.stars[id] = rating
  }

  // task

  @action setTask1 = boolean => {
    this.tasks[1] = boolean
  }

  @action setTask2 = boolean => {
    this.tasks[2] = boolean
  }

  @action setTask3 = boolean => {
    this.tasks[3] = boolean
  }

  @action setTask4 = boolean => {
    this.tasks[4] = boolean
  }

  @action setTask5 = boolean => {
    this.tasks[5] = boolean
  }

  @action setTask6 = boolean => {
    this.tasks[6] = boolean
  }

  @action setTask7 = boolean => {
    this.tasks[7] = boolean
  }

  @action setOnlineDaysMonth = onlineDaysMonth => {
    this.onlineDaysMonth = onlineDaysMonth
  }

  masterLevel = (check) => {
    switch(check) {
        case 0:
            return ''
            break;
        case 1:
            return '(一般)'
            break;
        case 2:
            return '(普通)'
            break;
        case 3:
            return '(精通)'
            break;
        case true: // 相容性
            return '(一般)'
            break;        
        default:
            return ''
    }     
  }

  // meetCute

  @action setMeetCutePreys = () => {
    // 先不隨機
    //alert(this.preySexualOrientation)
    this.firebase.database().ref('meetCuteList/' + this.preySexualOrientation).limitToLast(100).once('value',snap => {
      if (snap.val()) {
        const newPreys = Object.keys(snap.val()).map(uid => 
          this.firebase.database().ref('users/' + uid).once('value',snap => snap.val())
        )
   /*     
        this.newPreys = Object.keys(snap.val()).map(key => {
          const albumObject = this.handleNewAlbum(obj[key].album,obj[key].avatar)
          const album = Object.keys(albumObject).map(key => albumObject[key] ) 
          return({
            key: key,
            nickname: obj[key].nickname,
            album: album
          })
        })
    */   

    Promise.all(newPreys)
    .then(results => {
      this.meetCutePreys = results.map(snap => 
        {
          const albumObject = this.sortedAlbum(snap.val().album || new Object,snap.val().avatar)
          const album = Object.keys(albumObject).map(key => albumObject[key] ) 
          return({
            key: snap.key,
            nickname: snap.val().nickname,
            album: album
          })          
        }
      )
      this.meetCuteModal = false
    }).cacth(err => {
      console.log('錯誤')
      //console.warn(err)
    })
        
      } else {
        console.log('沒資料')
        //console.log('no data')
      }
    })

    // block 0r hiden
    //console.warn(this.uid)
    
    
  


    //const subPhotos = _allPhotos.slice(0, 50)  

    //const imagePrefetch = subPhotos.map(photo => Image.prefetch(photo))

    //const otherPhotos = allPhotos.slice(29, allPhotos.length)

    //Promise.all(imagePrefetch)
    //.then(results => {
      //console.warn("All images prefetched in parallel");
    //  this.modal = false
      //otherPhotos.forEach(photo => Image.prefetch(photo))
    //})
    //this.newPreys = toJS(this.newPreys)
    //console.log(this.newPreys)
  }

  @action cleanMeetCuteModal = () => {
    this.meetCuteModal = true
  }

  @action cleanProfileModal = () => {
    this.profileModal = true
  }

  @action openProfileModal = () => {
    this.profileModal = false
  }

  @action cleanSettingModal = () => {
    this.settingModal = true
  }

  @action openSettingModal = () => {
    this.settingModal = false
  }

  // 演算法

  sortedAlbum = (album,avatar) => {
    const key = this.getKeyByValue(album, avatar)
    delete album[key]
    album[0] = avatar
    return album || new Object
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value)
  }

  setMeetCuteModal = () => {
    this.meetCuteModal = true
    this.setMeetCutePreys()
  }



}
