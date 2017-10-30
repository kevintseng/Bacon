import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const styles = {
  preview: {
    padding : 10, // 加大點擊範圍
  }
}

const BaconPreview = ({ onPress }) => {
  return(
    <TouchableOpacity style={ styles.preview } onPress={ onPress } >
      <Image source={require('./img/btn_back.png')} />
    </TouchableOpacity>
  )
}

export default BaconPreview