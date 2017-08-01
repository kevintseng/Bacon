import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from './BaconRoutesContainer'
import HotBadgeContainer from './HotBadgeContainer'
import InputBadgeContainer from './InputBadgeContainer'
import BadgeWallContainer from './BadgeWallContainer'

@inject('firebase','SignUpInStore','SubjectStore') @observer
export default class Interests extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SignUpInStore = this.props.SignUpInStore
    this.SubjectStore = this.props.SubjectStore  
  }

  componentWillMount() {
    this.SignUpInStore.setInterests(this.SubjectStore.interests.slice())
  }

  componentWillUnmoun() {
    this.SignUpInStore.cleanDeleteInterests()
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <View style={{position: 'absolute', top: 10,  alignSelf: 'center'}}>
          <BadgeWallContainer/>
        </View>
        <View style={{position: 'absolute', top: 160, alignSelf: 'center'}}>
          <InputBadgeContainer/>
        </View>
        <View style={{position: 'absolute', bottom: 200, alignSelf: 'center'}}>
          <HotBadgeContainer/>
        </View>
        <View style={{ position: 'absolute', bottom: 0}}>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}