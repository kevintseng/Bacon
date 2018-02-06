import React, { Component } from 'react'
import { View, Text, Button, Platform, BackHandler, ToastAndroid } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import UseBonus from '../../../views/UseBonus'
import BaconActivityIndicator from '../../../views/BaconActivityIndicator'

const styles = {
  view: {
    flex: 1
  }
}

@inject('firebase','SubjectStore') @observer
export default class UseBonusScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    this.setState({
       loading: true
    })
  }

  componentDidMount() {
    this.firebase.database().ref('users/' + this.props.uid).once('value',snap => {
      this.setState({
        avatar: snap.val().avatar,
        nickname: snap.val().nickname,
        loading: false
      })
    })
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  routesOnPress = () => {
    alert('繼續')
  }

  reasonTopStr = () => {
    switch (this.props._type) {
      case 'A':
        return '對 '
        break
      case 'B':
        return '不想等明天現在就與'
        break
      case 'C':
        return '讓 '
        break
    }
  }

  reasonBottomStr = () => {
    switch (this.props._type) {
      case 'A':
        return ' 送出更多訊息，展現你的真誠與積極'
        break
      case 'B':
        return '以及其他會員送出留言'
        break
      case 'C':
        return ' 最先看到你的來訪留言！'
        break
    }    
  }

  preStr = () => {
    switch (this.props._type) {
      case 'A':
        return ' 每多一則需要'
        break
      case 'B':
        return '需要'
        break
      case 'C':
        return '需要'
        break
    }    
  }

  cost = () => {
    switch (this.props._type) {
      case 'A':
        return 30
        break
      case 'B':
        return 100
        break
      case 'C':
        return 100
        break
    }     
  }

  postStr = () => {
    switch (this.props._type) {
      case 'A':
        return ''
        break
      case 'B':
        return '可以再與10位會員進行來訪留言'
        break
      case 'C':
        return ''
        break
    }     
  }

  render() {
    return(
      <View style = {styles.view}>
       { this.state.loading ? <BaconActivityIndicator/> :
        <UseBonus
          bonus={this.SubjectStore.bonus}
          avatar={this.state.avatar}
          reasonTopStr={this.reasonTopStr()}
          nickname={this.state.nickname}
          reasonBottomStr={this.reasonBottomStr()}
          preStr={this.preStr()}
          cost={this.cost()}
          postStr={this.postStr()}
          routesText={'繼續'}
          routesOnPress={this.routesOnPress}
        />
        }
      </View>
    )
  }
}