import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const MemberUpgrade = ({ vip, onPress }) => {
  return(
    <TouchableOpacity onPress={onPress}>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        { vip ?
        <Image style={{marginRight: 10, alignItems: 'center',justifyContent: 'center'}} source={require('./img/ico_aboutme_premium.png')} /> :
        <Image style={{marginRight: 10, alignItems: 'center',justifyContent: 'center'}} source={require('./img/btn_aboutme_upgrade.png')}>
          <Text style={{color: '#d63768',fontSize: 7,paddingTop: 5, backgroundColor: 'transparent',fontFamily: 'NotoSans'}}>升級</Text>
        </Image>
        }
        <Text style={{color: 'white', backgroundColor: 'transparent',fontFamily: 'NotoSans'}}>{vip ? '高級會員' : '一般會員'}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default MemberUpgrade