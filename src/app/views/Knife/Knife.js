import React from 'react'
import { View, Image, Dimensions } from 'react-native'

const { width, height } = Dimensions.get("window") //eslint-disable-line

const pxToDp = (uiElementPx) => {
  //PixelRatio.get();
  return uiElementPx*(width/1440)
}

const styles = {
  knife: {
    width: pxToDp(1440), 
    height: pxToDp(388)
  }
}

const Knife = () => {
  return(
    <View>
      <Image style={styles.knife} source={require('./img/bg_setting.png')} />
    </View>
  )
}

export default Knife