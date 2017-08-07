import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'


const Infos = ({verityEmail, verityPhoto, displayName, bio, age, langs, distance}) => (
  <View style={{flex: 1}}>
    <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
      <Image style={{marginRight: 5}} source={verityEmail ? require('./img/ico_meet_email_1.png') : require('./img/ico_aboutme_mail_0.png')}/>
      <Image style={{marginRight: 5}} source={verityPhoto ? require('./img/ico_meet_picture_1.png') : require('./img/ico_aboutme_picture_0.png')}/>
      <Text style={{fontSize: 20,color: '#606060',fontFamily: 'NotoSans'}}>{ displayName }</Text>
      <Text style={{fontSize: 20,color: '#606060',fontFamily: 'NotoSans'}}>, </Text>
      <Text style={{fontSize: 20,color: '#606060',fontFamily: 'NotoSans'}}>{ age }</Text>
    </View>

    <View style={{marginTop: 10, alignSelf: 'center', alignItems: 'center',paddingRight: 20, paddingLeft: 20}}><Text style={{fontSize: 10,color: '#606060'}}>{ bio }</Text></View>
    
    <View style={{marginTop: 10, flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
      <Image style={{marginRight: 5}} source={require('./img/ico_meet_globe.png')}/>
      <Text style={{fontSize: 10,color: '#606060',fontFamily: 'NotoSans'}}>{ langs }</Text>
    </View>

    <View style={{marginTop: 10, flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
      <Image style={{marginRight: 5}} source={require('./img/ico_meet_locate.png')}/>
      <Text style={{fontSize: 10,color: '#606060',fontFamily: 'NotoSans'}}>你們距離大約 { distance } 公里</Text>
    </View>

    <TouchableOpacity style={{marginTop: 10, flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
      <Image style={{marginRight: 5}} source={require('./img/btn_meet_block.png')}/>
      <Text style={{fontSize: 10,color: '#606060',fontFamily: 'NotoSans'}}>封鎖此人</Text>
    </TouchableOpacity>
  </View>
)

export default Infos