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
  bottom: {
    marginTop: 10,
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
       <ScrollView style={ styles.view }>

        <View style={{marginTop: 20}}>
          <View style={{marginTop: 10}}>
            <EmailContainer/>
          </View>
          <View style={{marginTop: 10}}>
            <PasswordContainer/>
          </View>
          <View style={{marginTop: 10}}>
            <NickNameContainer/>
          </View>
          <View style={{marginTop: 10}}>
            <BirthdayContainer/>
          </View>
          <View style={{marginTop: 10}}>
            <PolicyModalContainer/>
          </View>
          <View style={{marginTop: 10}}>
            <RuleModalContainer/>
          </View>

          <View style={{marginTop: 40}}>
            <PolicyContainer/>
          </View>

          <View style={{marginTop: 10, left: 20}}>
            <EmailStatesContainer/>
          </View>

          <View style={{marginTop: 10, left: 20}}>
            <PasswordStatesContainer/>
          </View>

          <View style={{marginTop: 10, left: 20}}>
            <NickNameStatesContainer/>
          </View>

          <View style={{marginTop:10, alignSelf: 'center',alignItems: 'center'}}>
            <FailureContainer/>
          </View>

        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </ScrollView>
    )
  }
}
