import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { Badge } from 'react-native-elements'
import { observer } from 'mobx-react'

const BaconBadgeYes = observer(({ text, onPress }) => {
  return(
    <TouchableOpacity onPress={onPress}>
      <View style={{margin: 7, flexDirection: 'row'}}>
        <Badge containerStyle={{ backgroundColor: 'white', borderColor: '#d63768', borderWidth: 1}}>
          <Text style={{color: '#d63768'}}>{ text }</Text>
        </Badge>
      </View>
    </TouchableOpacity>
  )
})

const BaconBadgeNo = observer(({ text, onPress }) => {
  return(
    <TouchableOpacity onPress={onPress}>
      <View style={{margin: 7, flexDirection: 'row'}}>
        <Badge containerStyle={{ paddingLeft: 20, backgroundColor: 'white', borderColor: '#d63768', borderWidth: 1}}>
          <Text style={{color: '#d63768'}}>{ text }</Text>
        </Badge>
        <Image style={{position:'absolute',left: 8, bottom: 9}} source={require('./img/btn_interest_del.png')}/>
      </View>
    </TouchableOpacity>
  )
})

export { BaconBadgeYes, BaconBadgeNo }