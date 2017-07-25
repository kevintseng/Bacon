import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { inject, observer } from "mobx-react"
import { Actions } from 'react-native-router-flux'

@inject("SubjectStore") @observer
export default class AboutMeScene extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  render(){
    return(
      <View>
        <Text>{ this.SubjectStore.displayName }</Text>
        <Text>{ this.SubjectStore.sexOrientation }</Text>
        <Text>{ this.SubjectStore.city }</Text>
        <Text>{ this.SubjectStore.birthday }</Text>
      </View>
    )
  }
}