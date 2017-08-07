import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

@inject('firebase','SubjectStore','MeetCuteStore') @observer
export default class MeetCuteConfigScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.MeetCuteStore = this.props.MeetCuteStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }


  render() {
    return(
      <View style={{flex: 1}}>  
        <Text>MeetCuteConfigScene</Text>
      </View>
    )
  }
}

