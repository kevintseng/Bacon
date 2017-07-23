import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Actions } from "react-native-router-flux"

const menuOnPress = () => Actions.pop()

const styles = {
  return: {
    marginTop: 3
  }
}

const Return = () => {
  return(
    <TouchableOpacity style={ styles.return } onPress={ menuOnPress } >
      <Image source={require('./img/btn_back.png')} />
    </TouchableOpacity>
  )
}

export default Return