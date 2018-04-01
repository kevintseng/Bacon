import { observable, action, computed, useStrict, runInAction, toJS } from 'mobx'
import geolib from 'geolib'
import { calculateAge } from '../api/Utils'

useStrict(true)

export default class MeetChanceStore {

  @observable preys
  @observable loading
  @observable maxAge
  @observable minAge
  @observable nonShowOfflinePrey
  @observable showPreyRadar

  constructor(firebase) {
    this.firebase = firebase
    this.initialize()
  }

  @computed get preysToFlatList() {
    const arr = toJS(this.preys).filter(ele => ele !== null)
    return arr
  }

  @action initialize = () => {
    this.pool = new Object
    this.preyList = new Array
    this.preys = new Array
    this.loading = true
    this.index = 1
    this.maxAge = 50
    this.minAge = 18
    this.nonShowOfflinePrey = false
    this.showPreyRadar = false
  }

  @action serNonShowOfflinePrey = () => {
    this.nonShowOfflinePrey = !this.nonShowOfflinePrey
  }

  @action setShowPreyRadar = () => {
    this.showPreyRadar = !this.showPreyRadar
  }

  @action setMaxAge = age => {
    this.maxAge = age
  }

  @action setMinAge = age => {
    this.minAge = age
  }

  @action addPreyToPool = (uid,distance,nickname,avatar,birthday,hideMeetChance,deleted,online) => {
    this.pool[uid] = { key: uid, distance: distance, nickname: nickname, avatar: avatar, birthday: birthday, hideMeetChance: hideMeetChance, deleted: deleted, online: online }
  }

  @action fetchPreys = async () => {
    //this.blockadeList = this.filterBlockadeList()
    this.preyList = Object.keys(this.pool).filter( 
      key => {
        const value = this.pool[key]
        //TODO: 隱藏
        //TODO: 離線過濾
        //if (!(value.hideMeetChance) && !(value.deleted) && !(this.blockadeList.includes(key)) && value.birthday && ((calculateAge(value.birthday) >= this.meetChanceMinAge) && (calculateAge(value.birthday) <= (this.meetChanceMaxAge === 50 ? 99 : this.meetChanceMaxAge) )) && this.checkOnline(value.online)) {
        //  return true
        //} else {
        //  return null
        //}
        if ( (calculateAge(value.birthday) >= this.minAge) && (calculateAge(value.birthday) <= this.maxAge) ) {
          return true
        } else {
          return false
        }
        //return true
      }
    ).map( key => this.pool[key] )
    // 排距離
    this.preyList.sort((a, b) => {
      return a.distance > b.distance ? 1 : -1
    })
    this.preys = this.preys.concat(this.preyList.slice(0,12))
    await this.sleep(700)
    this.finishLoading()
  }

  @action addMorePreys = () => {
    // 沒到12個會出發兩次
    this.preys = this.preys.concat(this.preyList.slice(0 + 12*this.index,12 + 12*this.index))
    this.index = this.index + 1
  }

  @action startLoading = () => {
    //this.preyList = new Array
    //this.preys = new Array
    this.loading = true
    this.index = 1
  }

  @action finishLoading = () => {
    this.loading = false
  }

  @action filterBlockadeList = () => {
    return [] // 放在local
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

}
