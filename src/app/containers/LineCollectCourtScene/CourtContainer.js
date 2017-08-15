import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import Court from '../../views/Court'

@inject('firebase','SubjectStore','ControlStore') @observer
export default class CourtContainer extends Component {

  constructor(props) {
    super(props)
    this.Store = this.props.Store // MeetChanceStore FateStore
    this.SubjectStore = this.props.SubjectStore
    this.ControlStore = this.props.ControlStore
    this.state = {
      visible: false,
      match: false
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

  collect = () => {
    if ((this.SubjectStore.collectCount >= this.SubjectStore.maxCollect ) && (this.SubjectStore.collect[this.Store.uid] == null)) {
      this.ControlStore.setGetCollectionMax()
    } else {
      this.SubjectStore.switchCollect(this.Store.uid)
    }
  }

  converse = () => {
    this.ControlStore.setLineModal()
  }

  render() {
    return(
      <Court
        rightIcon={ this.SubjectStore.collect[this.Store.uid] ? require('../../../images/btn_qy_fav_1.png') : require('../../../images/btn_qy_fav_0.png') }
        leftIcon={ require('../../../images/btn_qy_chat.png') }
        album={ this.Store.albumToArray }
        visible={ this.state.visible }
        closeAlbum={ this.closeAlbum }
        openAlbum={ this.openAlbum }
        onPressRightIcon={ this.collect }
        onPressLeftIcon={ this.converse }
      />
    )
  }
}
