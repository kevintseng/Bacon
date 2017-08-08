import { observable, action, computed, useStrict, runInAction } from 'mobx'
import _ from 'lodash'
import { calculateAge } from '../../app/Utils'

useStrict(true)

export default class MeetCuteStore {

  @observable haveNewPreys
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

  @action initialize = () => {
    this.pool = new Array
    this.preyList = new Array
    this.preyListHistory = new Array
    this.haveNewPreys = false
    this.loading = false
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
  }

  @action addPreyToPool = prey => {
    this.pool.push(prey)
  }

  @action noHaveNewPreys = () => {
    this.preyList = new Array
    this.haveNewPreys = false
  }

  @action setPreyList = async () => {
    while (this.haveNewPreys === false) {
      this.preyList = _.cloneDeep(this.pool)
      this.preyList = this.preyList.filter(ele => !(this.preyListHistory.includes(ele))) // 排除 45 天
      this.shuffle(this.preyList)
      if (this.preyList.length > 0) {
        this.setFirstPrey()
        break
      }
      await this.sleep(3000)
    }
  }

  @action setFirstPrey = async () => {
    this.uid = this.preyList[0]
    this.preyListHistory.push(this.uid)
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
        //this.initializeCourt()
      }
    })
    runInAction(() => {
      this.haveNewPreys = true
    })
  }

  @action pickNextPrey = () => {
    const index = this.preyList.indexOf(this.uid) + 1
    if (index === 0) {
      // 沒人了
      this.noHaveNewPreys()
      this.setPreyList()
    } else {
      this.uid = this.preyList[index]
      this.preyListHistory.push(this.uid)
      this.fetchPrey()
    }
  }

  @action fetchPrey = async () => {
    runInAction(() => {
      this.loading = true
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
        //this.initializeCourt()
      }
    })
    await this.sleep(300)
    runInAction(() => {
      this.loading = false
    })
  }

  @action cleanHistory = () => {
    this.preyListHistory = new Array
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