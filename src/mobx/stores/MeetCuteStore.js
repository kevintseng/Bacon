import { observable, action, computed, useStrict, runInAction } from 'mobx'
import _ from 'lodash'
import { calculateAge } from '../../app/Utils'
import localdb from '../../configs/localdb'

useStrict(true)

export default class MeetCuteStore {

  @observable haveNewPreys
  @observable loading
  //@observable imageLoading
  @observable firstLoading
  //@observable carouselLoading
  // user data
  @observable nickname
  @observable bio
  @observable birthday
  @observable languages
  @observable hobbies
  @observable album
  @observable vip
  @observable emailVerified
  @observable photoVerified
  // config
  //@observable meetCuteMinAge
  //@observable meetCuteMaxAge  

  constructor(firebase) {
    this.firebase = firebase
    this.initialize()
  }

  @computed get age() {
    return calculateAge(this.birthday)
  }

  @computed get languagesToString() {
    return Object.keys(this.languages).filter(key => this.languages[key] === true).join()
  }

  @computed get albumToArray() {
    return Object.keys(this.album).map((key) => (this.album[key]))
  }

  @computed get hobbiesToFlatList() {
    return Object.keys(this.hobbies).map((key,index) => ({ key: key, check: this.hobbies[key] }))
    // { 打球: true } -> [{key: 打球, check: true}]
  }

  @action initialize = () => {
    this.pool = new Array
    this.preyList = new Array
    this.preyListHistory = new Array
    this.haveNewPreys = false
    this.loading = false
    this.firstLoading = true
    //this.imageLoading = false
    //this.carouselLoading = false
    this.poolLastLenght = 0
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
    this.emailVerified = false
    this.photoVerified = false
    // config
    this.meetCuteMinAge = 18
    this.meetCuteMaxAge = 99
    this.imageLoadingCount = 0
  }

  @action addPreyToPool = (uid,birthday) => {
    this.pool.push({uid: uid, birthday: birthday})
  }

  @action setPreyList = async () => {
    await localdb.getIdsForKey('preyListHistory').then(ids => {
      this.preyListHistory = ids
    })
    //console.log('this.preyListHistory : ' + this.preyListHistory)
    while (this.haveNewPreys === false) {
      if ((this.poolLastLenght !== this.pool.length) || (this.clean === true)) {
        this.poolLastLenght = this.pool.length
        this.clean === false
        this.preyList = _.cloneDeep(this.pool)
        this.preyList = this.preyList.filter(ele => !(this.preyListHistory.includes(ele.uid))) // 排除 45 天
        this.preyList = this.preyList.filter(ele => ( (calculateAge(ele.birthday) >= this.meetCuteMinAge) && (calculateAge(ele.birthday) <= this.meetCuteMaxAge) ) ) // 過濾年紀
        this.shuffle(this.preyList)
        if (this.preyList.length > 0) {
          this.setFirstPrey()
          break
        }
      }
      await this.sleep(300)
    }
  }

  @action setFirstPrey = async () => {
    //await this.sleep(300)
    this.index = 0
    this.uid = this.preyList[this.index].uid
    await this.firebase.database().ref('users/' + this.uid).once('value', snap => {
      if (snap.val()) {
        runInAction(() => {
          this.nickname = snap.val().nickname
          this.bio = snap.val().bio
          this.birthday = snap.val().birthday
          this.languages = snap.val().languages || new Object
          this.hobbies = snap.val().hobbies || new Object
          this.album = snap.val().album || new Object
          this.vip = Boolean(snap.val().vip)
          this.emailVerified = Boolean(snap.val().emailVerified)
          this.photoVerified = Boolean(snap.val().photoVerified)
        })
      } else {
        //this.initializeCourt()
      }
    })
    runInAction(() => {
      this.haveNewPreys = true
    })
  }

  @action pickNextPrey = async () => {
    localdb.save({
      key: 'preyListHistory',
      id: this.uid,
      data: null,
      expires: 1000 * 60   
    })
    //this.preyListHistory.push(this.uid)
    this.index = this.index + 1
    if (this.index === this.preyList.length) {
      this.haveNewPreys = false // 沒人了
      this.setPreyList()
    } else {
      this.uid = this.preyList[this.index].uid
      localdb.save({
        key: 'preyListHistory',
        id: this.uid,
        data: null,
        expires: 1000 * 60   
      })
      //this.preyListHistory.push(this.uid)
      this.fetchPrey()
    }
  }

  @action fetchPrey = async () => {
    runInAction(() => {
      this.loading = true
      this.imageLoadingCount = 0
    })
    await this.firebase.database().ref('users/' + this.uid).once('value', snap =>{
      if (snap.val()) {
        runInAction(() => {
          this.nickname = snap.val().nickname
          this.bio = snap.val().bio
          this.birthday = snap.val().birthday
          this.languages = snap.val().languages || new Object
          this.hobbies = snap.val().hobbies || new Object
          this.album = snap.val().album || new Object
          this.vip = Boolean(snap.val().vip)
          this.emailVerified = Boolean(snap.val().emailVerified)
          this.photoVerified = Boolean(snap.val().photoVerified)
        })
      } else {
        alert('發生錯誤')
        //this.initializeCourt()
      }
    })
  }

  //@action setOnLoadStart = () => {
  //  this.imageLoading = true
  //}

  @action setOnLoadEnd = () => {
    this.imageLoadingCount ++
    if (this.imageLoadingCount === this.albumToArray.length || this.albumToArray.length === 0) {
      //console.warn(this.imageLoadingCount)
      if (this.index == 0) {
        this.showFirstPrey()
      } else {
        this.showPrey()
      }
      //console.log(this.albumToArray.length)
      //console.log(this.imageLoadingCount)
      //this.loading = false
    } else {
      //console.warn(this.imageLoadingCount)
    }
  }

  @action showPrey = async () => {
    await this.sleep(100)
    runInAction(() => {
      this.loading = false
    })
  }

  @action showFirstPrey = async () => {
    await this.sleep(100)
    runInAction(() => {
      this.firstLoading = false
    })
  }

  @action setCarouselOnLoadEnd = (boolean) => {
    //alert('dsdads')
    this.carouselLoading = boolean
  }

  @action cleanHistory = () => {
    localdb.getIdsForKey('preyListHistory').then(ids => {
    if (ids.length > 0) {
        //this.preyListHistory = new Array
        localdb.clearMapForKey('preyListHistory')
        this.clean = true
      }
    })
  }

  @action resetAge = () => {
    this.clean = true
    this.haveNewPreys = false
    this.setPreyList()
  }


  @action setMeetCuteMinAge = int => {
    this.meetCuteMinAge = int
  }

  @action setMeetCuteMaxAge = int => {
    this.meetCuteMaxAge = int
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

}