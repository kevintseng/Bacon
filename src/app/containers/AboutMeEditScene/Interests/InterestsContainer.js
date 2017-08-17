import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from './BaconRoutesContainer'
import HotBadgeContainer from './HotBadgeContainer'
import InputBadgeContainer from './InputBadgeContainer'
import BadgeWallContainer from './BadgeWallContainer'

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class Interests extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore  
  }

  componentWillMount() {
    this.SubjectEditStore.setHobbies(Object.assign({},this.SubjectStore.hobbies))
  }

  //componentWillUnmoun() {
  //  this.SubjectEditStore.cleanDeleteInterests()
  //}

  render() {
    return(
      <View style={{flex: 1}}>
        <View style={{position: 'absolute', top: 10,  alignSelf: 'center'}}>
          <BadgeWallContainer/>
        </View>
        <View style={{position: 'absolute', top: 160, alignSelf: 'center'}}>
          <InputBadgeContainer/>
        </View>
        <View style={{position: 'absolute', top: 210, alignSelf: 'center'}}>
          <HotBadgeContainer/>
        </View>
        <View style={{ position: 'absolute', bottom: 0}}>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}