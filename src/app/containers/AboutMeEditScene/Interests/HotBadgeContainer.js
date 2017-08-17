import React, { Component } from 'react'
import { FlatList, View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import { BaconBadgeYes } from '../../../views/BaconBadge/BaconBadge'
import DefaultInterests from '../../../../configs/DefaultInterests'

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class HotBadgeContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center'}}><Text style={{color: '#d63768'}}>熱門興趣提示</Text></View>
        <View style={{flex: 1, borderColor: '#d63768',margin: 10, alignItems: 'center',height: 140}}>
          <FlatList
            removeClippedSubviews
            data={ DefaultInterests }
            numColumns={4}
            renderItem={({item}) => (<BaconBadgeYes text={item.key} onPress={ () => { this.SubjectEditStore.addHobby(item.key) }}/>)} 
          />
        </View>
      </View>
    )
  }
}