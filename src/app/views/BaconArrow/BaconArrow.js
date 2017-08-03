import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const styles = {
  arrow: {
    padding : 10, // 加大點擊範圍
  }
}

const BaconArrow = ({ onPress }) => {
  return(
    <TouchableOpacity style={ styles.arrow } onPress={ onPress } >
      <Image source={require('./img/btn_back.png')} />
    </TouchableOpacity>
  )
}

export default BaconArrow