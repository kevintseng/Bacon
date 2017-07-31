import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import Court from '../../views/Court'
 
const cards = [
  { id: 2, uri: 'https://pic.pimg.tw/wuntinglin/4b84e20809d8f.jpg' },
  { id: 3, age: 29, uri: 'https://i.imgur.com/FHxVpN4.jpg' },
]

@inject("SignUpInStore") @observer
export default class CourtContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
    this.state = {
      album: false
    }
  }

  nope = () => {
    //
  }

  yup = () => {
    //
  }

  openAlbum = () => {
    this.setState({
      album: true
    })
  }

  closeAlbum = () => {
    this.setState({
      album: false
    })
  }

  render() {
    return(
      <Court
        cards={ cards }
        //rightIcon={require('../../../images/btn_meet_like.png')}
        //leftIcon={require('../../../images/btn_meet_dislike.png')}
        album={ this.state.album }
        //photos={} 
        closeAlbum={ this.closeAlbum }
        openAlbum={ this.openAlbum }
        nope={ this.nope }
        yup={ this.yup }
      />
    )
  }
}