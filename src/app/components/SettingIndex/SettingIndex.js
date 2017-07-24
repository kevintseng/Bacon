import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import Knife from '../Knife/Knife'

const SettingIndex = ({ leftTopText, rightTopText, leftBottomText, rightBottomText, leftTopOnPress, rightTopOnPress, leftBottomOnPress, rightBottomOnPress }) => {
  return(
    <Knife>
      <View style={{marginTop: 50,borderWidth: 0}}>
        <View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
          <View>
            <TouchableOpacity onPress={ leftTopOnPress }>
              <Image style={{justifyContent: 'flex-end',alignItems: 'center'}} source={require('./img/btn_setting_about.png')}>
                <View style={{marginBottom: 20}}>
                  <Text>{ leftTopText }</Text>
                </View>
              </Image>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={ rightTopOnPress }>
              <Image style={{justifyContent: 'flex-end',alignItems: 'center'}} source={require('./img/btn_setting_account.png')}>
                <View style={{marginBottom: 20}}>
                  <Text>{ rightTopText }</Text>
                </View>
              </Image>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'row',justifyContent: 'space-around',marginTop: 30}}>
          <View>
            <TouchableOpacity onPress={ leftBottomOnPress }>
              <Image style={{justifyContent: 'flex-end',alignItems: 'center'}} source={require('./img/btn_setting_hide.png')}>
                <View style={{marginBottom: 20}}>
                  <Text>{ leftBottomText }</Text>
                </View>
              </Image>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={ rightBottomOnPress }>
              <Image style={{justifyContent: 'flex-end',alignItems: 'center'}} source={require('./img/btn_setting_noti.png')}>
                <View style={{marginBottom: 20}}>
                  <Text>{ rightBottomText }</Text>
                </View>
              </Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Knife>
  )
}

export default SettingIndex