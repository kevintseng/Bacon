import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Button, ScrollView, Dimensions, TouchableOpacity, Modal } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'

import CourtContainer from '../../../containers/MeetCuteCourtScene/CourtContainer'
import InfosContainer from '../../../containers/MeetCuteCourtScene/InfosContainer'
import BadgeWallContainer from '../../../containers/MeetCuteCourtScene/BadgeWallContainer'

import SearchModalContainer from '../../../containers/MeetCuteCourtScene/SearchModalContainer'
import LoadingModalContainer from '../../../containers/MeetCuteCourtScene/LoadingModalContainer'

import MateModalContainer from '../../../containers/MeetCuteCourtScene/MateModalContainer'

import BaconRadar from '../../../views/BaconRadar'

const { width, height } = Dimensions.get('window')

//const colors = ['rgba(244, 167, 100, 0.5)', 'rgba(214, 55, 104, 0.5)']

const styles = {
  animation: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 20,
    fontWeight: '500',
    color: '#606060',
    textAlign: 'center'
  },
  text: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 14,
    //fontWeight: '500',
    color: '#606060',
  }
}
@inject('firebase','SubjectStore','MeetCuteStore','ControlStore') @observer
export default class MeetCuteCourtScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.MeetCuteStore = this.props.MeetCuteStore
    this.ControlStore = this.props.ControlStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentDidMount = async () => {
    await this.sleep(250)
    this.MeetCuteStore.setPreyList()
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  render() {
    return(
        <View style={{flex: 1}}>
          <MateModalContainer/>
          <ScrollView style={{flex: 1}}>
            <CourtContainer/>
            <View style={{alignSelf: 'center', marginTop: 10, paddingTop: 40}}>
              <InfosContainer/>
            </View>
            <View style={{paddingTop: 10}}>
              <BadgeWallContainer/>
            </View>
            { this.MeetCuteStore.meetCuteRadar &&
              <View style={{paddingTop: 10}}>
                <BaconRadar/>
              </View>
            }
          </ScrollView>
          { this.MeetCuteStore.loading && <LoadingModalContainer/> }
          { (!this.MeetCuteStore.haveNewPreys || this.MeetCuteStore.firstLoading) && <SearchModalContainer/> }
        </View>
    )
  }
}
