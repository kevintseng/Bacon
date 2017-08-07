import { observable, action, computed, useStrict, runInAction } from 'mobx'

useStrict(true)

export default class FateStore {

  constructor() {
    this.initialize()
  }

  @computed get visitorsPoolToArray() {
    return this.visitorsPool.map((ele,index) => ({ key: index, uri: ele }))
    // { url: true } -> [{key: index, uri: url}]
  }

  @action initialize = () => {
    this.visitorsPool = new Array
    this.preylist = new Array
    this.preys = new Array
  }

  @action addPreyToVisitorsPool = (uid,time) => {
    this.visitorsPool.push({uid: uid, time: time})
  }

  @action setFakePreys = () => {
    this.preys = this.visitorsPool.map((ele,index)=>({ key: ele.uid, time: ele.time, nickname: null, avatar: null, age: null }))
  }

  @action setRealPreys = () => {
      this.visitorsPool.forEach((ele,index) => {
        this.firebase.database().ref('users/' + ele.uid).once('value').then(snap => {
          if (snap.val()) {
            runInAction(() => {
              this.preys[index] = {
                key: ele.uid,
                nickname: snap.val().nickname,
                avatar: snap.val().avatar              
              } 
              //this.preys = this.preys.peek()
            })
          }
        })
      }) 
  }
}