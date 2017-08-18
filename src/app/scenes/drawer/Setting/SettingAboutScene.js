import React, { Component } from 'react'
import { View,Text, BackHandler, ToastAndroid, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'

import BlankButton from '../../../views/BlankButton/BlankButton'
import Knife from '../../../views/Knife/Knife'


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

export default class SettingAboutScene extends Component {

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

  version = () => {
    Alert.alert( 
      '目前版本', 'Alpha-1.1.4', [ 
        {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } 
      )
  }

  render() {
    return(
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flex: 1,paddingTop: 10, paddingRight: 40, paddingLeft: 40}}>
          <Text style={styles.text}>陸軍馬祖防衛指揮部黃姓女下士腳傷，轉支援醫療連，連長命她操課時間讀軍事準則，她卻廿五度摸魚，還投訴媒體遭霸凌、性騷擾。檢察官將她依陸海空軍刑法抗命罪起訴，她還向法官埋怨「連上沒幫我做過生日」。連江地院認為服從為軍人天職，判她六月徒刑，得易科罰金、緩刑兩年。</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'space-around', marginBottom: 100}}>
          <BlankButton 
            text='版本'
            onPress={ this.version }
          />
          <BlankButton
            text='服務條款'
          />
          <BlankButton
            text='個資保護政策'
          />
        </View>
        <View style={{position: 'absolute',bottom: 0}}>
          <Knife/>
        </View>
      </View>
    )
  }
}

