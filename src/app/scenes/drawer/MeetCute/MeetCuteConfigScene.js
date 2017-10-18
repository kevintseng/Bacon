import React, { Component } from 'react'
import { View, Text, Platform, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from '../../../containers/MeetCuteConfigScene/BaconRoutesContainer'
import SliderContainer from '../../../containers/MeetCuteConfigScene/SliderContainer'
import OptionContainer from '../../../containers/MeetCuteConfigScene/OptionContainer'

const styles = {
  ...Platform.select({
      ios: {
        //
      },
      android: {
        view: {
          flex: 1
        },
        top: {
          flex: 1,
          paddingTop: 20,
          alignSelf: 'center'
        },
        middle: {
          flex: 2,
          marginTop: 10
        },
        bottom: {
          position: 'absolute', 
          bottom: 0
        },
        titleView: {
          alignItems: 'center'
        },
        title : {
          backgroundColor: 'transparent',
          letterSpacing: 3,
          fontFamily: 'NotoSans',  
          textAlign: 'center', 
          fontSize: 12,
          color: '#606060'
        }
      }
  })
}

@inject('MeetCuteStore','ControlStore') @observer
export default class MeetCuteConfigScene extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.MeetCuteStore = this.props.MeetCuteStore
  }

  componentWillMount() {
    this.ControlStore.setMeetCuteMinAge(this.MeetCuteStore.meetCuteMinAge)  
    this.ControlStore.setMeetCuteMaxAge(this.MeetCuteStore.meetCuteMaxAge) 
    this.ControlStore.setMeetCuteRadar(this.MeetCuteStore.meetCuteRadar) 
    this.ControlStore.setMeetCuteThreePhotos(this.MeetCuteStore.meetCuteThreePhotos)   
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }


  render() {
    return(
      <View style={ styles.view }>

        <View style={ styles.top }>
          <SliderContainer/>
        </View>

        <View style={ styles.titleView }>
          <Text style={ styles.title }>進階篩選(僅限高級會員)</Text>
        </View>

        <View style={ styles.middle }>
          <OptionContainer/>
        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </View>
    )
  }
}

