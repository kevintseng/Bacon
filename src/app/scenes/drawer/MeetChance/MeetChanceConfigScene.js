import React, { Component } from 'react' 
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

@inject("firebase","SubjectStore") @observer
export default class MeetChanceConfigScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }


  render() {
    return(
      <View><Text>MeetChanceConfigScene</Text></View>
    )
  }
}

