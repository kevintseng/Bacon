import React, { Component } from 'react'
import { View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'
import LineModalContainer from './LineModalContainer'


import localdb from '../../../configs/localdb'
import Court from '../../views/Court'

@inject('firebase', 'SubjectStore', 'ControlStore', 'FateStore')
@observer
export default class CourtContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.Store = this.props.Store // MeetChanceStore FateStore
    this.SubjectStore = this.props.SubjectStore
    this.ControlStore = this.props.ControlStore
    this.FateStore = this.props.FateStore
    this.title = this.props.title
    this.state = {
      visible: false,
      match: false,
      collection: this.props.collection || false,
    }
  }

  componentWillUnmount = async () => {
    if (this.state.collection === true) {
      // 收集此人 加入local db
      await localdb.save({
        key: 'collection' + this.SubjectStore.uid,
        id: this.Store.uid,
        data: {
          time: Date.now(),
        },
        expires: null,
      })
    } else {
      // 將此人移出local db
      await localdb.remove({
        key: 'collection' + this.SubjectStore.uid,
        id: this.Store.uid
      })
    }
    this.Store.cleanFetch()
    this.handleCollection()
  }

  handleCollection = () => {
    if (this.title === '緣分') {
      this.FateStore.setCollectionRealPreys() // 從緣分來的幫他重新整理
    }
  }

  openAlbum = () => {
    this.setState({
      visible: true,
    })
  }

  closeAlbum = () => {
    this.setState({
      visible: false,
    })
  }

  collection = () => {
    localdb.getIdsForKey('collection' + this.SubjectStore.uid).then(ids => {
      if ((ids.length >= this.SubjectStore.maxCollect) && !ids.includes(this.Store.uid)) {
        this.ControlStore.setGetCollectionMax()
      } else {
        this.setState({
          collection: !this.state.collection,
        })
      }
    }).catch(err => console.log(err))
  }

  goToLine = () => {
    Actions.Line({uid: this.Store.uid, name: this.Store.nickname})
  }

  // unhandledVisitorConv = uid => {
  //   let counter = 0
  //   this.firebase.database()
  //   .ref(`users/${uid}/conversations/`)
  //   .orderByChild('visit').equalTo(true)
  //   .once("value")
  //   .then(ss => {
  //     if (ss.exists()) {
  //       counter = ss.numChildren()
  //       console.log("unhandledVisitorConv (original): ", counter)
  //       ss.forEach(child => {
  //         if (child.val().prey != uid) {
  //           counter -= 1
  //         }
  //       })
  //       console.log("unhandledVisitorConv (filtered): ", counter)
  //       return counter
  //     }
  //     console.log("unhandledVisitorConv (none): ", counter)
  //     return 0
  //   })
  // }

  startConv = () => {
    // 先檢查是否已經有存在對話
    this.firebase.database().ref(`users/${this.SubjectStore.uid}/conversations/${this.Store.uid}`).once("value").then(snap => {
      if (!snap.exists()) {
        let unhandledCount = 0
        // 如果是新對話, 檢查今天的quota是否已達到
        if (this.SubjectStore.visitConvSentToday < 10) {
          this.firebase.database()
          .ref(`users/${this.Store.uid}/conversations/`)
          .orderByChild('visit').equalTo(true)
          .once("value")
          .then(ss => {
            let counter = 0
            if (ss.exists()) {
              counter = ss.numChildren()
              ss.forEach(child => {
                if (child.val().prey != this.Store.uid) {
                  counter -= 1
                }
              })
              console.log("unhandledVisitorConv (filtered): ", counter)
              unhandledCount = counter
            }
            console.log("unhandledVisitorConv (none): ", counter)
          }).then(() => {
            if (!this.SubjectStore.unhandledPass[this.Store.uid]) {
              let maxUnhandled = 20
              if (this.Store.vip) {
                maxUnhandled = 50
              }

              if (maxUnhandled > unhandledCount) {
                console.log("unhandledCount: ", unhandledCount, ", maxUnhandled: ", maxUnhandled)
                this.SubjectStore.addOneToVisitConvSentToday()
                this.goToLine()
                return true
              } else {
                console.log("check unhandledCount: ", unhandledCount, ", maxUnhandled: ", maxUnhandled)
                this.ControlStore.setLineModalUid(this.Store.uid)
                this.ControlStore.setLineModalNickname(this.Store.nickname)
                this.ControlStore.setLineModalAvatar(this.Store.avatar)
                this.ControlStore.setLineModalCode("tooManyUnhandled")
                this.ControlStore.setLineModal()
                console.log("this.ControlStore: ", this.ControlStore)
                return true
              }
            } else {
              this.SubjectStore.addOneToVisitConvSentToday()
              this.SubjectStore.deleteUnhandledPass(this.Store.uid)
              this.firebase.database().ref(`users/${this.SubjectStore.uid}/unhandledPass/${this.uid}`).remove()
              this.goToLine()
              return true
            }
          })
        } else {
          console.log("visitConvSentToday >= 10: ", this.SubjectStore.visitConvSentToday)
          this.ControlStore.setLineModalUid(this.Store.uid)
          this.ControlStore.setLineModalNickname(this.Store.nickname)
          this.ControlStore.setLineModalAvatar(this.Store.avatar)
          this.ControlStore.setLineModalCode("sentTooManyVisitorMsg")
          this.ControlStore.setLineModal()
          console.log("this.ControlStore: ", this.ControlStore)
          return true
        }
      }
      this.goToLine()
      return true
    })
  }

  render() {
    return (
      <View>
        <Court
          rightIcon={this.state.collection ? require('../../../images/btn_qy_fav_1.png') : require('../../../images/btn_qy_fav_0.png')}
          leftIcon={require('../../../images/btn_qy_chat.png')}
          album={this.Store.albumToArray}
          visible={this.state.visible}
          closeAlbum={this.closeAlbum}
          openAlbum={this.openAlbum}
          onPressRightIcon={this.collection}
          onPressLeftIcon={this.startConv}
          onRequestClose={this.closeAlbum}
        />
        <LineModalContainer />
      </View>
    )
  }
}
