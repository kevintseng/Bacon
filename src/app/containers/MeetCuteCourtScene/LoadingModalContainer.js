import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { View, Modal, Text, ActivityIndicator, Dimensions, Image } from 'react-native'
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
export default class LoadingModalContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.MeetCuteStore = this.props.MeetCuteStore
  }

  indicator = () => (
    <View style={{flex: 1}}>
      <ActivityIndicator
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          paddingBottom: 110
        }}
        size="large"
        color='#d63768'
      />
    </View>
  )

  render() {
    return(
        <Modal animationType={"none"} transparent={false} visible={this.MeetCuteStore.loading} onRequestClose={()=>{}}>
          { this.indicator() }
        </Modal>
    )
  }
}