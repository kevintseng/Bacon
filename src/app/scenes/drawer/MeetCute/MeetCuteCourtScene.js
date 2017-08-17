import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Button, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'

import CourtContainer from '../../../containers/MeetCuteCourtScene/CourtContainer'
import InfosContainer from '../../../containers/MeetCuteCourtScene/InfosContainer'
import BadgeWallContainer from '../../../containers/MeetCuteCourtScene/BadgeWallContainer'
import MateModalContainer from '../../../containers/MeetCuteCourtScene/MateModalContainer'

const { width, height } = Dimensions.get('window')

const colors = ['#f4a764', '#d63768']

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
    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentDidMount() {
    this.MeetCuteStore.setPreyList()    
  }

  cleanHistory = () => {
    this.MeetCuteStore.cleanHistory()
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
        { !this.MeetCuteStore.haveNewPreys &&
          <View style={{flex: 1,justifyContent: 'space-between'}}>
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
          </View>
        }
        { this.MeetCuteStore.haveNewPreys && this.MeetCuteStore.loading && 
          this.indicator() 
        }
        { this.MeetCuteStore.haveNewPreys && !this.MeetCuteStore.loading &&
          <View style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
              <CourtContainer/>
              <View style={{alignSelf: 'center',paddingTop: 40}}>
                <InfosContainer/> 
              </View>
              <BadgeWallContainer/> 
              <MateModalContainer/>
            </ScrollView>
          </View>
        }
      </View>
    )
  }
}

