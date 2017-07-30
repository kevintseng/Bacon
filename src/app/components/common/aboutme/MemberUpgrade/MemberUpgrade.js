import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const MemberUpgrade = ({ MemberUpgradeText }) => {
  return(
    <TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{marginRight: 10, alignItems: 'center',justifyContent: 'center'}} source={require('./img/btn_aboutme_upgrade.png')}>
          <Text style={{color: '#d63768',fontSize: 7,paddingTop: 5, backgroundColor: 'transparent',}}>升級</Text>
        </Image>
        <Text style={{color: 'white', backgroundColor: 'transparent',}}>{ MemberUpgradeText }</Text>
      </View>
    </TouchableOpacity>
  )
}

export default MemberUpgrade