import React, { Component } from 'react'
import { View, ActivityIndicator, ScrollView, Dimensions, BackHandler, ToastAndroid, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import CourtContainer from './containers/CourtContainer'
import InfosContainer from './containers/InfosContainer'
import BadgeWallContainer from './containers/BadgeWallContainer'
import MateModalContainer from './containers/MateModalContainer'

const { width, height } = Dimensions.get('window')

@inject('firebase','SubjectStore','FateStore','ControlStore') @observer
export default class MatchCourtScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.FateStore = this.props.FateStore
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentDidMount() {
    this.FateStore.fetchPrey()
  }

  componentWillUnmount(){
    this.FateStore.cleanFetch()
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  indicator = () => (
    <View style={{flex: 1}}>
      <ActivityIndicator
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          paddingBottom: 110
        }}
        size="large"
        color='#d63768'
      />
    </View>
  )

  render() {
    return(
      <View style={{flex: 1}}>
        { this.FateStore.loading &&
          this.indicator()
        }
        { !this.FateStore.loading &&
          <View style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
              <CourtContainer/>
              <View style={{alignSelf: 'center',paddingTop: 40}}>
                <InfosContainer/> 
              </View>
              <View style={{paddingTop: 10}}>
                <BadgeWallContainer/> 
              </View>
            </ScrollView>
            <MateModalContainer/>
          </View>
        }
      </View>
    )
  }
}