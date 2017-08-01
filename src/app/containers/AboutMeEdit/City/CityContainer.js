import React, { Component } from 'react'
import { View } from 'react-native'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from './BaconRoutesContainer'
import CityChooseContainer from './CityChooseContainer'

@inject('firebase','SignUpInStore','SubjectStore') @observer
export default class CityContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SignUpInStore = this.props.SignUpInStore
    this.SubjectStore = this.props.SubjectStore  
  }

  componentWillMount() {
    this.SignUpInStore.setTextInputCity(this.SubjectStore.city)      
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