import React from 'react'
import { View, Image, Dimensions } from 'react-native'

const { width, height } = Dimensions.get("window") //eslint-disable-line

const pxToDp = (uiElementPx) => {
  //PixelRatio.get();
  return uiElementPx*(width/1440)
}

const styles = {
  wave: {
    width: pxToDp(1440), 
    height: pxToDp(388)
  }
}

const Wave = () => {
  return(
    <View>
      <Image style={styles.wave} source={require('./img/pic_index_wave.png')} />
    </View>
  )
}

export default Wave
