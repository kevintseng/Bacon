import React, { Component } from 'react'
import { View, Text, Button, Platform, BackHandler, ToastAndroid } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import BaconRoutesContainer from '../../../containers/UseBonusScene/BaconRoutesContainer'
import UseBonusContainer from '../../../containers/UseBonusScene/UseBonusContainer'


const styles = {
  view: {
    flex: 1,
    marginBottom: 40,
  },
  top: {
    position: 'absolute',
    top: 30,
    alignSelf: 'center',
  },
  middle: {
    position: 'absolute',
    top: 200,
    alignSelf: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
  },
}

@inject('firebase', 'SubjectStore')
@observer
export default class UseBonusScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.balance = this.SubjectStore.bonus
    this.nickname = this.props.nickname
    this.cost = this.props.cost
    this.avatarUrl = this.props.avatarUrl
    this.usageCode = this.props.usageCode
    this.callback = this.props.callback
    this.genText(this.usageCode)
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  genText = usageCode => {
    switch (usageCode) {
      case 'priority':
        this.reasonStr = `讓 ${this.nickname} 最先看到你的來訪留言！`
        this.preStr = "需要"
        this.postStr = "Q點"
        break;
      case 'visitorMsgLimit':
        this.reasonStr = `對 ${this.nickname} 送出更多訊息，展現你的真誠與積極！`
        this.preStr = "每多一則需要"
        this.postStr = "Q點"
        break;
      case 'receivedTooManyVisitorMsg':
        this.reasonStr = `把握現在，不想等待！現在就對 ${this.nickname} 送出留言`
        this.preStr = "需要"
        this.postStr = "Q點"
        break;
      case 'sentTooManyVisitorMsg':
        this.reasonStr = `不想等明天現在就與 ${this.nickname} 以及其他會員送出留言`
        this.preStr = "需要"
        this.postStr = "Q點，可以再與10位會員進行來訪留言"
        break
      default:
    }
  }

  handleUseConfirmed = () => {
    // console.log("handleUseConfirmed")
    const newBalance = this.SubjectStore.deductBonus(this.cost)
    // console.log("newBalance: ", newBalance)
    this.firebase.database().ref(`users/${this.SubjectStore.uid}/bonus`).set(newBalance)
    this.callback(true, this.usageCode)
    Actions.pop()
    return true
  }

  render() {
    return (
      <View style={styles.view}>

        <View style={styles.top}>
          <UseBonusContainer
            balance={this.balance}
            cost={this.cost}
            avatarUrl={this.avatarUrl}
            reasonStr={this.reasonStr}
            preStr={this.preStr}
            postStr={this.postStr}
          />
        </View>

        <View style={styles.bottom}>
          <BaconRoutesContainer
            balance={this.balance}
            cost={this.cost}
            confirmUse={this.handleUseConfirmed}
          />
        </View>

      </View>
    )
  }
}
