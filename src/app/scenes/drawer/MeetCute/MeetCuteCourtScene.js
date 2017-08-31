import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Button, ScrollView, Dimensions, TouchableOpacity, Modal } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'

import CourtContainer from '../../../containers/MeetCuteCourtScene/CourtContainer'
import InfosContainer from '../../../containers/MeetCuteCourtScene/InfosContainer'
import BadgeWallContainer from '../../../containers/MeetCuteCourtScene/BadgeWallContainer'
import MateModalContainer from '../../../containers/MeetCuteCourtScene/MateModalContainer'
import SearchModalContainer from '../../../containers/MeetCuteCourtScene/SearchModalContainer'
import LoadingModalContainer from '../../../containers/MeetCuteCourtScene/LoadingModalContainer'

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
@inject('firebase','SubjectStore','MeetCuteStore') @observer
export default class MeetCuteCourtScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.MeetCuteStore = this.props.MeetCuteStore
  }

  componentWillMount() {
  }

  componentDidMount = async () => {
    await this.sleep(260)
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
            <View style={{alignSelf: 'center',paddingTop: 40}}>
              <InfosContainer/> 
            </View>
            <BadgeWallContainer/> 
            { this.SubjectStore.vip && 
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
/*
!this.MeetCuteStore.haveNewPreys || this.MeetCuteStore.firstLoading
<SearchModalContainer/> 
           <SearchModalContainer/>   
            <LoadingModalContainer/>
            
*/

/*
        { this.MeetCuteStore.haveNewPreys && this.MeetCuteStore.loading &&
          this.indicator() 
        }
*/

/*

            <View></View>
            <View>
              <Animatable.Text animation="swing" iterationCount="infinite" direction="alternate" style={styles.animation} >搜尋邂逅名單中</Animatable.Text>
              <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>❤️</Animatable.Text>
            </View> 

            <TouchableOpacity onPress={ this.cleanHistory } >
              <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.5, y: 0.0}} colors={colors}>
                <View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center',paddingTop: 10, paddingBottom: 10}}>
                  <Text style={ styles.text }>重新來場美麗的邂逅</Text>
                </View>
              </LinearGradient>  
            </TouchableOpacity> 
          */

