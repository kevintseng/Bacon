import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'

import { BaconBadgeYes, BaconBadgeNo } from '../../views/BaconBadge/BaconBadge'

const styles = {
  titleStyle: {
    marginTop: 10,
    marginLeft: 15,
    color: '#606060',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    fontWeight: '500',
    fontSize: 15
  },
  subtitleTextStyle: {
    color: '#606060',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontWeight: 'normal',
    fontSize: 12,
    marginTop: 10,
    marginLeft: 15
  }
}

@inject('SubjectStore') @observer
export default class BadgeWallContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  showBadge = () => (
    this.SubjectStore.hobbiesToFlatList.map((ele) => (<BaconBadgeYes key={ele.key} text={ele.key}  />))
  )

  showText = () => (
    <Text style={ styles.subtitleTextStyle }>您尚未編輯興趣愛好，點此編輯興趣愛好</Text>
  )

  result = () => {
    const badges = this.showBadge()
    if (badges.length === 0) {
      return (
        <View pointerEvents="none" style={{flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'flex-start'}}>
        { this.showText() }
         </View>
      )
    } else {
      return (
        <View pointerEvents="none" style={{flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'center',alignSelf: 'center'}}>
          { badges }
        </View>
      )
    }    
  }

  render() {
    return(
      <TouchableOpacity onPress={ this.props.onPressInterests }>
        <View>
          <Text style={ styles.titleStyle }>興趣愛好</Text>
        </View>
        { this.result() }
      </TouchableOpacity>
    )
  }
}