import React, { Component } from 'react'
import { ScrollView, View, Platform, BackHandler, ToastAndroid, Modal, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import EmailContainer from '../../containers/SignUpThreeScene/EmailContainer'
import PasswordContainer from '../../containers/SignUpThreeScene/PasswordContainer'
import NickNameContainer from '../../containers/SignUpThreeScene/NickNameContainer'
import BirthdayContainer from '../../containers/SignUpThreeScene/BirthdayContainer'
import PolicyContainer from '../../containers/SignUpThreeScene/PolicyContainer'
import PolicyModalContainer from '../../containers/SignUpThreeScene/PolicyModalContainer'
import RuleModalContainer from '../../containers/SignUpThreeScene/RuleModalContainer'


import EmailStatesContainer from '../../containers/SignUpThreeScene/EmailStatesContainer'
import PasswordStatesContainer from '../../containers/SignUpThreeScene/PasswordStatesContainer'
import NickNameStatesContainer from '../../containers/SignUpThreeScene/NickNameStatesContainer'
import FailureContainer from '../../containers/SignUpThreeScene/FailureContainer'

import BaconRoutesContainer from '../../containers/SignUpThreeScene/BaconRoutesContainer'

const { width, height } = Dimensions.get('window')

const styles = {
  view: {
    flex: 1
  },
  middle: {

  },
  bottom: {
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
      <ScrollView style={{flex: 1, marginTop: 20}}>
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
        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </ScrollView>

    )
  }
}
