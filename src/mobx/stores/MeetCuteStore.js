import { observable, action, computed, useStrict, runInAction } from 'mobx'
import { calculateAge } from '../../app/Utils'

useStrict(true)

export default class MeetCuteStore {

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
    this.poolHistory = new Array
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
  }

  @action addPreyToPool = prey => {
    this.pool.push(prey)
  }

  @action pickOnePrey = async prey => {
    runInAction(() => {
      this.loading = true
    })
    let length_a = this.pool.length 
    let length_b = this.poolHistory.length
    while (length_a  === length_b) {
      // 沒新人 等待載入
      await this.sleep(300)
      length_a = this.pool.length 
      length_b = this.poolHistory.length
    }
    // 有新人 跳出迴圈
    while (this.poolHistory.includes(this.uid)) {
      this.uid = this.pool[Math.floor(Math.random() * this.pool.length - 1) + 0]
    }
    this.poolHistory.push(this.uid)
    this.fetchPrey()
  }

  @action fetchPrey = async () => {
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
    this.poolHistory = new Array
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}