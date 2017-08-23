import React, { Component } from 'react'
import { Keyboard, Text, View, TextInput, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import BaconForm from '../../../views/BaconForm'

const { width, height } = Dimensions.get('window')

const styles = {
  textInput: {
    width: width - 60,
    alignItems: 'center',
    fontSize: 18
  },
  text: {
    color: '#D63768',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    fontSize: 15 ,
    backgroundColor: 'transparent'  
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
              underlineColorAndroid='transparent'
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
          <View style={{marginTop: 5, flexDirection: 'row',justifyContent: 'space-between'}}>
            <Text style={styles.text} onPress={this.clear}>清除</Text>
            <Text style={styles.text} onPress={this.ensure}>確認</Text>
          </View>
      </View>
    )
  }
}
