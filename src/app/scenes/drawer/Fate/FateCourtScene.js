import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class FateCourtScene extends Component {


  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  render() {
    return(
      <View>
        <Text>決定是否配對</Text>
      </View>
    )
  }
}

