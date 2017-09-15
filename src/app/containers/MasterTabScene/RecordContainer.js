import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

export default class RecordContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
  }

  render() {
    return(
      <View>
        <Text>RecordContainer</Text>
      </View>
    )
  }
}
