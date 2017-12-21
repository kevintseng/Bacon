import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native'
import { inject, observer } from 'mobx-react'
import { CheckBox } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

const styles = {
  notice: {
    padding: 10, // 加大點擊範圍
  },
  text: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    color: '#606060',
  },
  option: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    color: '#606060',
    backgroundColor: 'transparent',
    fontWeight: '400'    
  }
}

@inject('firebase','SubjectStore') @observer
export default class BaconChatStatus extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      visible: false,
      chatStatus: 0,
    }
  }

  componentWillMount() {

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

  onPress = () => {
    this.setState({
      visible: true
    })
  }

  onRequestClose = () => {
    this.setState({
      visible: false
    })
  }

  onPressOne = () => {
    this.setState({
      chatStatus: 1,
    })
  }

  onPressTwo = () => {
    this.setState({
      chatStatus: 2,
    })
  }

  onPressThree = () => {
    this.setState({
      chatStatus: 3,
    })
  }

  ensure = () => {
    this.onRequestClose()
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/chatStatus').set(this.state.chatStatus)
    this.SubjectStore.setChatStatus(this.state.chatStatus)
  }

  render() {
    return (
      <View style={styles.notice} >
        <Modal animationType={"fade"} transparent={true} visible={this.state.visible} onRequestClose={this.onRequestClose} >
          <TouchableOpacity
            activeOpacity={1}
            onPress={ this.onRequestClose }
            style={{
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={{
                justifyContent: 'center',
                backgroundColor: 'white',
                alignSelf: 'center',
                alignItems: 'center',
                aspectRatio: 1.5,
                width: width*0.6,
                height: height*0.35,
                position: 'absolute',
                borderRadius: 15
              }}
            >
              <CheckBox
                fontFamily='NotoSans'
                containerStyle={{backgroundColor: 'transparent',borderWidth: 0}}
                textStyle={styles.option}
                center
                title='放空中'
                checked={ this.state.chatStatus === 1 }
                onPress={ this.onPressOne }
              />
              <CheckBox
                fontFamily='NotoSans'
                containerStyle={{backgroundColor: 'transparent',borderWidth: 0}}
                textStyle={styles.option}
                center
                title='忙碌中'
                checked={ this.state.chatStatus === 2 }
                onPress={ this.onPressTwo }
              />
              <CheckBox
                fontFamily='NotoSans'
                containerStyle={{backgroundColor: 'transparent',borderWidth: 0}}
                textStyle={styles.option}
                center
                title='低潮中'
                checked={ this.state.chatStatus === 3 }
                onPress={ this.onPressThree }
              />
              <Text style={styles.text} onPress={this.ensure}>確認</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
        <TouchableOpacity onPress={this.onPress} >
          <Text style={styles.text}>{this.getChatStatus(this.SubjectStore.chatStatus)}</Text>
        </TouchableOpacity>
      </View>
    )
  }

}