import React, { Component } from 'react'
import { View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import LineModalContainer from './LineModalContainer'
import Moment from 'moment'

import localdb from '../../../configs/localdb'
import Court from '../../views/Court'

@inject('firebase', 'SubjectStore', 'ControlStore','FateStore') @observer
export default class CourtContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.Store = this.props.Store // MeetChanceStore FateStore
    this.SubjectStore = this.props.SubjectStore
    this.ControlStore = this.props.ControlStore
    this.FateStore = this.props.FateStore 
    this.state = {
      visible: false,
      match: false,
      collection: this.props.collection || false
    }
  }

  componentWillUnmount() {
    if (this.state.collection === true) {
      // 收集此人 加入local db
      localdb.save({
        key: 'collection',
        id: this.Store.uid,
        data: {
          time: Date.now()
        },
        expires: null  
      })
    } else {
      // 將此人移出local db
      localdb.remove({
        key: 'collection',
        id: this.Store.uid
      })
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
    localdb.getIdsForKey('collection').then(ids => {
      if ((ids.length >= this.SubjectStore.maxCollect) && this.state.collection == false) {
        this.ControlStore.setGetCollectionMax()
      } else {
        this.setState({
          collection: !this.state.collection
        })
      }
    }).catch(err => console.log(err)) 
  }

  goToLine = () => {
    Actions.Line({uid: this.Store.uid, name: this.Store.nickname})
  }

  converse = () => {
    // 先檢查是否已經有存在對話
    this.firebase.database().ref(`users/${this.SubjectStore.uid}/conversations/${this.Store.uid}`).once("value").then(snap => {
      if (!snap.exists()) {
        // 如果是新對話, 檢查今天的quota是否已達到
        if (this.SubjectStore.visitConvSentToday < 10) {
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

  render() {
    return (
      <View>
        <Court
          rightIcon={ this.state.collection ? require('../../../images/btn_qy_fav_1.png') : require('../../../images/btn_qy_fav_0.png')}
          leftIcon={ require('../../../images/btn_qy_chat.png') }
          album={ this.Store.albumToArray }
          visible={ this.state.visible }
          closeAlbum={ this.closeAlbum }
          openAlbum={ this.openAlbum }
          onPressRightIcon={ this.collection }
          onPressLeftIcon={ this.converse }
        />
        <LineModalContainer
          uid={this.Store.uid}
          nickname={this.Store.nickname}
          avatar={this.Store.avatar}
          callback={this.callbackFunc}
        />
      </View>
    )
  }
}
