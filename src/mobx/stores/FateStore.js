import { observable, action, computed, useStrict, runInAction } from 'mobx'
import _ from 'lodash'

useStrict(true)

export default class FateStore {

  @observable preys

  constructor(firebase) {
    this.firebase = firebase
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

  // pool 

  @action addPreyToVisitorsPool = (uid,time) => {
    this.visitorsPool.push({uid: uid, time: time})
  }

  @action setPreyList = () => {
    this.preyList = _.cloneDeep(this.visitorsPool)
  }

  @action setFakePreys = () => {
    this.preys = this.preyList.map((ele,index)=>({ key: ele.uid, time: ele.time, nickname: null, avatar: null, birthday: null }))
  }

  @action setRealPreys = async () => {
    await Promise.all(this.preyList.map(async (ele,index) => {
      await this.firebase.database().ref('users/' + ele.uid).once('value').then(snap => {
        if (snap.val()) {
          this.preys[index].nickname = snap.val().nickname
          this.preys[index].avatar = snap.val().avatar
          this.preys[index].birthday = snap.val().birthday         
        }
      }).catch(err => console.log(err))
    }))
    runInAction(() => {
      this.preys = this.preys.peek()
    })
  }

}