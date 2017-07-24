import React from 'react'
import { View, Image } from 'react-native'

const styles = {
  themeView: {
    flex: 1
  },
  knifeView: {
    position: 'absolute', 
    bottom: 0
  }
}

const Knife = ({ children }) => {
  return(
    <View style={ styles.themeView }>
      { children }
      <View style={ styles.knifeView }>
        <Image source={require('./img/bg_setting.png')} />
      </View>
    </View>
  )
}

export default Knife