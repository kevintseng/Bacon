import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { inject, observer } from "mobx-react"
//import { Actions } from 'react-native-router-flux'

@inject("SubjectStore") @observer
export default class AboutMeEditScene extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
  }

  render(){
    return(
      <View><Text>移到指定的編輯頁面</Text></View>
    )
  }
}