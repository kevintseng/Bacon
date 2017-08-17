import React, { Component } from 'react'
import { View, ActivityIndicator, ScrollView, Dimensions, BackHandler, ToastAndroid, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import CourtContainer from '../../../containers/LineCollectCourtScene/CourtContainer'
import InfosContainer from '../../../containers/LineCollectCourtScene/InfosContainer'
import BadgeWallContainer from '../../../containers/LineCollectCourtScene/BadgeWallContainer'
import CollectionModalContainer from '../../../containers/LineCollectCourtScene/CollectionModalContainer'
import LineModalContainer from '../../../containers/LineCollectCourtScene/LineModalContainer'

const { width, height } = Dimensions.get('window')

@inject('firebase','SubjectStore','FateStore','ControlStore') @observer
export default class LineCollectCourtScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.title = this.props.title
    this.collection = this.props.collection
    this.Store = this.props.Store // MeetChanceStore FateStore
    this.SubjectStore = this.props.SubjectStore
    this.FateStore = this.props.FateStore
    this.ControlStore = this.props.ControlStore
  }

  componentWillMount() {
    //alert('初始化')
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    Actions.refresh({ title: this.title })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    this.Store.cleanFetch()
    this.handleCollection()
  }

  componentDidMount() {
    this.Store.fetchPrey()
  }

  handleCollection = () => {
    if (this.title === '緣分') {
      this.FateStore.setCollectionRealPreys() // 從緣分來的幫他重新整理
    }
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
              <CourtContainer Store={this.Store} collection={this.collection}/>
              <View style={{alignSelf: 'center',paddingTop: 40}}>
                <InfosContainer Store={this.Store}/>
              </View>
              <BadgeWallContainer Store={this.Store}/>
            </ScrollView>
            <CollectionModalContainer/>
            <LineModalContainer/>
          </View>
        }
      </View>
    )
  }
}