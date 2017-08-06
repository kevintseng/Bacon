import React from 'react'
import { View, Text,Image, Dimensions } from 'react-native'
import { CheckBox } from 'react-native-elements'
import BaconRoutes from './BaconRoutes/BaconRoutes'

const { width, height } = Dimensions.get('window')

const styles = {
  topText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 12,
    fontWeight: '500',
    color: '#606060',
    textAlign: 'center',    
  },
  upperText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 12,
    //fontWeight: '500',
    color: '#606060',
    textAlign: 'center',    
  }
}

const UpgradeTitle = ({source, topText,upperText}) => {
  return(
    <View style={{flex: 1,alignItems: 'center'}}>
      <Image source={source}/>
      <Text style={styles.topText}>{topText}</Text>
      <Text style={styles.upperText}>{upperText}</Text>
    </View>
  )
}

export default UpgradeTitle
