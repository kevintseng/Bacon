import React, { Component } from 'react'
import { View, Platform, BackHandler, ToastAndroid, Modal, Text, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import EmailContainer from './containers/EmailContainer'
import PasswordContainer from './containers/PasswordContainer'
import NickNameContainer from './containers/NickNameContainer'
import BirthdayContainer from './containers/BirthdayContainer'
import PolicyContainer from './containers/PolicyContainer'
import PolicyModalContainer from './containers/PolicyModalContainer'
import RuleModalContainer from './containers/RuleModalContainer'


import EmailStatesContainer from './containers/EmailStatesContainer'
import PasswordStatesContainer from './containers/PasswordStatesContainer'
import NickNameStatesContainer from './containers/NickNameStatesContainer'
import FailureContainer from './containers/FailureContainer'

import BaconRoutesContainer from './containers/BaconRoutesContainer'

const styles = {
  view: {
    flex: 1
  },
  content: {
    flex: 1, 
    justifyContent: 'space-between',
    marginTop: 20
  },
  fail: {
    position: 'absolute', 
    bottom: 90, 
    alignSelf: 'center',
    alignItems: 'center'
  }
}

@inject('SignUpStore') @observer
export default class SignUpThreeScene extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.SignUpTwo({type: 'reset', direction: 'leftToRight'})
    return true
  }

  render() {
    return(
       <View style={ styles.view }>
          <PolicyModalContainer/>
          <RuleModalContainer/>
          <View style={ styles.content }>
            <EmailContainer/>
            <PasswordContainer/>
            <NickNameContainer/>
            <BirthdayContainer/>
            <PolicyContainer/>
            <BaconRoutesContainer/>
          </View>
        </View>
    )
  }
}

/*

          <View style={styles.fail}>
            <FailureContainer/>
          </View>
*/
