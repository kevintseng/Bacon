import React from 'react'
import { View, Image } from 'react-native'

const styles = {
  themeView: {
    flex: 1
  },
  waveView: {
    position: 'absolute', 
    bottom: 0
  }
}

const Wave = ({ children }) => {
  return(
    <View style={ styles.themeView }>
      { children }
      <View style={ styles.waveView }>
        <Image source={require('./img/pic_index_wave.png')} />
      </View>
    </View>
  )
}

export default Wave