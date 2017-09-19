import React, { Component } from 'react'
import { TextInput, Dimensions, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconForm from '../../../views/BaconForm'

const { width, height } = Dimensions.get('window')

const styles = {
  textInput: {
    width: width - 25,
    padding: 8,
    alignSelf: 'center',
  }
}

@inject('SubjectEditStore') @observer
export default class InputBadgeContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectEditStore = this.props.SubjectEditStore
    this.state= {
      badge: ''
    }
  }

  onChangeText = text => {
    this.setState({
      badge: text
    })
  }

  addHobby = () => {
    this.SubjectEditStore.addHobby(this.state.badge)
  }

  render() {
    return(
      // 這裡用 ScrollView 是因為這樣可以讓user在鍵盤出現的時候只要點擊任何一個非鍵盤區域就會收起鍵盤
      <ScrollView scrollEnabled={false}>
        <TextInput
          underlineColorAndroid="#d63768"
          maxLength = { 8 }
          numberOfLines = { 1 }
          style={styles.textInput}
          placeholder = '請輸入1~8個字的自訂興趣'
          onSubmitEditing = { this.addHobby }
          onChangeText = { this.onChangeText }
          value = { this.state.badge }
        />
      </ScrollView>
    )
  }
}
