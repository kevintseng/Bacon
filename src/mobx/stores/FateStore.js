import { observable, action, computed, useStrict, runInAction } from 'mobx'
import _ from 'lodash'

useStrict(true)

export default class FateStore {

  @observable visitorsPreys
  @observable goodImpressionPreys

  constructor(firebase) {
    this.firebase = firebase
    this.initialize()
  }

  @action initialize = () => {
    this.visitorsPool = new Array
    this.visitorsPreylist = new Array
    this.visitorsPreys = new Array
    this.goodImpressionPool = new Array
    this.goodImpressionPreylist = new Array
    this.goodImpressionPreys = new Array
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
    this.goodImpressionPreys = this.goodImpressionPreylist.map((ele,index)=>({ key: ele.uid, time: ele.time, nickname: null, avatar: null, birthday: null }))
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

}