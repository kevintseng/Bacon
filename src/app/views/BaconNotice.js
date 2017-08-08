import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const styles = {
  notice: {
    padding : 10, // 加大點擊範圍
  }
}

const BaconNotice = ({onPress}) => {
  return(
    <TouchableOpacity style={ styles.notice } onPress={ onPress } >
      <Image source={require('../../images/ico_reg_mail.png')} />
    </TouchableOpacity>
  )
}

export default BaconNotice