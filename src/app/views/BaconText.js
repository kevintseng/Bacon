import React from 'react'
import { Text } from 'react-native'

const styles = {
  default: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 18,
    fontWeight: '500',
    color: '#606060',
    backgroundColor: 'transparent'
  }
}

const BaconText = ({style}) => {

  return(
    <Text style={[styles.default,style]}>
      {children}
    </Text>
  )
}

export default BaconText