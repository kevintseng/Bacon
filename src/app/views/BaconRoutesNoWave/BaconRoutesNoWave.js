import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'

import BaconRedButton from '../BaconRedButton/BaconRedButton'

const { width, height } = Dimensions.get("window") //eslint-disable-line

const styles = {
  view: {
    width,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 120,
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
  },
  wave: {
    marginTop: 20
  }
}

const BaconRoutesNoWave = ({ routesText, routesOnPress, warningText, warningOnPress }) => {
  return(
    <View style={ styles.view }>

      <View>
        <BaconRedButton
          routesText={routesText}
          routesOnPress={routesOnPress}
          warningText={warningText}
          warningOnPress={warningOnPress}
          />
      </View>

    </View>
  )
}

export default BaconRoutesNoWave
