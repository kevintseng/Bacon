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
    color: 'white',  
    fontSize: 20    
  },
}

const GreyButton = ({text, onPress}) => {
  return(
    <TouchableOpacity onPress={ onPress }>
      <Image style={ styles.image } source={require('./img/btn_setting_logout.png')}>
        <Text style={ styles.buttonText }>{ text }</Text>
          </Image>
    </TouchableOpacity>
  )
}

export default GreyButton