import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import LineList from '../../views/LineList'

export default class VisitorContainer extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    return(
      <View>
        <LineList
          title={'情傷療癒系作家 艾姬'}
          time={'2017-09-15 10:30~11:00'}
        />
      </View>
      )
  }
}
