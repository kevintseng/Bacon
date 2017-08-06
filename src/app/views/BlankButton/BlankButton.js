import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const styles = {
  image: {
    justifyContent: 'center'
  },
  buttonText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    textAlign: 'center',
    //fontWeight: '500',
    color: '#606060',  
    fontSize: 20
  }
}

const BlankButton = ({text, onPress}) => {
  return(
    <TouchableOpacity onPress={ onPress }>
      <Image style={ styles.image } source={require('./img/btn_index_join.png')}>
        <Text style={ styles.buttonText }>{ text }</Text>
      </Image>
    </TouchableOpacity>
  )
}

export default BlankButton