import React from 'react'
import { View, Text, } from 'react-native'
import { Cookie } from './components/Cookie'

const GoodImpression = () => {
  return(
    <View style={{flex: 1}}>
      <Cookie name='A'><Text style={{color: '#000000'}}>你們距離大約 7.9 公里 </Text></Cookie>
      <Cookie name='B'><Text style={{color: '#000000'}}>你們距離大約 7.9 公里 </Text></Cookie>
      <Cookie name='C'><Text style={{color: '#000000'}}>你們距離大約 7.9 公里 </Text></Cookie>
    </View>
  )
}

export { GoodImpression }