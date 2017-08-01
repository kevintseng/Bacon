import React, { Component } from 'react'
import { TextInput, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconForm from '../../../views/BaconForm'

const { width, height } = Dimensions.get('window')

const styles = {
  textInput: {
    width: width - 60
  }
}

@inject('SignUpInStore') @observer
export default class InputBadgeContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
    this.state= {
      badge: ''
    }
  }

  onChangeText = text => {
    this.setState({
      badge: text
    })
  }

  setBadge = () => {
    this.SignUpInStore.addBadge(this.state.badge)
  }

  render() {
    return(
      <TextInput
        underlineColorAndroid="#d63768"
        maxLength = { 5 }
        numberOfLines = { 1 }
        style={styles.textInput}
        placeholder = '請輸入自訂興趣'
        onSubmitEditing = { this.setBadge }     
        onChangeText = { this.onChangeText }
        value = { this.state.badge }
      /> 
    )
  }
}