import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const styles = {
  tool: {
    padding : 10, // 加大點擊範圍
  }
}

const BaconTool = ({onPress}) => {
  return(
    <TouchableOpacity style={ styles.tool } onPress={ onPress } >
      <Image source={require('./img/btn_meet_setting.png')} />
    </TouchableOpacity>
  )
}

export default BaconTool