import React from 'react'
import { View, Text, Switch } from 'react-native'


const styles = {
  BaconSwitch: {
    paddingTop: 7, 
    paddingBottom: 7,
    paddingRight: 15,
    paddingLeft: 15,
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderBottomColor: '#b3b3b3', 
    justifyContent: 'space-between'
  },
  switchText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    textAlign: 'center', 
    fontWeight: '500',
    color: '#606060'
  }
}

const BaconSwitch = ({ switchText, switchValue, switchonValueChange}) => {

  return(
    <View style={ styles.BaconSwitch }>
      <Text style={ styles.switchText } >{ switchText }</Text>
      <Switch
        onValueChange={ switchonValueChange }
        value={ switchValue }
        thumbTintColor='#d63768'
        onTintColor='rgba(214, 55, 104, 0.3)'
        tintColor='#b3b3b3'
      />
    </View>
  )
}

export default BaconSwitch