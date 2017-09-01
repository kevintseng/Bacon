import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import Court from '../../views/Court'

@inject('firebase','SubjectStore','FateStore','ControlStore') @observer
export default class CourtContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.FateStore = this.props.FateStore
    this.ControlStore = this.props.ControlStore
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

  like = async () => {
    this.firebase.database().ref('goodImpression/' + this.SubjectStore.uid + this.FateStore.uid ).set({ wooer: this.SubjectStore.uid , prey: this.FateStore.uid, time: Date.now() })
    this.ControlStore.setMateModal()
  }

  unlike = async () => {
    await this.firebase.database().ref('goodImpression/' + this.FateStore.uid + this.SubjectStore.uid).remove()
    await this.sleep(100)
    Actions.FateTab({type: 'reset', initialPage: 1})
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  render() {
    return(
      <Court
        rightIcon={require('../../../images/btn_meet_like.png')}
        leftIcon={require('../../../images/btn_meet_dislike.png')}
        album={ this.FateStore.albumToArray }
        visible={ this.state.visible }
        closeAlbum={ this.closeAlbum }
        openAlbum={ this.openAlbum }
        onPressRightIcon={ this.like }
        onPressLeftIcon={ this.unlike }
        onRequestClose={ this.closeAlbum }
      />
    )
  }
}