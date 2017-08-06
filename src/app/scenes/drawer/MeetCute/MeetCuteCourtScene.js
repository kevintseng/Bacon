import React, { Component } from 'react'
import { View } from 'react-native'
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
    this.MeetCuteStore.pickOnePrey()
    Actions.refresh({ key: 'Drawer', open: false })
  }

  render() {
    return(
      <View style={{flex: 1}}>  
        <CourtContainer/>
        <View style={{position: 'absolute',bottom: 50,alignSelf: 'center'}}>
          <InfosContainer/>  
        </View>
      </View>
    )
  }
}

