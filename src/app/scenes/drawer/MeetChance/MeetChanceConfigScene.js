import React, { Component } from 'react'
import { View, Text, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from '../../../containers/MeetChanceConfigScene/BaconRoutesContainer'
import SliderContainer from '../../../containers/MeetChanceConfigScene/SliderContainer'
import OptionContainer from '../../../containers/MeetChanceConfigScene/OptionContainer'

const styles = {
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
  title : {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    textAlign: 'center', 
    //fontWeight: '500',
    fontSize: 12,
    color: '#606060'
  }
}

@inject('MeetChanceStore','ControlStore') @observer
export default class MeetChanceConfigScene extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.MeetChanceStore = this.props.MeetChanceStore
  }

  componentWillMount() {
    this.ControlStore.setMeetChanceMinAge(this.MeetChanceStore.meetChanceMinAge)  
    this.ControlStore.setMeetChanceMaxAge(this.MeetChanceStore.meetChanceMaxAge) 
    this.ControlStore.setMeetChanceRadar(this.MeetChanceStore.meetChanceRadar) 
    this.ControlStore.setMeetChanceOfflineMember(this.MeetChanceStore.meetChanceOfflineMember)  
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount(){
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

        <View style={{alignItems: 'center'}}>
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