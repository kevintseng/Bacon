import React, { Component } from 'react'
import { View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import LineModalContainer from './LineModalContainer'
import Moment from 'moment'

import Court from '../../views/Court'

@inject('firebase', 'SubjectStore', 'ControlStore') @observer
export default class CourtContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.Store = this.props.Store // MeetChanceStore FateStore
    this.SubjectStore = this.props.SubjectStore
    this.ControlStore = this.props.ControlStore
    this.state = {
      visible: false,
      match: false,
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

  collect = () => {
    if ((this.SubjectStore.collectCount >= this.SubjectStore.maxCollect)
    && (this.SubjectStore.collect[this.Store.uid] == null)) {
      this.ControlStore.setGetCollectionMax()
    } else {
      this.SubjectStore.switchCollect(this.Store.uid)
    }
  }

  goToLine = () => {
    Actions.Line({uid: this.Store.uid, name: this.Store.nickname})
  }

  converse = () => {
    // 先檢查是否已經有存在對話
    this.firebase.database().ref(`users/${this.SubjectStore.uid}/conversations/${this.Store.uid}`).once("value").then(snap => {
      if (!snap.exists()) {
        // 如果是新對話, 檢查今天的quota是否已達到
        if (this.SubjectStore.visitConvSentToday < 2) {
          this.SubjectStore.addOneToVisitConvSentToday()
          this.goToLine()
        } else {
          this.ControlStore.setLineModal()
        }
        return 0
      }
      this.goToLine()
    })
  }

  callbackFunc = () => {
    console.log("Callback function in Court")
    this.SubjectStore.setVisitConvSentToday(1)
    this.firebase.database().ref(`users/${this.SubjectStore.uid}/visitConvSentToday`).set(1)
    this.goToLine()
  }

  render() {
    return (
      <View>
        <Court
          rightIcon={ this.SubjectStore.collect[this.Store.uid] ? require('../../../images/btn_qy_fav_1.png') : require('../../../images/btn_qy_fav_0.png')}
          leftIcon={ require('../../../images/btn_qy_chat.png') }
          album={ this.Store.albumToArray }
          visible={ this.state.visible }
          closeAlbum={ this.closeAlbum }
          openAlbum={ this.openAlbum }
          onPressRightIcon={ this.collect }
          onPressLeftIcon={ this.converse }
        />
        <LineModalContainer
          nickname={this.Store.nickname}
          avatar={this.Store.avatar}
          callback={this.callbackFunc}
        />
      </View>
    )
  }
}
