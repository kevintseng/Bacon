import React from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, Platform } from 'react-native'
import { Avatar, Badge } from 'react-native-elements'

import ListItem from '../ListItem'
import BaconTitle from '../BaconTitle/BaconTitle'
import BaconMenu from '../BaconMenu/BaconMenu'
import Cookie from '../Cookie/Cookie'

const { width, height } = Dimensions.get('window')

const picWidth = (width * 0.8)/3

const styles = {
  scrollView: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
  displayName: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    textAlign: 'center',
    color: '#606060',
    fontWeight: '500',
    fontSize: 20,
    //width: 130,
    flexWrap: "wrap",
  },
  badge: {
    width: 40,
    opacity: 0
  }
}

const Drawer = ({ avatar, warningTop, warningBottom, displayName, displayNameOnPress, meetchanceOnPress, meetcueOnPress, fateOnPress, messageOnPress, settingOnPress, articleOnPress, masterOnPress }) => {

  return(
    <View style = { styles.scrollView } >
      <View style={{marginLeft:5, marginRight:5, marginTop: Platform.OS === 'ios' ? 25 : 10}}>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{opacity: 0}} pointerEvents="none">
            <BaconMenu/>
          </View>
          <View>
            <BaconTitle/>
          </View>
          <View >
            <BaconMenu/>
          </View>
        </View>

        <View>
          <View style={{alignItems: 'center',marginTop: 10}}>
            <Cookie
              size={picWidth}
              avatar={avatar}
              borderColor='rgba(255, 255, 255, 1)'
            />
          </View>
          <TouchableOpacity style={{alignItems: 'flex-start',flexDirection: 'row', justifyContent: 'space-between',height: 45}} onPress={ displayNameOnPress }>
            <View style={ styles.badge }>
              <Badge value={33} containerStyle={{ backgroundColor: 'red'}}/>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.displayName}>{ (displayName || '') + ' '}</Text>
            </View>
            <View style={styles.badge}>
              <Badge value={33} containerStyle={{ backgroundColor: 'red'}}/>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_meet.png')} listTitle='巧遇' showBadge={false} badgeCount={120} listOnPress={ meetchanceOnPress }/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_qy.png')} listTitle='邂逅' showBadge={false} listOnPress={ meetcueOnPress }/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_chat.png')} listTitle='訊息' showBadge={false} badgeCount={6} listOnPress={ messageOnPress }/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_yf.png')} listTitle='緣分' showBadge={false} badgeCount={9} listOnPress={ fateOnPress }/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_column.png')} listTitle='專欄' showBadge={false} listOnPress={ articleOnPress }/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_column.png')} listTitle='達人聊天室' listOnPress={ masterOnPress }/>
        </View>
        
        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_setting.png')} listTitle='設定' listOnPress={ settingOnPress }/>
        </View>

      </View>

    </View>
  )
 }

export default Drawer

/*

        <View style={{marginTop: 7,alignSelf: 'center'}}>
          <Text style={{color: 'red'}}>{ warningTop }</Text>
        </View>

        <View style={{marginTop: 20,alignSelf: 'center'}}>
          <Text style={{color: 'red'}}>{ warningBottom }</Text>
        </View>
*/
