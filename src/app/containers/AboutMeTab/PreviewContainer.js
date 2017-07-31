import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import CourtContainer from './CourtContainer'
import InfosContainer from './InfosContainer'

@inject("firebase","SubjectStore") @observer
export default class PreviewContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
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

