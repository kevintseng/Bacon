import { observable, action, computed, useStrict, runInAction, toJS } from 'mobx'
import _ from 'lodash'
import { calculateAge } from '../../app/Utils'

useStrict(true)

export default class MeetChanceStore {

  @observable preys
  // court
  @observable loading
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
  //@observable synchronize

  constructor(firebase) {
    this.firebase = firebase
    this.initialize()
  }

  // court
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

  @computed get preysToFlatList() {
    return toJS(this.preys)
  }

  @action initialize = () => {
    this.pool = new Array
    this.preyList = new Array
    this.preys = new Array
    // court
    this.loading = true
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
    this.meetChanceMinAge = 18
    this.meetChanceMaxAge = 99
  }

  // pool

  @action addPreyToPool = prey => {
    this.pool.push(prey)
  }

  @action updatePreyToPool = (uid,distance) => {
    const ele = this.pool.find(ele => ele.uid === uid)
    if (ele) {
      ele.distance = distance
    }
  }

  @action removePreyToPool = uid => {
    this.pool = this.pool.filter(ele => !(ele.uid === uid))
  }

  // pleylist = _.cloneDeep(pool)

  @action setPreyList = () => {
    this.preyList = toJS(this.pool)
    this.preyList.sort((a, b) => {
      return a.distance > b.distance ? 1 : -1
    })
  }

  @action setFakePreys = () => {
    this.preys = this.preyList.map((ele,index)=>({ key: ele.uid, nickname: null, avatar: null }))
  }

  @action setRealPreys = async () => {
    await Promise.all(this.preyList.map(async (ele,index) => {
      await this.firebase.database().ref('users/' + ele.uid).once('value').then(snap => {
        if (snap.val()) {
          if (snap.val().hideMeetChance || snap.val().deleted ||  calculateAge(snap.val().birthday) < this.meetChanceMinAge || calculateAge(snap.val().birthday) > this.meetChanceMaxAge) {
            runInAction(() => {
              this.preys[index] = null // 隱身了 或 帳號刪除了
            })
          } else {
            runInAction(() => {
              this.preys[index].nickname = snap.val().nickname
              this.preys[index].avatar = snap.val().avatar
            })
          }
        }
      }).catch(err => console.log(err))
    }))
    runInAction(() => {
      this.preys = this.preys.filter(ele => ele)
      if (this.preys.length > 3) {
        this.preys.length = this.preys.length - this.preys.length % 3
      }
    })
  }


  @action setCourtInitialize = uid => {
    this.loading = true
    this.uid = uid
  }

  @action setPrey = async () => {
    await this.firebase.database().ref('users/' + this.uid).once('value', snap =>{
      if (snap.val()) {
        runInAction(() => {
          this.uid = this.uid
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
        console.warn('error')
        //this.initializeCourt()
      }
    }).catch(err => {console.log(err)})
    //await this.sleep(300)
    runInAction(() => {
      this.loading = false
    })
  }

  @action setMeetChanceMinAge = int => {
    this.meetChanceMinAge = int
  }

  @action setMeetChanceMaxAge = int => {
    this.meetChanceMaxAge = int
  }

  @action cleanLoading = () => {
    this.loading = false
  }
  
  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

}
