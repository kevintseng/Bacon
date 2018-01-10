import React, { Component } from 'react'
import { View, ActivityIndicator, ScrollView, Dimensions, BackHandler, ToastAndroid, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import CourtContainer from './containers/CourtContainer'
import InfosContainer from './containers/InfosContainer'
import BadgeWallContainer from './containers/BadgeWallContainer'
import CollectionModalContainer from './containers/CollectionModalContainer'
import LineModalContainer from './containers/LineModalContainer'
import BaconRadar from '../../../views/BaconRadar'

const { width, height } = Dimensions.get('window')

@inject('firebase','SubjectStore','FateStore','ControlStore','MeetChanceStore') @observer
export default class ChatCourtScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.title = this.props.title
    this.collection = this.props.collection
    this.Store = this.props.Store // MeetChanceStore FateStore
    this.SubjectStore = this.props.SubjectStore
    this.FateStore = this.props.FateStore
    this.ControlStore = this.props.ControlStore
    this.MeetChanceStore = this.props.MeetChanceStore
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    //Actions.refresh({ title: this.title })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentDidMount() {
    this.Store.fetchPrey()
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
        { this.Store.loading &&
          this.indicator()
        }
        { !this.Store.loading &&
          <View style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
              <CourtContainer title={this.title} Store={this.Store} collection={this.collection}/>
              <View style={{alignSelf: 'center',paddingTop: 40}}>
                <InfosContainer Store={this.Store}/>
              </View>
              <View style={{paddingTop: 10}}>
                <BadgeWallContainer Store={this.Store}/>
              </View>
              { this.MeetChanceStore.meetChanceRadar && 
                <View style={{paddingTop: 10}}>
                  <BaconRadar/>
                </View>
              }
            </ScrollView>
            <CollectionModalContainer/>
            <LineModalContainer/>
          </View>
        }
      </View>
    )
  }
}