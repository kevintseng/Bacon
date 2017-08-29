import React, { Component } from 'react'
import { View, Dimensions, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
//import { Radar } from 'react-native-pathjs-charts'

import CourtContainer from './CourtContainer'
import InfosContainer from './InfosContainer'
import PreviewBadgeWallContainer from './PreviewBadgeWallContainer'
import RadarContainer from './RadarContainer'

const { width, height } = Dimensions.get('window')

@inject('firebase','SubjectStore') @observer
export default class PreviewContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  render() {
    return(
      <View style={{flex: 1}}>  
        <ScrollView style={{flex: 1}}>
          <CourtContainer/>
          <View style={{alignSelf: 'center',paddingTop: 10}}>
            <InfosContainer/>  
          </View>
          <PreviewBadgeWallContainer/> 
          <View style={{paddingTop: 10}}>
            <RadarContainer/>
          </View>
          </ScrollView>
      </View>
    )
  }
}

