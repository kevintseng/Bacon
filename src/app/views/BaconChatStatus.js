import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'

const styles = {
  notice: {
    padding: 10, // 加大點擊範圍
  },
  text: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    color: '#606060',
  }
}

@inject('firebase','SubjectStore') @observer
export default class BaconChatStatus extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {

  }

  onPress = () => {
    alert('跳出狀態選單')
  }

  getChatStatus = statusCode => {
    switch (statusCode) {
      case 0:
        return "無狀態"
      case 1:
        return "放空中"
      case 2:
        return "忙碌中"
      case 3:
        return "低潮中"
      default:
        return "無狀態"
    }    
  }

  render() {
    return (
      <TouchableOpacity style={styles.notice} onPress={this.onPress} >
        <Text style={styles.text}>{this.getChatStatus(this.SubjectStore.chatStatus)}</Text>
      </TouchableOpacity>
    )
  }

}