import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Court from '../../views/Court'

@inject('MeetChanceStore') @observer
export default class CourtContainer extends Component {

  constructor(props) {
    super(props)
    this.MeetChanceStore = this.props.MeetChanceStore
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

  match = () => {
    this.setState({
      match: !this.state.match
    })    
  }

  converse = () => {
    alert('轉到聊天')
  }

  render() {
    return(
      <Court
        rightIcon={ this.state.match ? require('../../../images/btn_qy_fav_1.png') : require('../../../images/btn_qy_fav_0.png') }
        leftIcon={ require('../../../images/btn_qy_chat.png') }
        album={ this.MeetChanceStore.albumToArray }
        visible={ this.state.visible }
        closeAlbum={ this.closeAlbum }
        openAlbum={ this.openAlbum }
        onPressRightIcon={ this.match }
        onPressLeftIcon={ this.converse }
      />
    )
  }
}