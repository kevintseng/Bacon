import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import CourtContainer from '../../../containers/MeetChanceCourtScene/CourtContainer'
import InfosContainer from '../../../containers/MeetChanceCourtScene/InfosContainer'

@inject('firebase','SubjectStore','MeetChanceStore') @observer
export default class MeetChanceCourtScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.MeetChanceStore = this.props.MeetChanceStore

  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
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

  render() {
    return(
      <View style={{flex: 1}}>  
        { this.MeetChanceStore.loading && 
          this.indicator() 
        }
        { !this.MeetChanceStore.loading && 
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

