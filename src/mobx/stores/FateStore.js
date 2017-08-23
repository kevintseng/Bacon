import { observable, action, computed, useStrict, runInAction, toJS, autorun } from 'mobx'
import _ from 'lodash'
import { calculateAge } from '../../app/Utils'
import localdb from '../../configs/localdb'

useStrict(true)

export default class FateStore {

  @observable visitorsPreys
  @observable goodImpressionPreys
  @observable collectionPreys
  @observable matchPreys
  //@observable collectionPreylist
  // court
  @observable loading
  // user data
  //@observable selfUid
  @observable nickname
  @observable bio
  @observable birthday
  @observable languages
  @observable hobbies
  @observable album
  @observable vip
  @observable emailVerified
  @observable photoVerified

  constructor(firebase) {
    this.firebase = firebase
    this.selfUid = null // 自己的uid
    this.initialize()
  }

  // court
  @computed get age() {
    return calculateAge(this.birthday)
  }

  @computed get languagesToString() {
    return Object.keys(this.languages).filter(key => this.languages[key] === true).join()
  }

  @computed get albumToArray() {
    return Object.keys(this.album).map((key) => (this.album[key]))
  }

  @computed get hobbiesToFlatList() {
    return Object.keys(this.hobbies).map((key,index) => ({ key: key, check: this.hobbies[key] }))
    // { 打球: true } -> [{key: 打球, check: true}]
  }

  @computed get visitorsPreysToFlatList() {
    return toJS(this.visitorsPreys)
  }

  @computed get collectionPreysToFlatList() {
    return toJS(this.collectionPreys)
  }

  @computed get matchPreysToFlatList() {
    return toJS(this.matchPreys)
  }

