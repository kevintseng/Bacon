import { observable, action, computed, useStrict, runInAction, toJS } from 'mobx'
import { sortedAlbum, showError, calculateAge, calculateDistance, languagesToString, hobbiesToFlatList } from '../api/Utils'

useStrict(true)

const maxPreysLimit = 100

export default class MeetCuteStore {

  @observable loading
  @observable checking
  @observable match
  @observable preys
  @observable maxAge
  @observable minAge
  @observable onlyShowThreePhotoPrey
  @observable showPreyRadar

  constructor(firebase) {
    this.firebase = firebase
    this.initialize()
  }

  @action initialize = () => {
    this.loading = true
    this.checking = false
    this.match = false
    this.preys = new Array
    this.latitude = 0
    this.longitude = 0
    this.maxAge = 50
    this.minAge = 18
    this.onlyShowThreePhotoPrey = false
    this.showPreyRadar = false
  }

  @action switchOnlyShowThreePhotoPrey = () => {
    this.onlyShowThreePhotoPrey = !this.onlyShowThreePhotoPrey
  }

  @action switchShowPreyRadar = () => {
    this.showPreyRadar = !this.showPreyRadar
  }

  @action setMaxAge = age => {
    this.maxAge = age
  }

  @action setMinAge = age => {
    this.minAge = age
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

  @action startCheckMatch = () => {
    this.checking = true
  }

  @action finishCheckMatch = () => {
    this.checking = false
  }

  @action setMatch = () => {
    this.match = true
  }

  @action finishMatch = () => {
    this.match = false
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
    ).filter(ele => ele.age >= this.minAge && ele.age <= this.maxAge) 
  }

  fetchPreys = (preySexualOrientation) => {
    //const randomIndex = Math.floor(Math.random() * maxPreysLimit) // TODO: 隨機 .limitToFirst(randomIndex)
    // TODO: 三張照片限制 > 3
    // TODO: 隱藏 > 0
    this.firebase.database().ref('meetCuteList/' + preySexualOrientation).once('value',snap => {
      if (snap.val()) {
        // TODO: 看過紀錄
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