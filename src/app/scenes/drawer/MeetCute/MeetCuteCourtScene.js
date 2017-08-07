import React, { Component } from 'react'
import { View, ActivityIndicator, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import CourtContainer from '../../../containers/MeetCuteCourt/CourtContainer'
import InfosContainer from '../../../containers/MeetCuteCourt/InfosContainer'

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
    this.MeetCuteStore.pickOnePrey()    
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
      <Button color='#f4a764' style={{position: 'absolute', bottom: 0}} title='清除邂逅紀錄' onPress={ this.cleanHistory }/>
    </View>
  )

  render() {
    return(
      <View style={{flex: 1}}>  
        { this.MeetCuteStore.loading && 
          this.indicator() 
        }
        { !this.MeetCuteStore.loading && 
          <View style={{flex: 1}}>
            <CourtContainer/>
            <View style={{position: 'absolute',bottom: 50,alignSelf: 'center'}}>
              <InfosContainer/>  
            </View>
            <Button color='#f4a764' style={{position: 'absolute', bottom: 0}} title='清除邂逅紀錄' onPress={ this.cleanHistory }/>
          </View>
        }
      </View>
    )
  }
}

