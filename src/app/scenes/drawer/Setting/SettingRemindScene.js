import React, { Component } from 'react'
import { View, Text, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

import PromptContainer from '../../../containers/SettingRemindScene/PromptContainer'
import ShakeContainer from '../../../containers/SettingRemindScene/ShakeContainer'
import Knife from '../../../views/Knife/Knife'

const styles = {
  title : {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    textAlign: 'center', 
    fontWeight: '500',
    color: '#606060'
  }
}

export default class SettingRemindScene extends Component {

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    //Actions.refresh({ key: 'Drawer', open: false })
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
      <View style={{flex: 1}}>

        <View style={{alignItems: 'center'}}>
          <Text style={ styles.title }>提示</Text>
        </View>

        <View>
          <PromptContainer/>
        </View>

        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text style={ styles.title }>震動</Text>
        </View>

        <View>
          <ShakeContainer/>
        </View>

        <View style={{position: 'absolute',bottom: 0}}>
          <Knife/>
        </View>

      </View>
    )
  }
}

