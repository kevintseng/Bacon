import React from 'react'
import { View, Image, Text, TouchableHighlight } from 'react-native'

import Knife from '../Knife/Knife'

const SettingIndex = ({ leftTopText, rightTopText, leftBottomText, rightBottomText, leftTopOnPress, rightTopOnPress, leftBottomOnPress, rightBottomOnPress, leftTopOnHideUnderlay, leftTopOnShowUnderlay, rightTopOnHideUnderlay, rightTopOnShowUnderlay, leftBottomOnHideUnderlay, leftBottomOnShowUnderlay, rightBottomOnHideUnderlay, rightBottomOnShowUnderlay, leftTopPress,rightTopPress,leftBottomPress,rightBottomPress }) => {
  return(
    <Knife>
      <View style={{marginTop: 50,borderWidth: 0}}>
        <View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
          <View>
            <TouchableHighlight underlayColor={'transparent'} activeOpacity={1} onHideUnderlay={ leftTopOnHideUnderlay } onShowUnderlay={ leftTopOnShowUnderlay } onPress={ leftTopOnPress }>
              <Image style={{justifyContent: 'flex-end',alignItems: 'center'}} source={ leftTopPress ? require('./img/btn_setting_about_fb.png') : require('./img/btn_setting_about.png')}>
                <View style={{marginBottom: 20}}>
                  <Text>{ leftTopText }</Text>
                </View>
              </Image>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight underlayColor={'transparent'} activeOpacity={1} onHideUnderlay={ rightTopOnHideUnderlay } onShowUnderlay={ rightTopOnShowUnderlay } onPress={ rightTopOnPress }>
              <Image style={{justifyContent: 'flex-end',alignItems: 'center'}} source={ rightTopPress ? require('./img/btn_setting_account_fb.png') : require('./img/btn_setting_account.png')}>
                <View style={{marginBottom: 20}}>
                  <Text>{ rightTopText }</Text>
                </View>
              </Image>
            </TouchableHighlight>
          </View>
        </View>

        <View style={{flexDirection: 'row',justifyContent: 'space-around',marginTop: 30}}>
          <View>
            <TouchableHighlight underlayColor={'transparent'} activeOpacity={1} onHideUnderlay={ leftBottomOnHideUnderlay } onShowUnderlay={ leftBottomOnShowUnderlay } onPress={ leftBottomOnPress }>
              <Image style={{justifyContent: 'flex-end',alignItems: 'center'}} source={ leftBottomPress ? require('./img/btn_setting_hide_fb.png') : require('./img/btn_setting_hide.png')}>
                <View style={{marginBottom: 20}}>
                  <Text>{ leftBottomText }</Text>
                </View>
              </Image>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight underlayColor={'transparent'} activeOpacity={1} onHideUnderlay={ rightBottomOnHideUnderlay } onShowUnderlay={ rightBottomOnShowUnderlay } onPress={ rightBottomOnPress }>
              <Image style={{justifyContent: 'flex-end',alignItems: 'center'}} source={ rightBottomPress ? require('./img/btn_setting_noti_fb.png') : require('./img/btn_setting_noti.png')}>
                <View style={{marginBottom: 20}}>
                  <Text>{ rightBottomText }</Text>
                </View>
              </Image>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Knife>
  )
}

export default SettingIndex