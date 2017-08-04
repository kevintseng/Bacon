import React, { Component } from 'react'
import { FlatList, View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import { BaconBadgeYes, BaconBadgeNo } from '../../../views/BaconBadge/BaconBadge'

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class BadgeWallContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore
  }

  render() {
    return(
      <View style={{flex: 1,alignItems: 'center'}}>
        <FlatList
          data={ this.SubjectEditStore.hobbiesToFlatList }
          numColumns={4}
          renderItem={({item}) => {
            if(item.check) {
              return <BaconBadgeYes text={item.key} onPress={ () => { this.SubjectEditStore.switchHobbies(item.key)} } />
            } else {
              return <BaconBadgeNo text={item.key} onPress={ () => { this.SubjectEditStore.switchHobbies(item.key)} } />
            }
          }} 
        />
      </View>
    )
  }
}