import { observable, action, computed, useStrict } from 'mobx'

useStrict(true)

export default class MeetChanceStore {
  // user data
  //@observable preyList



  constructor() {
    this.preyList = []
  }

  @computed get sortPreyList() {
    return this.preyList.sort((a, b) => {
      return a.distance > b.distance ? 1 : -1
    })  
  }

  @action addPrey = prey => {
    this.preyList.push(prey)
  }

  @action updatePrey = (uid,distance) => {
    this.preyList.find(ele => ele.uid == uid).distance = distance
  }

  @action removePrey = uid => {
    this.preyList = this.preyList.filter(ele => !(ele.uid == uid))
  }

}