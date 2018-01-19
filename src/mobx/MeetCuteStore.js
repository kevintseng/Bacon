import { observable, action, computed, useStrict, runInAction, toJS } from 'mobx'
import { sortedAlbum, showError, calculateAge, calculateDistance, languagesToString, hobbiesToFlatList } from '../api/Utils'

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
    this.latitude = 0
    this.longitude = 0
  }

  @action setLatitude = latitude => {
    this.latitude = latitude
  }

  @action setLongitude = longitude => {
    this.longitude = longitude
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
        album: album,
        age: calculateAge(snap.val().birthday), 
        bio: snap.val().bio,
        distance: calculateDistance(snap.val().latitude,snap.val().longitude,this.latitude,this.longitude),
        address: snap.val().address,
        langs: languagesToString(snap.val().languages || new Object),
        hobbies: hobbiesToFlatList(snap.val().hobbies || new Object)
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