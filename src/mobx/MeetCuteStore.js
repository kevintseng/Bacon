import { observable, action, computed, useStrict, runInAction, toJS } from 'mobx'
import { sortedAlbum, showError, calculateAge, calculateDistance, languagesToString, hobbiesToFlatList } from '../api/Utils'
import localdb from '../configs/localdb'

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
  @observable havepreys
  @observable gotTochatRoom
  @observable fateMatch

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
    this.havepreys = false
    this.gotTochatRoom = false
    this.fateMatch = false
  }

  @action startFateMatch = () => {
    this.fateMatch = true
  }

  @action finishFateMatch = () => {
    this.fateMatch = false
  }

  @action startGotTochatRoom = () => {
    this.match = false
    this.gotTochatRoom = true
  }

  @action finishGotTochatRoom = () => {
    this.gotTochatRoom = false
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
    if (this.preys.length != 0) {
      this.havepreys = true
      this.loading = false
    } else {
      this.havepreys = false
      this.loading = false      
    }
  }

  @action startCheckMatch = () => {
    this.checking = true
  }

  @action finishCheckMatch = () => {
    this.checking = false
  }

  @action finishCheckMatchAndSetMatch = () => {
    this.checking = false
    this.match = true
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
        album: album || new Array,
        age: calculateAge(snap.val().birthday), 
        bio: snap.val().bio,
        distance: calculateDistance(snap.val().latitude,snap.val().longitude,this.latitude,this.longitude),
        address: snap.val().address,
        langs: languagesToString(snap.val().languages || new Object),
        hobbies: hobbiesToFlatList(snap.val().hobbies || new Object)
        })       
      }
    ).filter(ele => ele.age >= this.minAge && ele.age <= this.maxAge && (!this.onlyShowThreePhotoPrey || (this.onlyShowThreePhotoPrey && ele.album.length > 3))) 
  }

  fetchPreys = (selfUid,preySexualOrientation) => {
    //const randomIndex = Math.floor(Math.random() * maxPreysLimit) // TODO: 隨機 .limitToFirst(randomIndex)
    // TODO: 隱藏
    // TODO: 隨機
    if (preySexualOrientation.charAt(preySexualOrientation.length - 1) === preySexualOrientation.charAt(preySexualOrientation.length - 3)) {
      this.firebase.database().ref('meetCuteList/' + preySexualOrientation).once('value',snap => {
        if (snap.val()) {
          localdb.getIdsForKey('meetCute' + selfUid).then(ids_history => {
            const ids = Object.keys(snap.val())
            const index = ids.indexOf(selfUid)
            if (index > -1) {
              ids.splice(index, 1)
            }
            const filter_ids = ids.filter(id => ids_history.indexOf(id) === -1)
            const preysPromise = filter_ids.map(uid => this.firebase.database().ref('users/' + uid).once('value')) 
            Promise.all(preysPromise)
            .then(this.setPreys)
            .then(this.finishLoading)
            .cacth(showError)    
          })
        } else {
          this.finishLoading()
        }
      })    
    } else {
      this.firebase.database().ref('meetCuteList/' + preySexualOrientation).once('value',snap => {
        if (snap.val()) {
          localdb.getIdsForKey('meetCute' + selfUid).then(ids_history => {
            const ids = Object.keys(snap.val())
            const filter_ids = ids.filter(id => ids_history.indexOf(id) === -1)
            const preysPromise = filter_ids.map(uid => this.firebase.database().ref('users/' + uid).once('value'))  
            Promise.all(preysPromise)
            .then(this.setPreys)
            .then(this.finishLoading)
            .cacth(showError)
          })
        } else {
          this.finishLoading()
        }
      })
    }
  }

}