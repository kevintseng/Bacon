import React from 'react'
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native'

import Wave from '../Wave/Wave'
import BaconRedButton from '../BaconRedButton/BaconRedButton'

const { width, height } = Dimensions.get('window')

const styles = {
  view: {
    alignItems: 'center',
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
    marginTop: 10
  }
}

const BaconRoutes = ({ routesText, routesOnPress, warningText, warningOnPress }) => {
  console.log("height: ", height)
  let bmt = 0
  if(height == 480) {
    bmt = 10
  }
  return(
    <View style={ styles.view }>

      <View style={{ marginTop: bmt }}>
        <BaconRedButton
          routesText={routesText}
          routesOnPress={routesOnPress}
          warningText={warningText}
          warningOnPress={warningOnPress}
          />
      </View>

      <View style={ styles.wave }>
        <Wave/>
      </View>

    </View>
  )
}

export default BaconRoutes
