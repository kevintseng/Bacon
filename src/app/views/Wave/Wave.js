import React from 'react'
import { View, Image, Dimensions } from 'react-native'

const { width, height } = Dimensions.get("window") //eslint-disable-line

const Wave = () => {
  return(
    <View style={{flex:1, width}}>
      <Image style={{width}} source={require('./img/pic_index_wave.png')} />
    </View>
  )
}

export default Wave
