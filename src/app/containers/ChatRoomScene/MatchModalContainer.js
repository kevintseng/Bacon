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

@inject('ControlStore') @observer
export default class MatchModalContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
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
                    routesOnPress={ this.ControlStore.closeChatMatchModal }
                  />
                </View>

                <View>
                  <BlankButton
                    text={'不感興趣'}
                    onPress={ this.ControlStore.closeChatMatchModal }
                  />
                </View>

              </View>
            </TouchableOpacity>
        </Modal>
    )
  }
}