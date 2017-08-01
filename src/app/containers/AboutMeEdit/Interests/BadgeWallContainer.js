import React, { Component } from 'react'
import { FlatList, View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import { BaconBadgeYes, BaconBadgeNo } from '../../../views/BaconBadge/BaconBadge'

@inject('firebase','SignUpInStore','SubjectStore') @observer
export default class BadgeWallContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SignUpInStore = this.props.SignUpInStore
    this.SubjectStore = this.props.SubjectStore
  }

  render() {
    return(
      <View style={{flex: 1,alignItems: 'center'}}>
        <FlatList
          data={ this.SignUpInStore.interestsFlatList }
          numColumns={4}
          renderItem={({item}) => {
            if(this.SignUpInStore.deleteInterests.indexOf(item.key) > -1) {
              return <BaconBadgeNo text={item.key} onPress={ () => { this.SignUpInStore.moveOutDeleteDeleteInterests(item.key)} } />
            } else {
              return <BaconBadgeYes text={item.key} onPress={ () => { this.SignUpInStore.moveToDeleteDeleteInterests(item.key)} } />
            }
          }} 
        />
      </View>
    )
  }
}