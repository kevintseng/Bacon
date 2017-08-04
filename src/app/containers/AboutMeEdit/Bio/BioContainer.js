import React, { Component } from 'react'
import { View } from 'react-native'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from './BaconRoutesContainer'
import BioInputContainer from './BioInputContainer'

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class BioContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore  
  }
  
  componentWillMount() {
    this.SubjectEditStore.setBio(this.SubjectStore.bio)      
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <BioInputContainer/>
        <View style={{ position: 'absolute', bottom: 0}}>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}