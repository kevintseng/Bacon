import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { Badge } from 'react-native-elements'
import { observer } from 'mobx-react'

const styles = {
  view: {
    margin: 7, 
    flexDirection: 'row'
  },
  color: { 
    color: '#d63768'
  },
  yesContainer: { 
    backgroundColor: 'white', 
    borderColor: '#d63768', 
    borderWidth: 1
  },
  noContainer: { 
    paddingLeft: 20, 
    backgroundColor: 'white', 
    borderColor: '#d63768', 
    borderWidth: 1
  },
  image: {
    position:'absolute',
    left: 8, bottom: 9
  }
}

const BaconBadgeYes = observer(({ activeOpacity, text, onPress }) => {
  return(
    <TouchableOpacity activeOpacity={activeOpacity || 0.2} onPress={onPress}>
      <View style={styles.view}>
        <Badge containerStyle={styles.yesContainer}>
          <Text style={styles.color}>{ text }</Text>
        </Badge>
      </View>
    </TouchableOpacity>
  )
})

const BaconBadgeNo = observer(({ text, onPress, activeOpacity }) => {
  return(
    <TouchableOpacity activeOpacity={activeOpacity || 0.2} onPress={onPress}>
      <View style={styles.view}>
        <Badge containerStyle={noContainer}>
          <Text style={styles.color}>{ text }</Text>
        </Badge>
        <Image style={styles.image} source={require('./img/btn_interest_del.png')}/>
      </View>
    </TouchableOpacity>
  )
})

export { BaconBadgeYes, BaconBadgeNo }