import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { View, Modal, Text, ActivityIndicator, Dimensions, Image,Platform } from 'react-native'
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

export default class LoadingModalContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
        <ActivityIndicator
          style={{
            backgroundColor:'white',
            position: 'absolute',
            height: height - (Platform.OS === 'ios' ? 64 : 54),
            width,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            paddingBottom: 110
          }}
          size="large"
          color='#d63768'
        />
    )
  }
}