import React, { Component } from 'react'
import { View, Text, ActivityIndicator, ScrollView, Dimensions, BackHandler, ToastAndroid, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import BaconRoutesContainer from '../../../containers/LineCollectRoutesScene/BaconRoutesContainer'

const { width, height } = Dimensions.get('window')

const styles = {
  view: {
    flex: 1
  },
  top: {
    position: 'absolute', 
    top: 30,
    alignSelf: 'center',
  },
  middle: {
    position: 'absolute', 
    top: 160,
    alignSelf: 'center',
  },
  bottom: {
    position: 'absolute', 
    bottom: 0
  }
}

@inject('firebase','SubjectStore','MeetChanceStore') @observer
export default class LineCollectRoutesScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
  }
  
  render() {
    return(
      <View style={ styles.view }>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </View>
    )
  }
}
