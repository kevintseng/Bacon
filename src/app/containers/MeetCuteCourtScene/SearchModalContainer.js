import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { View, Modal, Text, Platform, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'
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
    color: 'black',
    textAlign: 'center',    
  }
}

const colors = ['rgba(244, 167, 100, 1)', 'rgba(214, 55, 104, 1)']

@inject('ControlStore','MeetCuteStore') @observer
export default class SearchModalContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.MeetCuteStore = this.props.MeetCuteStore
  }

  cleanHistory = () => {
    this.MeetCuteStore.cleanHistory()
  }

  render() {
    return(

          <LinearGradient colors={colors} style={{justifyContent: 'center',width, alignItems: 'center',height}}>
            <View style={{paddingBottom: 54}}>
              <Animatable.Text animation="swing" iterationCount="infinite" direction="alternate" style={styles.text} >搜尋邂逅名單中</Animatable.Text>
              <TouchableOpacity onPress={ this.cleanHistory } >
                <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',paddingTop: 10}}>
                  <Text style={ [styles.text,{color: 'white'}] }>重新來場美麗的邂逅</Text>
                </View>
              </TouchableOpacity> 
            </View>
          </LinearGradient>
    )
  }
}