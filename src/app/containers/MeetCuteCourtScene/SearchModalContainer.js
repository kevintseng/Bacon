import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { View, Modal, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'
import * as Animatable from 'react-native-animatable'

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
export default class SearchModalContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.MeetCuteStore = this.props.MeetCuteStore
  }

  goToLine = async () => { 
    await this.ControlStore.setMateModal()
    Actions.Line({uid: this.MeetCuteStore.uid, name: this.MeetCuteStore.nickname})
  }

  keepMeetCute = async () => {
    await this.ControlStore.setMateModal()
    //Actions.UseBonus()
  }

  cleanHistory = () => {
    this.MeetCuteStore.cleanHistory()
  }

  render() {
    return(
            <View
              //activeOpacity={1}
              style={{
                backgroundColor: 'rgba(52, 52, 52, 0.8)',
                alignSelf: 'center',
                alignItems: 'center',
                //aspectRatio: 1.5,
                //width,
                //height: height*0.4,
                //position: 'absolute',
                //borderRadius: 15,
                //height: height*0.4
                flex: 1,
                justifyContent: 'center'
              }}
            >
              <LinearGradient colors={colors} style={{justifyContent: 'space-between',width, alignItems: 'center',height: height*0.4, paddingTop: 30, paddingBottom: 30}}>
                <Image source={require('../../../images/ico_meet_likeeo_heart.png')}/>
                <View style={{marginTop: 20}}>
                    <Animatable.Text animation="swing" iterationCount="infinite" direction="alternate" style={styles.animation} >搜尋邂逅名單中</Animatable.Text>
                    <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>❤️</Animatable.Text>
                </View>
                <TouchableOpacity onPress={ this.cleanHistory } >
                  <View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center',paddingTop: 10, paddingBottom: 10}}>
                    <Text style={ styles.text }>重新來場美麗的邂逅</Text>
                  </View>
                </TouchableOpacity> 
              </LinearGradient>
            </View>
    )
  }
}