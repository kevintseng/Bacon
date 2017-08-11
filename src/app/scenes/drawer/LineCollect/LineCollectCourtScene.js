import React, { Component } from 'react'
import { View, ActivityIndicator, ScrollView, Dimensions, BackHandler, ToastAndroid, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import CourtContainer from '../../../containers/LineCollectCourtScene/CourtContainer'
import InfosContainer from '../../../containers/LineCollectCourtScene/InfosContainer'
import BadgeWallContainer from '../../../containers/LineCollectCourtScene/BadgeWallContainer'

const { width, height } = Dimensions.get('window')

@inject('firebase','SubjectStore','MeetChanceStore') @observer
export default class LineCollectCourtScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.MeetChanceStore = this.props.MeetChanceStore

  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  componentDidMount() {
    this.MeetChanceStore.setPrey()
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

  goToLine = () => { 
    Actions.Line()
  }

  goToBonusFilter = () => {
    Actions.LineCollectRoutes()
  }

  goToFate = () => {
    Actions.Fate({initialPage: 3})
  }

  render() {
    return(
      <View style={{flex: 1}}>
        { this.MeetChanceStore.loading &&
          this.indicator()
        }
        { !this.MeetChanceStore.loading &&
          <View style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
              <CourtContainer/>
              <View style={{alignSelf: 'center',paddingTop: 40}}>
                <InfosContainer/>
              </View>
              <BadgeWallContainer/>
            </ScrollView>
            <Button title='收藏滿了' onPress={ this.goToFate }/>
            <Button title='轉到聊天室' onPress={ this.goToLine }/>
            <Button title='轉到使用Q點頁' onPress={ this.goToBonusFilter }/>
          </View>
        }
      </View>
    )
  }
}
