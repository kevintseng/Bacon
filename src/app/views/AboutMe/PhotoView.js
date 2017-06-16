import React from 'react'
import { View, Image } from 'react-native'

//const { width, height } = Dimensions.get('window');
//const pixelRatio = PixelRatio.get()
/*
const styles = {
  wrapperStyle: {
    marginTop: 7,
    paddingTop: 52
  }
}
*/

const PhotoView = () => {
  return(
    <View style={{flex: 1}}>
      <Image
        style={{flex: 1}}
        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
      />
    </View>
  )
}

export default PhotoView