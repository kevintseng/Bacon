import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Actions } from "react-native-router-flux"

const menuOnPress = () => Actions.pop()

const styles = {
  arrow: {
    padding : 10, // 加大點擊範圍
    //backgroundColor: 'yellow'
  }
}

const BaconArrow = () => {
  return(
    <TouchableOpacity style={ styles.arrow } onPress={ menuOnPress } >
      <Image source={require('./img/btn_back.png')} />
    </TouchableOpacity>
  )
}

export default BaconArrow