  @action initialize = () => {
    this.visitorsPool = new Array
    this.visitorsPreylist = new Array
    this.visitorsPreys = new Array
    this.goodImpressionPool = new Array
    this.goodImpressionPreylist = new Array
    this.goodImpressionPreys = new Array
    //this.collectionPool = new Array
    this.collectionPreylist = new Array
    this.collectionPreys = new Array
    this.matchPool = new Array
    this.matchPreylist = new Array
    this.matchPreys = new Array
    this.mateHistory = new Array
    // court
    this.loading = true
    // user data
    this.uid = null
    this.nickname = null
    this.bio = null
    this.birthday = null
    this.languages = new Object
    this.hobbies = new Object
    this.album = new Object
    this.vip = false
    this.emailVerified = false
    this.photoVerified = false
    //
    this.fetchPreyQuery = null
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

  @action setVisitorsRealPreys = () => {
    const visitorsPromises = this.visitorsPreylist.map((ele,index) => (
      this.firebase.database().ref('users/' + ele.uid).once('value').then( snap => (
        {
          key: ele.uid,
          time: ele.time,
          nickname: snap.val().nickname,
          avatar: snap.val().avatar,
          birthday: snap.val().birthday  
        }
      ))
    ))

    Promise.all(visitorsPromises)
    .then(visitorsPreys => {
      runInAction(() => {
        this.visitorsPreys = visitorsPreys
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  // goodImpression 

  @action addMateHistory = uid => {
    this.mateHistory.push(uid)
  }

  @action addPreyToGoodImpressionPool = (uid,time) => {
    this.goodImpressionPool.push({uid: uid, time: time})
  }


  @action setGoodImpressionPreylist = () => {
    const b = _.cloneDeep(this.matchPool)
    const PreyList = b.map(ele=> ele.uid)
    const c = _.cloneDeep(this.goodImpressionPool)
    //this.goodImpressionPreylist = _.cloneDeep(this.goodImpressionPool)
    this.goodImpressionPreylist = c.map(ele => {
      if ( PreyList.indexOf(ele.uid) > -1 || this.mateHistory.indexOf(ele.uid) > -1) {
        return null
      } else {
        return ele
      }
    })
    this.goodImpressionPreylist = this.goodImpressionPreylist.filter(ele => ele)
  }

  @action setGoodImpressionFakePreys = () => {
    this.goodImpressionPreys = this.goodImpressionPreylist.map((ele,index) => ({ key: ele.uid, time: ele.time, nickname: null, avatar: null, birthday: null }))
  }

  @action setGoodImpressionRealPreys = () => {
    const goodImpressionPromises = this.goodImpressionPreylist.map((ele,index) => (
      this.firebase.database().ref('users/' + ele.uid).once('value').then( snap => (
        {
          key: ele.uid,
          nickname: snap.val().nickname,
          avatar: snap.val().avatar,
          birthday: snap.val().birthday  
        }
      ))
    ))

    Promise.all(goodImpressionPromises)
    .then(goodImpressionPreys => {
      runInAction(() => {
        this.goodImpressionPreys = goodImpressionPreys
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  // collection
/*
  @action setCollectionFakePreys = () => {
    localdb.getIdsForKey('collection' + this.selfUid).then(collectionPreylist => {
      runInAction(() => {
        this.collectionPreys = collectionPreylist.map((uid,index) => ({ key: uid, time: this.collectionPreylist[uid], nickname: null, avatar: null, birthday: null }))
      })
    }).catch(err => console.log(err))
  }
*/
  @action setCollectionRealPreys = () => {
    localdb.getIdsForKey('collection' + this.selfUid).then(collectionPreylist => {
      console.log(collectionPreylist)
      const collectionPromises = collectionPreylist.map((uid,index) => (
        this.firebase.database().ref('users/' + uid).once('value').then( snap => (
          {
            key: uid,
            time: null,
            nickname: snap.val().nickname,
            avatar: snap.val().avatar,
            birthday: snap.val().birthday  
          }
        ))
      ))
      // 等待全部抓完
      Promise.all(collectionPromises)
      .then(collectionPreys => {
        console.log(collectionPreys)
        localdb.getAllDataForKey('collection' + this.selfUid).then(datas => {
          datas.map((ele,index)=>{
            collectionPreys[index]['time'] = ele && ele.time
          })
          runInAction(() => {
            this.collectionPreys = collectionPreys
          })
        })
      })
      .catch(err => {
        alert(err)
      })

    }).catch(err => console.log(err))
  }

  // mates

  @action addPreyToMatchPool = (uid,time) => {
    this.matchPool.push({uid: uid, time: time})
  }

  @action filterMatchList = () => {
    const a = _.cloneDeep(this.goodImpressionPool)
    const b = _.cloneDeep(this.matchPool)
    const wooerList = a.map(ele=> ele.uid)
    const PreyList = b.map(ele=> ele.uid)
    //console.log(wooerList)
    //console.log(PreyList)
    this.matchPreylist = wooerList.map(uid => {
      if (PreyList.indexOf(uid) > -1) {
        return uid
      } else {
        return null
      }
    })
    this.matchPreylist = this.matchPreylist.filter(ele => ele)
  }

  @action setMatchFakePreys = () => {
    this.matchPreys = this.matchPreylist.map((uid,index) => ({ key: uid, time: null, nickname: null, avatar: null, birthday: null }))
  }

  @action setMatchRealPreys = () => {
    const matchPromises = this.matchPreylist.map((uid,index) => (
      this.firebase.database().ref('users/' + uid).once('value').then( snap => (
        {
          key: uid,
          nickname: snap.val().nickname,
          avatar: snap.val().avatar,
          birthday: snap.val().birthday  
        }
      ))
    ))

    Promise.all(matchPromises)
    .then(matchPreys => {
      runInAction(() => {
        this.matchPreys = matchPreys
      })
    })
    .catch(err => {
      console.log(err)
    })    
  }
  // court

  @action setCourtInitialize = uid => {
    this.loading = true
    this.uid = uid
  }

  @action fetchPrey = () => {
    //alert('進來抓資料囉')
    this.fetchPreyQuery = this.firebase.database().ref('users/' + this.uid)
    this.fetchPreyQuery.once('value').then(snap => {
      if (snap.val()) {
        runInAction(() => {
          this.uid = this.uid
          this.nickname = snap.val().nickname
          this.bio = snap.val().bio
          this.birthday = snap.val().birthday
          this.languages = snap.val().languages || new Object
          this.hobbies = snap.val().hobbies || new Object
          this.album = snap.val().album || new Object
          this.vip = Boolean(snap.val().vip)
          this.emailVerified = Boolean(snap.val().emailVerified)
          this.photoVerified = Boolean(snap.val().photoVerified)
          this.loading = false
        })
        //alert('抓完囉應該要重渲染')        
      } else {
        //
        alert('錯誤')
        runInAction(() => {
          this.loading = false
        })
      }
    }).catch(err => { 
        alert(err) }
      )
  }

  @action cleanFetch = () => {
    this.loading = false
    this.fetchPreyQuery.off()
    this.fetchPreyQuery = null
  }

  @action setSelfUid = uid => {
    this.selfUid = uid
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

}