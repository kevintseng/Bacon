import React from 'react'
import { View, Image } from 'react-native'

const styles = {
  title: {
    height: 54, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
}

const Title = () => {
  return(
    <View style={ styles.title }>
      <Image source={require('./img/ico_titlebar_logo.png')} />
    </View>
  )
}

export default Title