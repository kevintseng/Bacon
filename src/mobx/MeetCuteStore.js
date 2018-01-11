import { observable, action, computed, useStrict, runInAction, toJS } from 'mobx'
import { sortedAlbum, showError } from '../api/Utils'

useStrict(true)

const maxPreysLimit = 100

export default class MeetCuteStore {

  @observable loading
  @observable preys

  constructor(firebase) {
    this.firebase = firebase
    this.initialize()
  }

  @action initialize = () => {
    this.loading = true
    this.preys = new Array
  }

  @action startLoading = () => {
    this.loading = true
  }

  @action finishLoading = () => {
    this.loading = false
  }

  @action setPreys = data => {
    this.preys = data.map(snap => {
      const albumObject = sortedAlbum(snap.val().album || new Object,snap.val().avatar)
      const album = Object.keys(albumObject).map(key => albumObject[key] ) 
      return({
        key: snap.key,
        nickname: snap.val().nickname,
        album: album
        })          
      }
    )
  }

  fetchPreys = (preySexualOrientation) => {
    // TODO: 隨機
    // TODO: 看過紀錄
    this.firebase.database().ref('meetCuteList/' + preySexualOrientation).limitToLast(maxPreysLimit).once('value',snap => {
      if (snap.val()) {
        const preysPromise = Object.keys(snap.val()).map(uid => this.firebase.database().ref('users/' + uid).once('value'))   
        Promise.all(preysPromise)
        .then(this.setPreys)
        .then(this.finishLoading)
        .cacth(showError)  
      } else {
        //
      }
    })
  }

}