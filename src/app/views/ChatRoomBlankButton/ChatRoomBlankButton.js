import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const styles = {
  image: {
    justifyContent: 'center',
    width: 175,
    height: 40
  },
  buttonText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    textAlign: 'center',
    color: '#606060',  
    fontSize: 14
  }
}

const ChatRoomBlankButton = ({text, onPress}) => {
  return(
    <TouchableOpacity onPress={ onPress }>
      <Image style={ styles.image } resizeMode={'contain'} source={require('./img/btn_index_join.png')}>
        <Text style={ styles.buttonText }>{ text }</Text>
      </Image>
    </TouchableOpacity>
  )
}

export default ChatRoomBlankButton