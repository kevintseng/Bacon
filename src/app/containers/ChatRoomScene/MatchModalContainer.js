import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { View, Modal, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import BaconRedButton from '../../views/BaconRedButton/BaconRedButton'
import BlankButton from '../../views/BlankButton/BlankButton'

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

  render() {
    return(
        <Modal animationType={"fade"} transparent={true} visible={this.ControlStore.chatMatchModal} onRequestClose={ this.ControlStore.closeChatMatchModal } >
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor: 'transparent',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                //aspectRatio: 1.5,
                //width: width*0.8,
                height: height,
                //position: 'absolute',
                //borderRadius: 15,
              }}
            >
              <View style={{justifyContent: 'space-between'}}>

                <View>
                  <BaconRedButton
                    routesText={'與他聊聊'}
                    routesOnPress={ this.match }
                  />
                </View>

                <View>
                  <BlankButton
                    text={'不感興趣'}
                    onPress={ this.noMatch }
                  />
                </View>

              </View>
            </TouchableOpacity>
        </Modal>
    )
  }
}