import React, { Component } from 'react'
import { FlatList, View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import { BaconBadgeYes } from '../../../views/BaconBadge/BaconBadge'

const hots = [
  {
    key: '夜店',
  },
  {
    key: '打球',
  },
  {
    key: '籃球',
  },
  {
    key: '撞球',
  },
  {
    key: '羽球',
  },
]

@inject('firebase','SignUpInStore','SubjectStore') @observer
export default class HotBadgeContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SignUpInStore = this.props.SignUpInStore
    this.SubjectStore = this.props.SubjectStore
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center'}}><Text style={{color: '#d63768'}}>熱門興趣提示</Text></View>
        <View style={{flex: 1,borderTopWidth: 1, borderColor: '#d63768',margin: 20, alignItems: 'center'}}>
          <FlatList
              data={ hots }
              numColumns={4}
              renderItem={({item}) => (<BaconBadgeYes text={item.key} onPress={ () => { this.SignUpInStore.addBadge(item.key) }}/>)} 
            />
        </View>
      </View>
    )
  }
}