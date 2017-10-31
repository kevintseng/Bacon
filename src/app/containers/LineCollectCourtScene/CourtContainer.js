import React, { Component } from 'react'
import { View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'
import LineModalContainer from './LineModalContainer'

import localdb from '../../../configs/localdb'
import Court from '../../views/Court'

@inject('firebase', 'SubjectStore', 'ControlStore', 'FateStore','ChatStore')
@observer
export default class CourtContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.Store = this.props.Store // MeetChanceStore FateStore
    this.SubjectStore = this.props.SubjectStore
    this.ControlStore = this.props.ControlStore
    this.FateStore = this.props.FateStore
    this.ChatStore = this.props.ChatStore
    this.title = this.props.title
    this.state = {
      visible: false,
      match: false,
      collection: this.props.collection || false,
      code: null,
    }
  }

  componentWillUnmount = async () => {
    if (this.state.collection === true && this.props.collection === false) {
      // 收集此人 加入local db
      await localdb.save({
        key: 'collection' + this.SubjectStore.uid,
        id: this.Store.uid,
        data: {
          time: Date.now(),
        },
        expires: null,
      })
    } else if (this.state.collection === false) {
      // 將此人移出local db
      await localdb.remove({
        key: 'collection' + this.SubjectStore.uid,
        id: this.Store.uid
      })
    } else {
      //
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

  startConv = () => {
    // 先檢查是否已經有存在對話
    this.firebase.database().ref(`users/${this.SubjectStore.uid}/conversations/${this.Store.uid}`).once('value').then(async snap => {
      if (!snap.exists()) {
        let unhandledCount = 0
        // 如果是新對話, 檢查今天的來訪留言quota是否已達到
        if (this.SubjectStore.visitConvSentToday <= 10) {
          this.firebase.database()
          .ref(`users/${this.Store.uid}/conversations/`)
          .orderByChild('visit').equalTo(true)
          .once('value')
          .then(ss => {
            if (ss.exists()) {
              unhandledCount = ss.numChildren()
              // console.log('unhandledVisitorConv (original): ', unhandledCount)
              ss.forEach(child => {
                if (child.val().prey != this.Store.uid) {
                  unhandledCount -= 1
                }
              })
            }
            // console.log('unhandledVisitorConv (none): ', unhandledCount)
          }).then(() => {
            // console.log('Visitor Msg Sent Today: ', this.SubjectStore.visitConvSentToday, ', Max-allowed: 10')
            // console.log('Unhandled Visitor Msg Count: ', unhandledCount, ', Max-allowed: 20')
            //Look for puchased pass to override too many unhandled visitor msgs check
            if (!this.SubjectStore.unhandledPass[this.Store.uid]) {
              // let maxUnhandled = 20
              let maxUnhandled = 20
              if (this.Store.vip) {
                // vip users has maxUnhandled = 50
                maxUnhandled = 50
              }
              if (maxUnhandled > unhandledCount) {
                this.SubjectStore.addOneToVisitConvSentToday()
                this.goToLine()
                return
              } else {
                this.setState({ code: 'tooManyUnhandled'})
                this.ControlStore.setLineModalUid(this.Store.uid)
                this.ControlStore.setLineModalNickname(this.Store.nickname)
                this.ControlStore.setLineModalAvatar(this.Store.avatar)
                this.ControlStore.setLineModalCode('tooManyUnhandled')
                this.ControlStore.setLineModal()
                return
              }
            } else { // Has pass, go to chat
              this.SubjectStore.addOneToVisitConvSentToday()
              this.SubjectStore.deleteUnhandledPass(this.Store.uid)
              this.firebase.database().ref(`users/${this.SubjectStore.uid}/unhandledPass/${this.uid}`).remove()
              this.goToLine()
              return
            }
          })
        } else { // Too many visitor msgs sent
          this.setState({ code: 'sentTooManyVisitorMsg'})
          this.ControlStore.setLineModalUid(this.Store.uid)
          this.ControlStore.setLineModalNickname(this.Store.nickname)
          this.ControlStore.setLineModalAvatar(this.Store.avatar)
          this.ControlStore.setLineModalCode('sentTooManyVisitorMsg')
          this.ControlStore.setLineModal()
          return
        }
      } // Never had any conversation
      this.goToLine()
    })
  }

  startChat = () => {
    //console.warn(this.Store.uid)
    if (this.SubjectStore.uid > this.Store.uid) {
      this.ChatRoomKey = this.SubjectStore.uid + this.Store.uid
    } else {
      this.ChatRoomKey = this.Store.uid + this.SubjectStore.uid
    }
    this.ChatStore.setChatRoomKey(this.ChatRoomKey)
    this.goToChatRoom()
  }

  goToChatRoom = () => {
    Actions.ChatRoom({title: this.Store.nickname + '，' + this.Store.age})
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
          onPressLeftIcon={this.startChat}
          onRequestClose={this.closeAlbum}
        />
      </View>
    )
  }
}

/*

<LineModalContainer code={this.state.code}/>

*/
