import React, { Component } from 'react'
import { View } from 'react-native'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from './BaconRoutesContainer'
import DisplayNameContainer from './DisplayNameContainer'
import BirthdayContainer from './BirthdayContainer'

@inject('firebase','SignUpInStore','SubjectStore') @observer
export default class DisplayNameAgeContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SignUpInStore = this.props.SignUpInStore
    this.SubjectStore = this.props.SubjectStore  
  }

  componentWillMount() {
    this.SignUpInStore.setDisplayName(this.SubjectStore.displayName)
    this.SignUpInStore.setBirthday(this.SubjectStore.birthday)
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <DisplayNameContainer/>
        <BirthdayContainer/>
        <View style={{ position: 'absolute', bottom: 0}}>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}