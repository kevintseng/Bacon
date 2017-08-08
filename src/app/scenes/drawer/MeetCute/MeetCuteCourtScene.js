import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Button, ScrollView, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import * as Animatable from 'react-native-animatable'

import CourtContainer from '../../../containers/MeetCuteCourtScene/CourtContainer'
import InfosContainer from '../../../containers/MeetCuteCourtScene/InfosContainer'

const { width, height } = Dimensions.get('window')

@inject('firebase','SubjectStore','MeetCuteStore') @observer
export default class MeetCuteCourtScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.MeetCuteStore = this.props.MeetCuteStore
  }

  componentWillMount() {
    this.MeetCuteStore.noHaveNewPreys()
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
              <Animatable.Text animation="swing" iterationCount="infinite" direction="alternate" style={{ textAlign: 'center'}} >搜尋邂逅名單中</Animatable.Text>
              <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>❤️</Animatable.Text>
            </View>
            <Button color='#f4a764' title='清除邂逅紀錄' onPress={ this.cleanHistory }/>
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
            </ScrollView>
          </View>
        }
      </View>
    )
  }
}

