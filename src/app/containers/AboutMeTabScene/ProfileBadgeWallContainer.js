import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native'
import { inject, observer } from 'mobx-react'

import { BaconBadgeYes, BaconBadgeNo } from '../../views/BaconBadge/BaconBadge'

const { width } = Dimensions.get('window')

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
          <Text style={ styles.subtitleTextStyle }>點此編輯興趣愛好</Text>
        </View>
      </TouchableOpacity>
      )
    } else {
      return (
        <View>
          <View>
            <Text style={ styles.titleStyle }>興趣愛好</Text>
          </View>
          <View style={{height: 158, width: width - 8, marginLeft: 8, marginTop: 5}}>
            <ScrollView>
              <View style={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start'}}>
                {
                  this.SubjectStore.hobbiesToFlatList.map(item => (
                   
                      <BaconBadgeYes key={item.key} text={item.key} onPress={ this.props.onPressInterests }/>
                    
                  ))
                }
              </View>
            </ScrollView>
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

/*

 <View  key={item.key} style={{minWidth: width/4}}>

            <FlatList
              removeClippedSubviews
              data={ this.SubjectStore.hobbiesToFlatList }
              numColumns={4}
              renderItem={({item}) => (
                <View style={{minWidth: width/4}}>
                  <BaconBadgeYes text={item.key} onPress={ this.props.onPressInterests }/>
                </View>
              )} 
            />

          */