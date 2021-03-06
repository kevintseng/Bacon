import React, { Component } from 'react'
import { View, Text, Platform, BackHandler, ToastAndroid, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'

import SliderContainer from './containers/SliderContainer'
import OptionContainer from './containers/OptionContainer'

import BaconRoutes from '../../../../views/BaconRoutes/BaconRoutes'

const { width } = Dimensions.get('window')

const styles = {
 
        view: {
          flex: 1,
          alignItems: 'center'
        },
        top: {
          flex: 1,
          paddingTop: 20,
          alignSelf: 'center'
        },
        middle: {
          flex: 2,
          marginTop: 10,
          width
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
          //fontWeight: '500',
          fontSize: 12,
          color: '#606060'
        }
}

export default class MeetChanceConfigScene extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  buttonOnPress = () => {
    Actions.MeetChanceWaterFall({type: 'replace'})
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
