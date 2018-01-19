import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import { calculateAge, calculateDistance } from '../../../../../../api/Utils'
import CookieList from '../../../../../views/CookieList'
import BaconActivityIndicator from '../../../../../views/BaconActivityIndicator'

const styles = {
  view: {
    flex: 1,
    marginTop: 10
  },
  child: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    color: '#b3b3b3',
    fontSize: 13
  }
}

@inject('firebase','FateStore','SubjectStore') @observer
export default class GoodImpressionContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.FateStore = this.props.FateStore
    this.SubjectStore = this.props.SubjectStore
  }

  onPress = uid => (
    () => {
      Actions.FateCourt({ 
        uid: uid, title: '緣分'
      })
    }
  )
  
  render() {
    return(
      <View style={styles.view}>
        { this.FateStore.goodImpressionLoading ? <BaconActivityIndicator/> : 
        <FlatList
          removeClippedSubviews
          data={ this.FateStore.goodImpressionPreysToFlatList } 
          numColumns={1}
          renderItem={({item}) => 
            (
              <CookieList
                name={ item.nickname }
                avatar={ item.avatar }
                age={ calculateAge(item.birthday) }
                onPress={ this.onPress(item.key) }
              >
                <Text style={styles.child}>{'你們距離大約' + calculateDistance(item.latitude,item.longitude,this.SubjectStore.latitude,this.SubjectStore.longitude) + '公里'}</Text>
              </CookieList>
            ) 
          } 
        />
        }
      </View>
    )
  }
}