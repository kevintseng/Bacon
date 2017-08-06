import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'

import { BaconBadgeYes, BaconBadgeNo } from '../../views/BaconBadge/BaconBadge'

const styles = {
  text: {
    marginLeft: 10,
    color: '#606060',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    fontWeight: '500',
    fontSize: 15
  }
}

@inject('SubjectStore') @observer
export default class BadgeWallContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  show = () => (
    this.SubjectStore.hobbiesToFlatList.map((ele) => (<BaconBadgeYes key={ele.key} text={ele.key}  />))
  )

  render() {
    return(
      <TouchableOpacity onPress={ this.props.onPressInterests }>
        <View>
          <Text style={ styles.text }>興趣愛好</Text>
        </View>
        <View pointerEvents="none" style={{flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'center'}}>
          { this.show() }
        </View>
      </TouchableOpacity>
    )
  }
}