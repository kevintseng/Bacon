import { observable, action, computed, useStrict, runInAction } from 'mobx'
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
    //this.synchronize = null
  }

  // pool

  @action addPreyToPool = prey => {
    this.pool.push(prey)
  }

  @action updatePreyToPool = (uid,distance) => {
    this.pool.find(ele => ele.uid === uid).distance = distance
  }

  @action removePreyToPool = uid => {
    this.pool = this.pool.filter(ele => !(ele.uid === uid))
  }

  // pleylist = _.cloneDeep(pool)

  @action setPreyList = () => {
    this.preyList = _.cloneDeep(this.pool)
    this.preyList.sort((a, b) => {
      return a.distance > b.distance ? 1 : -1
    }) 
    this.preyList.length = this.preyList.length - this.preyList.length % 3
  }

  @action setFakePreys = () => {
    this.preys = this.preyList.map((ele,index)=>({ key: ele.uid, nickname: null, avatar: null }))
    //this.preys this.preyList 是完全不同物件 OK
  }

  @action setRealPreys = async () => {
    await Promise.all(this.preyList.map(async (ele,index) => {
      await this.firebase.database().ref('users/' + ele.uid).once('value').then(snap => {
        if (snap.val()) {
          this.preys[index].nickname = snap.val().nickname
          this.preys[index].avatar = snap.val().avatar        
        }
      }).catch(err => console.log(err))
    }))
    runInAction(() => {
      this.preys = this.preys.peek()
    })
  }

  // court

  @action setCourtInitialize = uid => {
    this.loading = true
    this.uid = uid
  }

  @action setPrey = async () => {
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
        console.warn('error')
        //this.initializeCourt()
      }
    }).catch(err => {console.log(err)})
    //await this.sleep(300)
    runInAction(() => {
      this.loading = false
    })
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

}