import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class SettingAboutScene extends Component {

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  render() {
    return(
      <View/>
    )
  }
}

