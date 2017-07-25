import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import Knife from '../Knife/Knife'

const styles = {
  SettingAccount: {
    alignSelf: 'center',
    position: 'absolute', 
    justifyContent: 'center',
    top: 30,
    //backgroundColor: 'red'
  },
  buttonImage: {
    justifyContent: 'center'
  },
  midButtonView: {
    marginTop: 25,
    alignSelf: 'center'
  },
  bottomButtonView: {
    marginTop: 230,
    alignSelf: 'center'
  },
  topButtonText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    textAlign: 'center',
    fontWeight: '500',
    color: 'black',  
    fontSize: 20
  },
  midButtonText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    textAlign: 'center',
    fontWeight: '500',
    color: 'white',  
    fontSize: 20    
  },
  bottomButtonText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    textAlign: 'center',
    //fontWeight: '500',
    color: '#d63768',  
    fontSize: 13
  }
}

const SettingAccount = ({ topButtonText, topButtonOnPress, midButtonText, midButtonOnPress, bottomButtonText, bottomButtonOnPress }) => {
  return(
    <Knife>

      <View style={ styles.SettingAccount }>

        <View>
          <TouchableOpacity onPress={ topButtonOnPress }>
            <Image style={ styles.buttonImage } source={require('./img/btn_index_join.png')}>
              <Text style={ styles.topButtonText }>{ topButtonText }</Text>
            </Image>
          </TouchableOpacity>
        </View>

        <View style={ styles.midButtonView }>
          <TouchableOpacity onPress={ midButtonOnPress }>
            <Image style={ styles.buttonImage } source={require('./img/btn_setting_logout.png')}>
              <Text style={ styles.midButtonText }>{ midButtonText }</Text>
            </Image>
          </TouchableOpacity>
        </View>

        <View style={ styles.bottomButtonView } >
          <TouchableOpacity onPress={ bottomButtonOnPress }>
            <Image style={ styles.buttonImage } source={require('./img/btn_setting_del.png')}>
              <Text style={ styles.bottomButtonText }>{ bottomButtonText }</Text>
            </Image>
          </TouchableOpacity>
        </View>

      </View>

    </Knife>
  )
}

export default SettingAccount