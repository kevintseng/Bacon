import React, { Component } from 'react'
import { View, Text, Button, Platform, BackHandler, ToastAndroid } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import UseBonus from '../../../views/UseBonus'
import BaconActivityIndicator from '../../../views/BaconActivityIndicator'
import UseBonusModal from '../../../views/UseBonusModal'

const styles = {
  view: {
    flex: 1
  }
}

@inject('firebase','SubjectStore','ChatStore') @observer
export default class UseBonusScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.ChatStore = this.props.ChatStore
    this.state = {
      loading: true,
      visible: false
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
    if (this.SubjectStore.bonus >= this.cost()) {
      this.setState({
        visible: true
      })
    } else {
      alert('您的Q點不夠')
    }
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

  onRequestClose = () => {
    this.setState({
      visible: false
    })
  }

  goToPay = () => {
    const bonus = this.SubjectStore.bonus - this.cost()
    this.firebase.database().ref('bonus/' + this.SubjectStore.uid).set(bonus).then(() => {
      this.SubjectStore.setBonus(bonus)
      this.setState({
        visible: false
      })
      this.doBenifit()
    }).catch(() => {
      alert('失敗')
    })
  }

  doBenifit = () => {
    switch (this.props._type) {
      case 'A':
       this.firebase.database().ref('chats/' + this.ChatStore.chatRoomKey + '/messageSendCount').set(0).then(() => {
          this.ChatStore.setMessageSendCount(0)
          Actions.pop()
       })
        break
      case 'B':
        this.firebase.database().ref('hello_chat_rooms_count/' + this.SubjectStore.uid).set(0).then(() => {
          this.ChatStore.setMessageSendPeople(0)
          Actions.pop()
        })
        //return '可以再與10位會員進行來訪留言'
        break
      case 'C':
        this.firebase.database().ref('nonHandleChatRooms/' + this.ChatStore.chatRoomKey + '/cutLine').set(true)
        this.firebase.database().ref('chat_rooms/' + this.ChatStore.chatRoomKey + '/cutLine').set(true)
        this.ChatStore.setShowChoose(false)
        Actions.pop()
        //return ''
        break
    }
  }

  render() {
    return(
      <View style = {styles.view}>
       { this.state.loading ? <BaconActivityIndicator/> :
        <View style = {styles.view}>
          <UseBonusModal
            visible={this.state.visible}
            nowBonus={this.SubjectStore.bonus}
            useBonus={this.cost()}
            onRequestClose={this.onRequestClose}
            routesOnPress={this.goToPay}
          />
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
        </View>
        }
      </View>
    )
  }
}