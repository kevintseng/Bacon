import React, { Component } from 'react'
import { Keyboard, View, Button, TextInput, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import BaconForm from '../../../views/BaconForm'

const { width, height } = Dimensions.get('window')

const styles = {
  textInput: {
    width: width - 60,
    alignItems: 'center',
    fontSize: 18
  }
}

@inject('SubjectEditStore') @observer
export default class BioInputContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectEditStore = this.props.SubjectEditStore
  }

  ensure = () => {
    Keyboard.dismiss()
  }

  clear = () => {
    this.refs['bio'].clear()
  }

  render() {
    return(
      <View style={{alignSelf: 'center'}}>
          <View style={{height: 300,borderColor: '#D63768',borderWidth: 1, borderRadius: 5}}>
            <TextInput
              ref={'bio'}
              style={styles.textInput}
              textAlignVertical = 'top'
              placeholder = '請輸入自我介紹'
              multiline
              autoFocus
              numberOfLines = { 100 }
              maxLength = { 250 }
              onChangeText = { this.SubjectEditStore.setBio }
              value = {this.SubjectEditStore.bio }
            />
          </View>
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <Button title='清除' onPress={this.clear}/>
            <Button title='確認' onPress={this.ensure}/>
          </View>
      </View>
    )
  }
}
