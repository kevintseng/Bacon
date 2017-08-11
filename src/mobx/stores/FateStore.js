import { observable, action, computed, useStrict, runInAction } from 'mobx'
import _ from 'lodash'
import { calculateAge } from '../../app/Utils'

useStrict(true)

export default class FateStore {

  @observable visitorsPreys
  @observable goodImpressionPreys
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

  @action initialize = () => {
    this.visitorsPool = new Array
    this.visitorsPreylist = new Array
    this.visitorsPreys = new Array
    this.goodImpressionPool = new Array
    this.goodImpressionPreylist = new Array
    this.goodImpressionPreys = new Array
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
  }

  // visitors 

  @action addPreyToVisitorsPool = (uid,time) => {
    this.visitorsPool.push({uid: uid, time: time})
  }

  @action setVisitorsPreylist = () => {
    this.visitorsPreylist = _.cloneDeep(this.visitorsPool)
  }

  @action setVisitorsFakePreys = () => {
    this.visitorsPreys = this.visitorsPreylist.map((ele,index)=>({ key: ele.uid, time: ele.time, nickname: null, avatar: null, birthday: null }))
  }

  @action setVisitorsRealPreys = async () => {
    await Promise.all(this.visitorsPreylist.map(async (ele,index) => {
      await this.firebase.database().ref('users/' + ele.uid).once('value').then(snap => {
        if (snap.val()) {
          this.visitorsPreys[index].nickname = snap.val().nickname
          this.visitorsPreys[index].avatar = snap.val().avatar
          this.visitorsPreys[index].birthday = snap.val().birthday         
        }
      }).catch(err => console.log(err))
    }))
    runInAction(() => {
      this.visitorsPreys = this.visitorsPreys.peek()
    })
  }

  // goodImpression 

  @action addPreyToGoodImpressionPool = (uid,time) => {
    this.goodImpressionPool.push({uid: uid, time: time})
  }


  @action setGoodImpressionPreylist = () => {
    this.goodImpressionPreylist = _.cloneDeep(this.goodImpressionPool)
  }

  @action setGoodImpressionFakePreys = () => {
    this.goodImpressionPreys = this.goodImpressionPreylist.map((ele,index) => ({ key: ele.uid, time: ele.time, nickname: null, avatar: null, birthday: null }))
  }

  @action setGoodImpressionRealPreys = async () => {
    await Promise.all(this.goodImpressionPreylist.map(async (ele,index) => {
      await this.firebase.database().ref('users/' + ele.uid).once('value').then(snap => {
        if (snap.val()) {
          this.goodImpressionPreys[index].nickname = snap.val().nickname
          this.goodImpressionPreys[index].avatar = snap.val().avatar
          this.goodImpressionPreys[index].birthday = snap.val().birthday         
        }
      }).catch(err => console.log(err))
    }))
    runInAction(() => {
      this.goodImpressionPreys = this.goodImpressionPreys.peek()
    })
  }

  // court

  @action setCourtInitialize = uid => {
    this.loading = true
    this.uid = uid
  }

  @action setPrey = async () => {
    await this.firebase.database().ref('users/' + this.uid).once('value', snap => {
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

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

}