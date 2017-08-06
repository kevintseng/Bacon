import React, { Component } from 'react'
import { View, ActivityIndicator, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import CourtContainer from '../../../containers/MeetCuteCourt/CourtContainer'
import InfosContainer from '../../../containers/MeetCuteCourt/InfosContainer'

const { height } = Dimensions.get('window')

@inject('firebase','SubjectStore','MeetCuteStore') @observer
export default class MeetCuteCourtScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.MeetCuteStore = this.props.MeetCuteStore
  }

  componentWillMount() {
    this.MeetCuteStore.pickOnePrey()
    Actions.refresh({ key: 'Drawer', open: false })
  }

  indicator = () => (
    <ActivityIndicator
      style={{
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        position: 'absolute',
        top: height/2 - 110,
        //padding: 8,
      }}
      size="large"
      color='#d63768'
    />
  )

  render() {
    return(
      <View style={{flex: 1}}>  
      { this.MeetCuteStore.loading && this.indicator() }
      { !this.MeetCuteStore.loading && 
        <View style={{flex: 1}}>
          <CourtContainer/>
          <View style={{position: 'absolute',bottom: 50,alignSelf: 'center'}}>
            <InfosContainer/>  
          </View>
        </View>
      }
      </View>
    )
  }
}

