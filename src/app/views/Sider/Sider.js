import React from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, Platform } from 'react-native'
import { Avatar, Badge } from 'react-native-elements'

import ListItem from '../ListItem'
import BaconTitle from '../BaconTitle/BaconTitle'
import BaconMenu from '../BaconMenu/BaconMenu'


const { width, height } = Dimensions.get('window')

const picWidth = (width * 0.8)/3

const styles = {
  scrollView: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }
}

const Drawer = ({ avatar, warningTop, warningBottom, displayName, displayNameOnPress, meetchanceOnPress, meetcueOnPress, fateOnPress, messageOnPress, settingOnPress }) => {

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

        <View style={{alignItems: 'center',marginTop: 20}}>
          <Avatar
            width={picWidth}
            heigh={picWidth}
            rounded
            source={ avatar ? {uri: avatar} : avatar }
            activeOpacity={0.7}
          />
        </View>

        <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: 40, opacity: 0}}>
            <Badge value={33} containerStyle={{ backgroundColor: 'red'}}/>
          </View>         
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={ displayNameOnPress }>
            <Text style={{textAlign: 'center',color: '#606060',fontWeight: 'normal'}}>{ displayName }</Text>
          </TouchableOpacity>
          <View style={{width: 40, opacity: 0 }}>
            <Badge value={33} containerStyle={{ backgroundColor: 'red'}}/>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <ListItem listPicSource={require('./img/ico_menu_qy.png')} listTitle='巧遇' showBadge={false} badgeCount={120} listOnPress={ meetchanceOnPress }/>
        </View>
      
        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_meet.png')} listTitle='邂逅' showBadge={false} listOnPress={ meetcueOnPress }/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_chat.png')} listTitle='訊息' showBadge={false} badgeCount={6} listOnPress={ messageOnPress }/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_yf.png')} listTitle='緣分' showBadge={false} badgeCount={9} listOnPress={ fateOnPress }/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_column.png')} listTitle='專欄'/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_setting.png')} listTitle='設定' listOnPress={ settingOnPress }/>
        </View>

        <View style={{marginTop: 7,alignSelf: 'center'}}>
          <Text style={{color: 'red'}}>{ warningTop }</Text>
        </View>

        <View style={{marginTop: 20,alignSelf: 'center'}}>
          <Text style={{color: 'red'}}>{ warningBottom }</Text>
        </View>

      </View>

    </View>
  )
 }

export default Drawer
