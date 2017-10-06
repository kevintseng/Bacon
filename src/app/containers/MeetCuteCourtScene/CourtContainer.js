import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import Court from '../../views/Court'

@inject('firebase','SubjectStore','MeetCuteStore','ControlStore','FateStore') @observer
export default class CourtContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.MeetCuteStore = this.props.MeetCuteStore
    this.ControlStore = this.props.ControlStore
    this.FateStore = this.props.FateStore
    this.firebase = this.props.firebase
    this.state = {
      visible: false
    }
  }

  openAlbum = () => {
    this.setState({
      visible: true
    })
  }

  closeAlbum = () => {
    this.setState({
      visible: false
    })
  }

  goToNext = () => {
    this.MeetCuteStore.setfirstLoad(false)
    this.MeetCuteStore.pickNextPrey()
  }

  like = async () => {
    // 雷達記錄
    //const favorabilityNum = 0

    await this.firebase.database().ref('users/' +  this.MeetCuteStore.uid).once('value').then(snap => {
      if (snap.val()) {
        const favorabilityDen = snap.val().favorabilityDen || 0
        const favorabilityNum = snap.val().favorabilityNum || 0
        this.firebase.database().ref('users/' + this.MeetCuteStore.uid + '/favorabilityNum').set(favorabilityNum + 1)
        this.firebase.database().ref('users/' + this.MeetCuteStore.uid + '/favorability').set((favorabilityNum + 1)/favorabilityDen)
      } else {
        //
      }
    })
    // 記到別人好感
    await this.firebase.database().ref('goodImpression/' + this.SubjectStore.uid + this.MeetCuteStore.uid ).set({ wooer: this.SubjectStore.uid , prey: this.MeetCuteStore.uid, time: Date.now() })
    // 檢查配對
    if (this.checkMatch()) {
      this.ControlStore.setMateModal()
    } else {
      this.goToNext() // this.checkMatch()
    }
  }


  checkMatch = () => (
    this.FateStore.goodImpressionPool[this.MeetCuteStore.uid]
  )

  unlike = () => {
    // 45天紀錄
    this.goToNext()
  }

  onLoadEnd = () => {
    this.MeetCuteStore.setOnLoadEnd()
  }

  render() {
    return(
      <Court
        rightIcon={require('../../../images/btn_meet_like.png')}
        leftIcon={require('../../../images/btn_meet_dislike.png')}
        album={ this.MeetCuteStore.albumToArray }
        visible={ this.state.visible }
        closeAlbum={ this.closeAlbum }
        openAlbum={ this.openAlbum }
        onPressRightIcon={ this.like }
        onPressLeftIcon={ this.unlike }
        onRequestClose={ this.closeAlbum }
        onLoadEnd={ this.onLoadEnd }
      />
    )
  }
}