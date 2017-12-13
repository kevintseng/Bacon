import React from 'react'
import { ScrollView, View, Text, Image, Dimensions, TouchableOpacity, Platform } from 'react-native'
import { Avatar, Badge } from 'react-native-elements'

import ListItem from '../ListItem'
import BaconTitle from '../BaconTitle/BaconTitle'
import BaconMenu from '../BaconMenu/BaconMenu'
//import Cookie from '../Cookie/Cookie'
import CircleImage from 'react-native-bacon-circle-image'


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
    fontSize: 18,
    //width: 130,
    flexWrap: "wrap",
  },
  badge: {
    width: 40,
    opacity: 0
  },
  topBlock: {
    //backgroundColor: 'red',
    marginBottom: 7
  }
}

const Drawer = ({ avatar, warningTop, warningBottom, displayName, displayNameOnPress, meetChanceOnPress, meetCuteOnPress, fateOnPress, chatOnPress, settingOnPress, articleOnPress, masterOnPress, testOnPress,swiperOnPress }) => {

  return(
    <ScrollView showsVerticalScrollIndicator={false} style = { styles.scrollView } >
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

        <TouchableOpacity activeOpacity={1} style={styles.topBlock} onPress={ displayNameOnPress }>
          <View style={{alignItems: 'center',marginTop: 10}}>
            <CircleImage
              disabled
              radius={75}
              source={{uri: avatar}}
              placeholderSource={require('../../../images/ico_qy_head_preload.png')}
              loadingStyle={{ size: 'small', color: '#b3b3b3' }}
            />
          </View>
          <View style={{alignItems: 'flex-start',flexDirection: 'row', justifyContent: 'space-between',marginTop: 14, marginBottom: 7}}>
            <View style={ styles.badge }>
              <Badge value={33} containerStyle={{ backgroundColor: 'red'}}/>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.displayName}>{displayName || '載入中'}</Text>
            </View>
            <View style={styles.badge}>
              <Badge value={33} containerStyle={{ backgroundColor: 'red'}}/>
            </View>
          </View>
        </TouchableOpacity>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_meet.png')} listTitle='巧遇' showBadge={false} badgeCount={120} listOnPress={ meetChanceOnPress }/>
        </View>
        
        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_qy.png')} listTitle='邂逅' showBadge={false} listOnPress={ meetCuteOnPress }/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_chat.png')} listTitle='訊息' showBadge={false} badgeCount={6} listOnPress={ chatOnPress }/>
        </View>
        
        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_setting.png')} listTitle='設定' listOnPress={ settingOnPress }/>
        </View>

      </View>

    </ScrollView>
  )
 }

export default Drawer

/*



        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_qy.png')} listTitle='邂逅' showBadge={false} listOnPress={ swiperOnPress }/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_meet.png')} listTitle='巧遇' showBadge={false} badgeCount={120} listOnPress={ meetchanceOnPress }/>
        </View>


        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_meet.png')} listTitle='巧遇' showBadge={false} badgeCount={120} listOnPress={ meetchanceOnPress }/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_yf.png')} listTitle='緣分' showBadge={false} badgeCount={9} listOnPress={ fateOnPress }/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_column.png')} listTitle='專欄' showBadge={false} listOnPress={ articleOnPress }/>
        </View>


        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_qy.png')} listTitle='邂逅' showBadge={false} listOnPress={ swiperOnPress }/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_qy.png')} listTitle='測試' showBadge={false} listOnPress={ testOnPress }/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_qy.png')} listTitle='邂逅' showBadge={false} listOnPress={ meetcueOnPress }/>
        </View>

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_column.png')} listTitle='達人聊天室' listOnPress={ masterOnPress }/>
        </View>
*/

/*

        <View style={{marginTop: 7}}>
          <ListItem listPicSource={require('./img/ico_menu_qy.png')} listTitle='邂逅' showBadge={false} listOnPress={ swiperOnPress }/>
        </View>

        <View style={{marginTop: 7,alignSelf: 'center'}}>
          <Text style={{color: 'red'}}>{ warningTop }</Text>
        </View>

        <View style={{marginTop: 20,alignSelf: 'center'}}>
          <Text style={{color: 'red'}}>{ warningBottom }</Text>
        </View>
*/
