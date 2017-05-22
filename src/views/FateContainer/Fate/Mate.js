import React from 'react';
import { View, Text, } from 'react-native';
import { Cookie } from './components/Cookie'

const Mate = () => {
  return(
    <View style={{flex: 1}}>
      <View style={{alignItems: 'flex-end', marginRight: 10}}>
        <Text>你目前已與<Text style={{color: '#4169e1'}}>14</Text>個會員互有好感!</Text>
      </View>
      <View>
        <Cookie name='A'><Text style={{color: '#000000'}}>你們在<Text style={{color: '#4169e1'}}>2017年5月</Text>互有好感</Text></Cookie>
        <Cookie name='B'><Text style={{color: '#000000'}}>你們在<Text style={{color: '#4169e1'}}>2017年5月</Text>互有好感</Text></Cookie>
        <Cookie name='C'><Text style={{color: '#000000'}}>你們在<Text style={{color: '#4169e1'}}>2017年5月</Text>互有好感</Text></Cookie>
      </View>
    </View>
  )
}

export { Mate }