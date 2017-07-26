import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Actions } from "react-native-router-flux"

const menuOnPress = () => Actions.pop()

const styles = {
  arrow: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 3
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