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
    this.reason = this.props.reason
    this.cost = this.props.cost
    this.avatarUrl = this.props.avatarUrl
    this.useCode = this.props.useCode
    this.callback = this.props.callback
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

  handleUseConfirmed = () => {
    // console.log("handleUseConfirmed")
    const newBalance = this.SubjectStore.deductBonus(this.cost)
    // console.log("newBalance: ", newBalance)
    this.firebase.database().ref(`users/${this.SubjectStore.uid}/bonus`).set(newBalance)
    this.callback(true, this.useCodeCode)
    Actions.pop()
    return true
  }

  render() {
    return (
      <View style={styles.view}>

        <View style={styles.top}>
          <UseBonusContainer
            balance={this.balance}
            reason={this.reason}
            cost={this.cost}
            avatarUrl={this.avatarUrl}
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
