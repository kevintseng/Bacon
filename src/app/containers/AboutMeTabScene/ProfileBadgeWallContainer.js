import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
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
export default class ProfileBadgeWallContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  result = () => {
    if (this.SubjectStore.hobbiesToFlatList.length === 0) {
      return (
      <TouchableOpacity onPress={ this.props.onPressInterests }>
        <View>
          <Text style={ styles.titleStyle }>興趣愛好</Text>
        </View>
        <View style={{flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'flex-start'}}>
          <Text style={ styles.subtitleTextStyle }>您尚未編輯興趣愛好，點此編輯興趣愛好</Text>
        </View>
      </TouchableOpacity>
      )
    } else {
      return (
        <View>
          <View>
            <Text style={ styles.titleStyle }>興趣愛好</Text>
          </View>
          <View style={{alignItems: 'center',height: 140}}>
            <FlatList
              removeClippedSubviews
              data={ this.SubjectStore.hobbiesToFlatList }
              numColumns={4}
              renderItem={({item}) => (<BaconBadgeYes text={item.key} onPress={ this.props.onPressInterests }/>)} 
            />
          </View>
        </View>
      )
    }    
  }

  render() {
    return(
      this.result()
    )
  }
}