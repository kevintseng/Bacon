import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import RecordList from '../../views/RecordList'

export default class RecordContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
  }

  render() {
    return(
      <View>
        <RecordList
          title={'情傷療癒系作家 艾姬'}
          time={'2017-09-15 10:30~11:00'}
        />
      </View> 
    )
  }
}
