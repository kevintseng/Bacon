import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'

import Wave from '../Wave/Wave'

const styles = {
  view: {
    alignItems: 'center'
  },
  routesImage: {
    justifyContent: 'center',
    width: 175,
    height: 40
  },
  routesText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    textAlign: 'center',
    color: 'white',
    fontSize: 14
  }
}

const ChatRoomRedButton = ({ text, onPress}) => {
  return(
    <TouchableOpacity onPress={ onPress }>
      <Image style={ styles.routesImage } resizeMode={'contain'} source={require('./img/btn_gredient.png')}>
        <Text style={ styles.routesText }>{ text }</Text>
      </Image>
    </TouchableOpacity>
  )
}

export default ChatRoomRedButton
