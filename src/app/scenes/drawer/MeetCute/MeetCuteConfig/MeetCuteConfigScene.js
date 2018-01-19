import React, { Component } from 'react'
import { View, Text, Platform, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

import SliderContainer from './containers/SliderContainer'
import OptionContainer from './containers/OptionContainer'

import BaconRoutes from '../../../../views/BaconRoutes/BaconRoutes'

const styles = {
  ...Platform.select({
      ios: {
        //
      },
      android: {
        view: {
          flex: 1
        },
        top: {
          flex: 1,
          paddingTop: 20,
          alignSelf: 'center'
        },
        middle: {
          flex: 2,
          marginTop: 10
        },
        bottom: {
          position: 'absolute', 
          bottom: 0
        },
        titleView: {
          alignItems: 'center'
        },
        title : {
          backgroundColor: 'transparent',
          letterSpacing: 3,
          fontFamily: 'NotoSans',  
          textAlign: 'center', 
          fontSize: 12,
          color: '#606060'
        }
      }
  })
}

export default class MeetCuteConfigScene extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() { 
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  buttonOnPress = () => {
    Actions.MeetCuteSwiper({type: 'replace'})
  }


  render() {
    return(
      <View style={ styles.view }>

        <View style={ styles.top }>
          <SliderContainer/>
        </View>

        <View style={ styles.titleView }>
          <Text style={ styles.title }>進階篩選(僅限高級會員)</Text>
        </View>

        <View style={ styles.middle }>
          <OptionContainer/>
        </View>

        <View style={ styles.bottom }>
          <BaconRoutes
            routesText='完成'
            routesOnPress={ this.buttonOnPress } 
          />
        </View>

      </View>
    )
  }
}

