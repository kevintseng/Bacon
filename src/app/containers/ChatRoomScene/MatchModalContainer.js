import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { View, Modal, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Badge } from 'react-native-elements'
import ChatRoomRedButton from '../../views/ChatRoomRedButton/ChatRoomRedButton'
import ChatRoomBlankButton from '../../views/ChatRoomBlankButton/ChatRoomBlankButton'

const { width, height } = Dimensions.get('window')

const styles = {
  title: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 15,
    fontWeight: '500',
    color: '#606060',
    textAlign: 'center',
    padding: 10
  },
  text: {
    padding: 10    
  },
  leftBadge: {
    backgroundColor: '#D63768',
  },
  rightBadge: {
    backgroundColor: '#FFFFFF',
  },
  leftBadgeText: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    backgroundColor: 'transparent',
  },
  rightBadgeText: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    backgroundColor: 'transparent',
    color: 'black'    
  }
}

@inject('firebase','ControlStore','ChatStore') @observer
export default class MatchModalContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.ControlStore = this.props.ControlStore
    this.ChatStore = this.props.ChatStore
  }

  noMatch = () => {
    this.firebase.database().ref('chat_rooms/' + this.ChatStore.chatRoomKey + '/interested').set(0).then(
      () => {
        this.ChatStore.setChatVistorRealPrey()
        this.ControlStore.closeChatMatchModal()
        Actions.pop()
      }
    )
  }

  match = () => {
    this.firebase.database().ref('chat_rooms/' + this.ChatStore.chatRoomKey + '/interested').set(2).then(
      () => {
        this.ChatStore.setChatVistorRealPrey()
        this.ChatStore.setChatMatchRealPrey() // 看能不能調成更快的演算法
        this.ControlStore.closeChatMatchModal()
      }
    )
  }

  back = () => {
    this.ControlStore.closeChatMatchModal()
    Actions.pop()
  }

  render() {
    return(
      <Modal animationType={"fade"} transparent={true} visible={this.ControlStore.chatMatchModal} onRequestClose={ this.back } >
        <View style={{flex: 1, justifyContent: 'flex-end'}} >
          <View
              style={{
                backgroundColor: '#F0F0F0',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                width,
                height: 45
              }}
            >     
            <ChatRoomBlankButton
              text={'不感興趣'} 
              onPress={ this.noMatch }
            />
            <ChatRoomRedButton
              text={'與他聊聊'} 
              onPress={ this.match }
            />
          </View>
        </View>
      </Modal>
    )
  }
}