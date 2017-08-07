import React, { Component } from 'react'
import { View, TextInput, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import BaconForm from '../../../views/BaconForm'

const { width, height } = Dimensions.get('window')

const styles = {
  textInput: {
    width: width - 60,
    alignItems: 'center'
  }
}

@inject('SubjectEditStore') @observer
export default class BioInputContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectEditStore = this.props.SubjectEditStore
  }

  render() {
    return(
      <View style={{alignSelf: 'center'}}>
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="#d63768"
          textAlignVertical = 'top'
          placeholder = '請輸入自我介紹'
          multiline
          autoCorrect
          numberOfLines = { 100 }
          //editable = { true }
          maxLength = { 100 }        
          onChangeText = { this.SubjectEditStore.setBio }
          value = {this.SubjectEditStore.bio }
        />
      </View>
    )
  }
}