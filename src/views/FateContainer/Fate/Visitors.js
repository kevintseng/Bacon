import React from 'react'
import { View, Text } from 'react-native'
import { Cookie } from './components/Cookie'

const Visitors = () => {
  return(
    <View style={{flex: 1}}>
      <Cookie name='A'><Text style={{color: '#000000'}}>剛剛來訪</Text></Cookie>
      <Cookie name='B'><Text style={{color: '#000000'}}>剛剛來訪</Text></Cookie>
      <Cookie name='C'><Text style={{color: '#000000'}}>剛剛來訪</Text></Cookie>
    </View>
  )
}

export { Visitors }