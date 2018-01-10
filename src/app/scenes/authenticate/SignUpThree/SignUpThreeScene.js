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
  middle: {
    position: 'absolute', 
    top: 150
  },
  bottom: {
    position: 'absolute', 
    bottom: 0
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

        <View style={{flex: 1, marginTop: 20}}>
          <EmailContainer/>
          <PasswordContainer/>
          <NickNameContainer/>
          <BirthdayContainer/>
          <PolicyModalContainer/>
          <RuleModalContainer/>

          <View style={{marginTop: 40}}>
            <PolicyContainer/>
          </View>

          <View style={{position: 'absolute', top: 2, left: 20}}>
            <EmailStatesContainer/>
          </View>

          <View style={{position: 'absolute', top: 70, left: 20}}>
            <PasswordStatesContainer/>
          </View>

          <View style={{position: 'absolute', top: 140, left: 20}}>
            <NickNameStatesContainer/>
          </View>

          <View style={{position: 'absolute', bottom: 90, alignSelf: 'center',alignItems: 'center'}}>
            <FailureContainer/>
          </View>

        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </View>
    )
  }
}
