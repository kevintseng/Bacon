import { observable, action, computed, useStrict, runInAction } from 'mobx'
import _ from 'lodash'
import geolib from 'geolib'
import { calculateAge } from '../../app/Utils'
import localdb from '../../configs/localdb'

useStrict(true)

export default class MeetCuteStore {

  @observable haveNewPreys
  @observable loading
  @observable firstLoading
  // user data
  @observable nickname
  @observable bio
  @observable birthday
  @observable languages
  @observable hobbies
  @observable album
  @observable vip
  @observable distance
  @observable emailVerified
  @observable photoVerified
  @observable latitude
  @observable longitude
  @observable address

  constructor(firebase) {
    this.firebase = firebase
    this.initialize()
  }

  @computed get age() {
    return calculateAge(this.birthday)
  }

  @computed get languagesToString() {
    return Object.keys(this.languages).filter(key => this.languages[key] !== 0).map( key => key + this.masterLevel(this.languages[key]) ).join('，')
    //return Object.keys(this.languages).filter(key => this.languages[key] === true).join()
  }

  @computed get albumToArray() {
    return Object.keys(this.album).map((key) => (this.album[key]))
  }

  @computed get hobbiesToFlatList() {
    return Object.keys(this.hobbies).map((key,index) => ({ key: key, check: this.hobbies[key] }))
    // { 打球: true } -> [{key: 打球, check: true}]
  }

  @action initialize = () => {
    this.pool = new Object
    this.preyList = new Array
    this.haveNewPreys = false
    this.loading = false
    this.firstLoading = true
    this.firstLoad = false
    this.poolLastLenght = 0
    this.poolLength = 0
    this.clean = false
    this.index = 0
    // user data
    this.uid = null
    this.nickname = null
    this.bio = null
    this.birthday = null
    this.languages = new Object
    this.hobbies = new Object
    this.album = new Object
    this.vip = false
    this.distance = null
    this.emailVerified = false
    this.photoVerified = false
    this.latitude = null
    this.longitude = null
    this.address = null
    // config
    this.meetCuteMinAge = 18
    this.meetCuteMaxAge = 50
    this.meetCuteRadar = false
    this.meetCuteThreePhotos = false
    this.imageLoadingCount = 0
    // mate
    this.goodImpressionPool = new Object
    this.matchPool = new Object
    // blockade
    this.blockadePool = new Object
  }

  @action addPreyToGoodImpressionPool = (uid,time) => {
    this.goodImpressionPool[uid] = time
  }

  @action removePreyToGoodImpressionPool = uid => {
    delete this.goodImpressionPool[uid]
  }

  @action addPreyToMatchPool = (uid,time) => {
    this.matchPool[uid] = time
  }

  @action addPreyToblockadePool = (uid,time) => {
    this.blockadePool[uid] = time
  }

  @action removePreyToMatchPool = uid => {
    delete this.matchPool[uid]
  }

  @action addPreyToPool = (uid,birthday) => {
    this.pool[uid] = birthday
  }

  @action setPreyList = () => {
    localdb.getIdsForKey('preyListHistory').then(preyListHistory => {
      this.serachLoop(preyListHistory,this.filterMatchList(),this.filterBlockadeList())
    })
  }

  @action serachLoop = async (preyListHistory,matchList,blockadeList) => {
    while (this.haveNewPreys === false) {
      this.preyList = Object.keys(this.pool).map(uid => ({uid: uid, birthday: this.pool[uid]}))
      this.poolLength = this.preyList.length
      if ( (this.poolLength > this.poolLastLenght) || (this.clean === true) ) {
        this.poolLastLenght = this.poolLength
        this.clean = false
        this.preyList = this.preyList.filter(ele => 
          ( !(preyListHistory.includes(ele.uid)) && !(matchList.includes(ele.uid)) && !(blockadeList.includes(ele.uid)) && ele.birthday && ((calculateAge(ele.birthday) >= this.meetCuteMinAge) && (calculateAge(ele.birthday) <= (this.meetCuteMaxAge === 50 ? 99 : this.meetCuteMaxAge) )) )
        ) // 排除 45 天 // 排除配對 // 排除封鎖 // 過濾年紀
        this.shuffle(this.preyList)
        if (this.preyList.length > 0) {
          this.setFirstPrey()
          break
        }
      }
      await this.sleep(300)
    }    
  }

  @action filterMatchList = () => {
    const wooerList = Object.keys(this.goodImpressionPool)
    const PreyList = Object.keys(this.matchPool)
    this.matchPreylist = wooerList.map(uid => {
      if (PreyList.indexOf(uid) > -1) {
        return uid
      } else {
        return null
      }
    })
    this.matchPreylist = this.matchPreylist.filter(ele => ele)
    return this.matchPreylist
  }

  @action filterBlockadeList = () => {
    return Object.keys(this.blockadePool)
  }

