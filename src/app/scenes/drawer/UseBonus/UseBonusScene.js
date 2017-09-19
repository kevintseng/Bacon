import React, { Component } from 'react'
import { ScrollView, View, Text, Button, Platform, BackHandler, ToastAndroid } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import UseBonusContainer from '../../../containers/UseBonusScene/UseBonusContainer'


const styles = {
  view: {
  },
}

// UseBonusScene 吃的props: nickname, cost, avatarUrl, code, callback

@inject('firebase', 'SubjectStore')
@observer
export default class UseBonusScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.balance = this.SubjectStore.bonus
    this.nickname = this.props.nickname
    this.avatarUrl = this.props.avatarUrl
    this.code = this.props.code
    this.callback = this.props.callback
    this.genText(this.code)
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  genText = code => {
    switch (code) {
      case 'priority':
        this.reasonStr = `讓 ${this.nickname} 最先看到你的來訪留言！`
        this.preStr = "需要"
        this.postStr = "Q點"
        this.cost = 100
        break;
      case 'visitorMsgLimit':
        this.reasonStr = `對 ${this.nickname} 送出更多訊息，展現你的真誠與積極！`
        this.preStr = "每多一則需要"
        this.postStr = "Q點"
        this.cost = 30
        break;
      case 'sentTooManyVisitorMsg':
        this.reasonStr = `不想等明天現在就與 ${this.nickname} 以及其他9位會員送出留言`
        this.preStr = "需要"
        this.postStr = "Q點"
        this.cost = 100
        break
      case 'tooManyUnhandled':
        this.reasonStr = `把握現在，不想等待！現在就對 ${this.nickname} 送出留言`
        this.preStr = "需要"
        this.postStr = "Q點"
        this.cost = 50
        break
      default:
    }
  }

  handleUseConfirmed = () => {
    // console.log("handleUseConfirmed")
    const newBalance = this.SubjectStore.deductBonus(this.cost)
    // console.log("newBalance: ", newBalance)
    this.firebase.database().ref(`users/${this.SubjectStore.uid}/bonus`).set(newBalance)
    this.callback(true, this.code)
    Actions.pop()
    return true
  }

  render() {
    return (
      <UseBonusContainer
        balance={this.balance}
        cost={this.cost}
        avatarUrl={this.avatarUrl}
        reasonStr={this.reasonStr}
        preStr={this.preStr}
        postStr={this.postStr}
        handleUseConfirmed={this.handleUseConfirmed}
      />
    )
  }
}
