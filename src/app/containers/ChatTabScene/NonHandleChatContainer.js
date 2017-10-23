import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, InteractionManager } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

@inject('firebase','FateStore','SubjectStore') @observer
export default class NonHandleChatContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.FateStore = this.props.FateStore
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    //
  }

  componentDidMount() {
  }



  render() {
    return(
      <View>
        <Text>NonHandleChatContainer</Text>
      </View>
    )
  }
}