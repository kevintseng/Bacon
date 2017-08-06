import { observable, action, computed, useStrict, runInAction } from 'mobx'
import { calculateAge } from '../../app/Utils'

useStrict(true)

export default class MeetCuteStore {

  @observable pool
  @observable uid
  @observable nickname
  @observable bio

  constructor(firebase) {
    this.firebase = firebase
    this.initialize()
  }

  @computed get age() {
    return calculateAge(this.birthday)
  }

  @computed get languagesToString() {
    return Object.keys(this.languages).filter(key => this.languages[key] === true).join()
    // { 中文: true, 英文: true } -> 中文,英文
  }

  @computed get albumToArray() {
    //console.log()
    return Object.keys(this.album).map((key) => (this.album[key]))
  }

  @action initialize = () => {
    this.pool = new Array
    this.history = new Array
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

  @action pickOnePrey = prey => {
    if (this.pool.length === this.history.length) {
      alert('沒人了')
    } else {
      while (this.history.includes(this.uid)) {
        this.uid = this.pool[Math.floor(Math.random() * this.pool.length - 1) + 0]
      }
      this.history.push(this.uid)
      this.fetchPrey()
    }  
  }

  @action fetchPrey = () => {
    this.firebase.database().ref('users/' + this.uid).once('value', snap =>{
      if (snap.val()) {
        runInAction(()=>{
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

      }
    })
  }
}