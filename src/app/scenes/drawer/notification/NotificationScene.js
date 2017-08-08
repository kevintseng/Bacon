import React, { Component } from 'react'
import { View,Text, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

//import BlankButton from '../../../views/BlankButton/BlankButton'
//import Knife from '../../../views/Knife/Knife'


const styles = {
  text: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    textAlign: 'center', 
    //fontWeight: '500',
    color: '#606060',
    fontSize: 15
  }
}

export default class NotificationScene extends Component {

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  render() {
    return(
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text>NotificationScene</Text>
      </View>
    )
  }
}

