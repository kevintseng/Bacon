import React from 'react'
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Badge } from 'react-native-elements'

import ListItem from '../ListItem/ListItem'
import Menu from '../Menu/Menu'
import Title from '../Title/Title'

const { width, height } = Dimensions.get('window')

const picWidth = (width * 0.8)/3

const styles = {
  scrollView: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height
  }
}

const Sider = ({ avatar, warningTop, warningBottom, displayName, displayNameOnPress, meetchanceOnPress, fateOnPress, settingOnPress }) => {

  return(
    <ScrollView style = { styles.scrollView } >
      <View style={{marginRight: 20, marginLeft: 20}}>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{opacity: 0, marginTop: 7}} pointerEvents="none">
            <Menu/>
          </View>
          <View>
            <Title/>
          </View>
          <View style={{marginTop: 7}}>
            <Menu/>
          </View>
        </View>

        <View style={{alignItems: 'center',marginTop: 20}}>
          <Image 
            style={{ alignSelf: 'center', width: picWidth, height: picWidth, borderRadius: picWidth }}
            source={ avatar ? { uri: avatar } : require('./img/avatar.jpg')}       
          />
        </View>

        <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: 50, opacity: 0}}>
            <Badge value={3} containerStyle={{ backgroundColor: 'red'}}/>
          </View>         
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={ displayNameOnPress }>
            <Text style={{textAlign: 'center',color: '#606060',fontWeight: 'normal'}}>{ displayName }</Text>
          </TouchableOpacity>
          <View style={{width: 50 }}>
            <Badge value={3} containerStyle={{ backgroundColor: 'red'}}/>
          </View>
        </View>

        <View style={{marginTop: 30}}>
          <ListItem listPicSource={require('./img/ico_menu_qy.png')} listTitle='巧遇' showBadge badgeCount={120} listOnPress={ meetchanceOnPress }/>
        </View>
      
        <View style={{marginTop: 20}}>
          <ListItem listPicSource={require('./img/ico_menu_meet.png')} listTitle='邂逅'/>
        </View>

        <View style={{marginTop: 20}}>
          <ListItem listPicSource={require('./img/ico_menu_chat.png')} listTitle='訊息' showBadge badgeCount={6}/>
        </View>

        <View style={{marginTop: 20}}>
          <ListItem listPicSource={require('./img/ico_menu_yf.png')} listTitle='緣分' showBadge badgeCount={9} listOnPress={ fateOnPress }/>
        </View>

        <View style={{marginTop: 20}}>
          <ListItem listPicSource={require('./img/ico_menu_column.png')} listTitle='專欄'/>
        </View>

        <View style={{marginTop: 20}}>
          <ListItem listPicSource={require('./img/ico_menu_setting.png')} listTitle='設定' listOnPress={ settingOnPress }/>
        </View>

        <View style={{marginTop: 20,alignSelf: 'center'}}>
          <Text style={{color: 'red'}}>{ warningTop }</Text>
        </View>

        <View style={{marginTop: 20,alignSelf: 'center'}}>
          <Text style={{color: 'red'}}>{ warningBottom }</Text>
        </View>

      </View>

    </ScrollView>
  )
 }

export default Sider
