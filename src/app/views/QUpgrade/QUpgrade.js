import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const QUpgrade = ({ QUpgradeText, QUpgradeValue }) => {
  return(
    <TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{marginRight: 10, alignItems: 'center',justifyContent: 'center'}}>
          <Text style={{color: 'white',backgroundColor: 'transparent',fontFamily: 'NotoSans'}}>{ QUpgradeText }</Text>
          <Text style={{color: 'white',backgroundColor: 'transparent',fontFamily: 'NotoSans'}}>{ QUpgradeValue }</Text>
        </View>
        <Image style={{alignItems: 'center',justifyContent: 'center'}} source={require('./img/btn_aboutme_deposit.png')}>
          <Text style={{color: '#d63768',fontSize: 7,paddingTop: 5,backgroundColor: 'transparent', fontFamily: 'NotoSans'}}>儲值</Text>
        </Image>
      </View>
    </TouchableOpacity>
  )
}

export default QUpgrade