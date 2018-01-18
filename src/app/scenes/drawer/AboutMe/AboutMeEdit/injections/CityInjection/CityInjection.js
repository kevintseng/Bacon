import React, { Component } from 'react'
import { View } from 'react-native'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from './containers/BaconRoutesContainer'
import CityChooseContainer from './containers/CityChooseContainer'

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class CityInjection extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore  
  }

  componentWillMount() {
    this.SubjectEditStore.setAddress(this.SubjectStore.address)      
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <CityChooseContainer/>
        <View style={{ position: 'absolute', bottom: 0}}>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}