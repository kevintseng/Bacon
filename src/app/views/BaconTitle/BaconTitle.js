import React from 'react'
import { View, Image } from 'react-native'

const styles = {
  title: {
    justifyContent: 'center', 
    alignItems: 'center'
  }
}

const BaconTitle = () => {
  return(
    <View style={ styles.title }>
      <Image source={require('./img/ico_titlebar_logo.png')} />
    </View>
  )
}

export default BaconTitle