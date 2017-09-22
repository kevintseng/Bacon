import { observable, action, computed, useStrict, runInAction, toJS } from 'mobx'
import _ from 'lodash'
import geolib from 'geolib'
import { calculateAge } from '../../app/Utils'

useStrict(true)

export default class MeetChanceStore {

  @observable preys
  // court
  @observable loading
  // user data
  @observable nickname
  @observable avatar
  @observable bio
  @observable birthday
  @observable languages
  @observable hobbies
  @observable album
  @observable vip
  @observable distance
  @observable emailVerified
  @observable photoVerified
  //
  @observable notFound

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
    const arr = toJS(this.preys).filter(ele => ele !== null)
    if (arr.length > 9) {
      arr.length = arr.length - arr.length % 3
    }
    return arr
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
    this.avatar = null
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
    // config
    this.meetChanceMinAge = 18
    this.meetChanceMaxAge = 50
    this.meetChanceRadar = false
    //
    this.fetchPreyQuery
    // 
    this.notFound = false
  }

  @action setLatitude = latitude => {
    this.latitude = latitude
  }

  @action setLongitude = longitude => {
    this.longitude = longitude
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

  @action setPreyList = () => {
    this.notFound = false
    this.preyList = toJS(this.pool)
    this.preyList.sort((a, b) => {
      return a.distance > b.distance ? 1 : -1
    })
  }

  @action setFakePreys = () => {
    //this.preys = this.preyList.map((ele,index)=>({ key: ele.uid, nickname: null, avatar: null }))
    this.preys = new Array
  }

  @action setRealPreys = () => {
    const preysPromises = this.preyList.map((ele,index) => (
      this.firebase.database().ref('users/' + ele.uid).once('value').then( snap => {
        if (snap.val() && !(snap.val().hideMeetChance) && !(snap.val().deleted) && snap.val().birthday && ((calculateAge(snap.val().birthday) >= this.meetChanceMinAge) && (calculateAge(snap.val().birthday) <= (this.meetChanceMaxAge === 50 ? 99 : this.meetChanceMaxAge) )) && this.checkOnline(snap.val().online)) {
          const popularityDen = snap.val().popularityDen || 0
          this.firebase.database().ref('users/' + ele.uid + '/popularityDen').set(popularityDen + 1)
          return({
            key: ele.uid,
            nickname: snap.val().nickname,
            avatar: snap.val().avatar,
            birthday: snap.val().birthday
          })
        } else {
          return null
        }
      }).catch(err => console.log(err))
    ))

    Promise.all(preysPromises)
    .then(preys => {
      if (preys.length == 0) {
        runInAction(() => {
          this.notFound = true
          this.preys = preys
        })
      } else {
        runInAction(() => {
          this.preys = preys
        })        
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

/*
          if (snap.val().hideMeetChance || snap.val().deleted ||  calculateAge(snap.val().birthday) < this.meetChanceMinAge || calculateAge(snap.val().birthday) > this.meetChanceMaxAge) {
            return null
          } else {
            const popularityDen = snap.val().popularityDen || 0
            this.firebase.database().ref('users/' + ele.uid + '/popularityDen').set(popularityDen + 1)
            return({
              key: ele.uid,
              nickname: snap.val().nickname,
              avatar: snap.val().avatar,
              birthday: snap.val().birthday
            })
          }
      */

  @action setCourtInitialize = uid => {
    this.loading = true
    this.uid = uid
  }

  @action fetchPrey = () => {
    this.fetchPreyQuery = this.firebase.database().ref('users/' + this.uid)
    this.fetchPreyQuery.once('value').then(snap => {
      if (snap.val()) {
        const popularityNum = snap.val().popularityNum || 0
        this.firebase.database().ref('users/' + this.uid + '/popularityNum').set(popularityNum + 1)
        runInAction(() => {
          this.uid = this.uid
          this.avatar = snap.val().avatar
          this.nickname = snap.val().nickname
          this.bio = snap.val().bio
          this.birthday = snap.val().birthday
          this.languages = snap.val().languages || new Object
          this.hobbies = snap.val().hobbies || new Object
          this.album = snap.val().album || new Object
          this.vip = Boolean(snap.val().vip)
          this.distance = this.getDistance(snap.val().latitude,snap.val().longitude)
          this.emailVerified = Boolean(snap.val().emailVerified)
          this.photoVerified = Boolean(snap.val().photoVerified)
          this.loading = false
        })
      } else {
        alert('錯誤')
        //runInAction(() => {
        //  this.loading = false
        //})
      }
    }).catch(err => {
        alert(err) }
      )
  }

  @action cleanFetch = () => {
    this.loading = false
    this.fetchPreyQuery.off()
    this.fetchPreyQuery = null
  }

  @action setMeetChanceMinAge = int => {
    this.meetChanceMinAge = int
  }

  @action setMeetChanceMaxAge = int => {
    this.meetChanceMaxAge = int
  }

  @action setMeetChanceRadar = boolean => {
    this.meetChanceRadar = boolean
  }

  @action setMeetChanceOfflineMember = boolean => {
    this.meetChanceOfflineMember = boolean
  }

  @action cleanLoading = () => {
    this.loading = false
  }

  checkOnline = online => {
    if (!this.meetChanceOfflineMember) {
      return true
    } else if (this.meetChanceOfflineMember && online){
      return true
    } else {
      return false
    }
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  getDistance = (latitude,longitude) => {
    if (this.latitude && this.longitude && latitude && longitude) {
      return (geolib.getDistance(
        {latitude: this.latitude, longitude: this.longitude},
        {latitude: latitude, longitude: longitude}
      )/1000).toFixed(1)
    } else {
      return '?'
    }  
  }

}
