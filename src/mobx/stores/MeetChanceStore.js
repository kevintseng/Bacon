import { observable, action, computed, useStrict, runInAction } from 'mobx'

useStrict(true)

export default class MeetChanceStore {

  @observable preys

  constructor(firebase) {
    this.firebase = firebase
    this.initialize()
  }

  @computed get sortPool() {
    return this.pool.sort((a, b) => {
      return a.distance > b.distance ? 1 : -1
    })  
  }

  @action initialize = () => {
    this.pool = new Array
    this.preyList = new Array
    this.preys = new Array 
  }

  @action addPreyToPool = prey => {
    this.pool.push(prey)
  }

  @action updatePreyToPool = (uid,distance) => {
    this.pool.find(ele => ele.uid == uid).distance = distance
  }

  @action removePreyToPool = uid => {
    this.pool = this.pool.filter(ele => !(ele.uid == uid))
  }

  @action setPreyList = () => {
    this.preyList = this.sortPool
    this.preyList.length = this.preyList.length - this.preyList.length%3
  }

  @action setFakePreys = () => {
    this.preys = this.preyList.map((ele,index)=>({ key: ele.uid, nickname: null, avatar: null }))
  }

  @action setRealPreys = () => {
      this.preyList.forEach((ele,index) => {
        this.firebase.database().ref('users/' + ele.uid).once('value').then(snap => {
          if (snap.val()) {
            runInAction(() => {
              this.preys[index] = {
                key: ele.uid,
                nickname: snap.val().displayName,
                avatar: snap.val().photoURL              
              } 
              this.extraData = true
              this.preys = this.preys.peek()
            })
          }
        })
      })    
  }

}