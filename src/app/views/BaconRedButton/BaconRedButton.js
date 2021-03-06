import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import Wave from '../Wave/Wave'

const styles = {
  view: {
    alignItems: 'center'
  },
  routesImage: {
    justifyContent: 'center'
  },
  routesText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    textAlign: 'center',
    fontWeight: '500',
    color: 'white',
    fontSize: 20
  },
  warningView: {
    marginTop: 5
  },
  warningText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    textAlign: 'center',
    fontWeight: '500',
    color: '#606060',
    fontSize: 10
  }
}

const BaconRedButton = ({ routesText, routesOnPress, warningText, warningOnPress,confirm }) => {
  return(
    <View style={ styles.view }>
      <TouchableOpacity onPress={ routesOnPress }>
        <Image style={ styles.routesImage } source={confirm ? require('./img/btn_qy_confirm.png') : require('./img/btn_gredient.png')}>
          <Text style={ styles.routesText }>{ routesText }</Text>
        </Image>
      </TouchableOpacity>

      <TouchableOpacity style={ styles.warningView }onPress={ warningOnPress }>
        <Text style={ styles.warningText }>{ warningText }</Text>
      </TouchableOpacity>

    </View>
  )
}

export default BaconRedButton
