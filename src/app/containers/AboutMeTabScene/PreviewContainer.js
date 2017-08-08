import React, { Component } from 'react'
import { View, Dimensions, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import { Radar } from 'react-native-pathjs-charts'

import CourtContainer from './CourtContainer'
import InfosContainer from './InfosContainer'
import PreviewBadgeWallContainer from './PreviewBadgeWallContainer'

const { width, height } = Dimensions.get('window')

    const defaultData = { charm:30, popularity:77, likeness:20, friendliness:99, activity:18 };
    const { charm, popularity, likeness, friendliness, activity } = defaultData
    const data = [{
      "魅力值": charm,
      "熱門度": popularity,
      "好感度": likeness,
      "友好度": friendliness,
      "活耀度": activity,
    }];

    const options = {
      width,
      height: 300,
      r: 150,
      max: 150,
      fill: "#D63768",
      stroke: "#D63768",
      animate: {
        type: 'oneByOne',
        duration: 10
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: true,
        fill: '#34495E'
      }
    };

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
            <Radar data={data} options={options}/>
          </View>
          </ScrollView>
      </View>
    )
  }
}

