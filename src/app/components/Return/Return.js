import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Actions } from "react-native-router-flux"

const menuOnPress = () => Actions.pop()

const Return = () => {
  return(
    <View>
      <TouchableOpacity onPress={ menuOnPress } >
        <Image source={require('./img/btn_back.png')} />
      </TouchableOpacity>
    </View>
  )
}

export default Return