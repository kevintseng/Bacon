import React from 'react'
import { View, Image } from 'react-native'

const Knife = ({children}) => {
  return(

    <View >
       { children }
      <Image style={{position: 'absolute', bottom: 0}} source={require('./img/bg_setting.png')} />
    </View>
  )
}

export default Knife