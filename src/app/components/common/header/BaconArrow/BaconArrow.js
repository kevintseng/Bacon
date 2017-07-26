import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Actions } from "react-native-router-flux"

const menuOnPress = () => Actions.pop()

const styles = {
  return: {
    //marginTop: 3,
    //marginLeft: 5
    padding: 10,
    //backgroundColor: 'red'
  }
}

const BaconArrow = () => {
  return(
    <TouchableOpacity style={ styles.return } onPress={ menuOnPress } >
      <Image source={require('./img/btn_back.png')} />
    </TouchableOpacity>
  )
}

export default BaconArrow