  @action setFirstPrey = async () => {
    this.firstLoad = true
    this.index = 0
    this.uid = this.preyList[this.index].uid
    runInAction(() => {
      this.imageLoadingCount = 0
    })
    await this.firebase.database().ref('users/' + this.uid).once('value', async snap => {
      if (snap.val() && snap.val().album && !(snap.val().hideMeetCute) && !(snap.val().deleted) && this.checkPhoto(snap.val().album)) {
        //const favorabilityDen = snap.val().favorabilityDen || 0
        //const favorabilityNum = snap.val().favorabilityNum || 0
        //this.firebase.database().ref('users/' + this.uid + '/favorabilityDen').set(favorabilityDen + 1)
        //this.firebase.database().ref('users/' + this.uid + '/favorability').set(favorabilityNum/(favorabilityDen + 1))
        runInAction(() => {
          this.nickname = snap.val().nickname
          this.bio = snap.val().bio
          this.birthday = snap.val().birthday
          this.languages = snap.val().languages || new Object
          this.hobbies = snap.val().hobbies || new Object
          this.album = this.handleNewAlbum(snap.val().album,snap.val().avatar)
          this.vip = Boolean(snap.val().vip)
          this.distance = this.getDistance(snap.val().latitude,snap.val().longitude)
          this.emailVerified = Boolean(snap.val().emailVerified)
          this.photoVerified = Boolean(snap.val().photoVerified)
          this.address = snap.val().address
        })
        runInAction(() => {
          this.haveNewPreys = true
          if (this.albumToArray.length === 0) {
            this.showFirstPrey()
          }
        })
        localdb.save({
          key: 'preyListHistory',
          id: this.uid,
          data: null,
          expires: 1000 * 60   
        })
      } else {
        this.pickNextPrey()
        console.log('隱藏了')
      }
    })
  }

  @action pickNextPrey = async () => {
    this.index = this.index + 1
    if (this.index === this.preyList.length) {
      this.haveNewPreys = false // 沒人了
      this.loading = false
      this.setPreyList()
    } else {
      this.uid = this.preyList[this.index].uid
      this.fetchPrey()
    }
  }

  @action fetchPrey = async () => {
    runInAction(() => {
      this.loading = true
      this.imageLoadingCount = 0
    })
    await this.firebase.database().ref('users/' + this.uid).once('value', async snap => {
      if (snap.val() && snap.val().album && !(snap.val().hideMeetCute) && !(snap.val().deleted) && this.checkPhoto(snap.val().album) ) {
        // 過濾隱藏
        //const favorabilityDen = snap.val().favorabilityDen || 0
        //const favorabilityNum = snap.val().favorabilityNum || 0
        //this.firebase.database().ref('users/' + this.uid + '/favorabilityDen').set(favorabilityDen + 1)
        //this.firebase.database().ref('users/' + this.uid + '/favorability').set(favorabilityNum/(favorabilityDen + 1))
        runInAction(() => {
          this.nickname = snap.val().nickname
          this.bio = snap.val().bio
          this.birthday = snap.val().birthday
          this.languages = snap.val().languages || new Object
          this.hobbies = snap.val().hobbies || new Object
          this.album = this.handleNewAlbum(snap.val().album,snap.val().avatar)//snap.val().album || new Object
          this.vip = Boolean(snap.val().vip)
          this.distance = this.getDistance(snap.val().latitude,snap.val().longitude)
          this.emailVerified = Boolean(snap.val().emailVerified)
          this.photoVerified = Boolean(snap.val().photoVerified)
          this.address = snap.val().address
        })
        runInAction(() => {
          this.haveNewPreys = true
          if (this.albumToArray.length === 0) {
            this.showPrey()
          }
        })
        localdb.save({
          key: 'preyListHistory',
          id: this.uid,
          data: null,
          expires: 1000 * 60   
        })
      } else {
        this.pickNextPrey()
        console.log('隱藏了')
      }
    })
  }

  @action setOnLoadEnd = async () => {
    this.imageLoadingCount ++
    if (this.imageLoadingCount === this.albumToArray.length || this.albumToArray.length === 0) {
      await this.sleep(100)
      if (this.firstLoad === true) {
        this.showFirstPrey()
      } else {
        this.showPrey()
      }
    } else {
      //
    }
  }

  @action showPrey = () => {
    this.loading = false
  }

  @action showFirstPrey = () => {
    this.loading = false
    this.firstLoading = false
  }

  @action setCarouselOnLoadEnd = (boolean) => {
    this.carouselLoading = boolean
  }

  @action cleanHistory = () => {
    localdb.getIdsForKey('preyListHistory').then(ids => {
    if (ids.length > 0) {
      localdb.clearMapForKey('preyListHistory').then(()=>{
        this.clean = true
        }
      )}
    })
  }

  @action setfirstLoad = boolean => {
    this.firstLoad = boolean
  }

  @action resetAge = () => {
    this.clean = true
    this.haveNewPreys = false
  }


  @action setMeetCuteMinAge = int => {
    this.meetCuteMinAge = int
  }

  @action setMeetCuteMaxAge = int => {
    this.meetCuteMaxAge = int
  }

  @action setLatitude = latitude => {
    this.latitude = latitude
  }

  @action setLongitude = longitude => {
    this.longitude = longitude
  }

  @action setMeetCuteRadar = boolean => {
    this.meetCuteRadar = boolean
  }

  @action setMeetCuteThreePhotos = boolean => {
    this.meetCuteThreePhotos = boolean
  }

  shuffle = o => {
    for(let j, x, i = o.length; i;) {
      j = Math.floor(Math.random() * i);
      x = o[--i];
      o[i] = o[j]; 
      o[j] = x;
    } 
    return o
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  getDistance = (latitude,longitude) => {
    if (this.latitude && this.longitude && latitude && longitude) {
      const distance = (geolib.getDistance(
        {latitude: this.latitude, longitude: this.longitude},
        {latitude: latitude, longitude: longitude}
      )/1000).toFixed(1)
      if (distance === '0.0') {
        return '0.1'
      } else {
        return distance
      }
    } else {
      return '?'
    }  
  }

  checkPhoto = album => {
    // 高級會員三張以上照片
    const _album = new Object(album)
    const length = Object.keys(_album).length
    if (!this.meetCuteThreePhotos) {
      return true
    } else if (this.meetCuteThreePhotos && length >= 3) {
      return true
    } else {
      return false
    }
  }

  handleNewAlbum = (album,avatar) => {
    const key = this.getKeyByValue(album, avatar)
    delete album[key]
    album[0] = avatar
    return album || new Object
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value)
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

}