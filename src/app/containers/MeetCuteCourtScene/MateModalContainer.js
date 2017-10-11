import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { View, Modal, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'

const { width, height } = Dimensions.get('window')

const styles = {
  title: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    //padding: 10,
  },
  text: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    //fontSize: 20,
    //fontWeight: '500',
    color: 'white',
    //textAlign: 'center',    
  }
}

const colors = ['rgba(244, 167, 100, 0.5)', 'rgba(214, 55, 104, 0.5)']

@inject('ControlStore','MeetCuteStore') @observer
export default class MateModalContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.MeetCuteStore = this.props.MeetCuteStore
  }

  goToLine = async () => { 
    await this.ControlStore.setMateModal()
    await Actions.Line({uid: this.MeetCuteStore.uid, name: this.MeetCuteStore.nickname})
    this.goToNext()
  }

  keepMeetCute = async () => {
    await this.ControlStore.setMateModal()
    this.goToNext()
  }

  goToNext = () => {
    this.MeetCuteStore.pickNextPrey()
  }

  render() {
    return(
        <Modal animationType={"fade"} transparent={true} visible={this.ControlStore.mateModal} onRequestClose={ this.ControlStore.setMateModal } >
          <TouchableOpacity
            activeOpacity={1}
            onPress={ this.ControlStore.setMateModal }
            style={{
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor: 'transparent',
                alignSelf: 'center',
                alignItems: 'center',
                aspectRatio: 1.5,
                width,
                height: height*0.6,
                position: 'absolute',
                borderRadius: 15
              }}
            >
              <LinearGradient colors={colors} style={{justifyContent: 'space-between',width, alignItems: 'center',paddingTop: 30, paddingBottom: 30}}>
                  <Image source={require('../../../images/ico_meet_likeeo_heart.png')}/>
                  <View style={{marginTop: 20}}>
                    <Text style={ styles.title }>太好了</Text>
                    <Text style={ styles.title }>{'   你們互有好感！'}</Text>
                  </View>
                  <View style={{width, flexDirection: 'row',marginTop: 50, justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={ this.goToLine }>
                      <Image  style={{alignItems: 'center',justifyContent: 'center'}} source={require('../../../images/btn_meet_startchat.png')}>
                        <Text style={ styles.text }>     開始聊天</Text>
                      </Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ this.keepMeetCute }>
                      <Image style={{alignItems: 'center',justifyContent: 'center'}} source={require('../../../images/btn_meet_keepswiping.png')}>
                        <Text style={ styles.text }>     繼續邂逅</Text>
                      </Image>
                    </TouchableOpacity>
                  </View>

              </LinearGradient>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
    )
  }
}