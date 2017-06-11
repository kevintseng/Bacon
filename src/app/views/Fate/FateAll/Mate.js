import React from 'react'
import { View, Text, ActivityIndicator} from 'react-native'
import { observer, inject } from "mobx-react/native"
import { Cookie } from './components/Cookie'

const Mate = inject("ObjectStore")(observer(({ ObjectStore }) => {

  const renderMate = ObjectStore.preyList.map(prey => (
    <Cookie key={prey.uid} name={ prey.displayName } photoURL={prey.photoURL} onPressButton={ function onPressButton(){ ObjectStore.goToFateSingle(prey) }}><Text style={{color: '#000000'}}>你們在<Text style={{color: '#4169e1'}}>2017年5月</Text>互有好感</Text></Cookie>)
  )

  const indicator = (
    <ActivityIndicator
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        marginTop: 150
      }}
      size="large"
    />
  )

  const mates = (
    <View>
      <View style={{alignItems: 'flex-end', marginRight: 10}}>
        <Text>你目前已與<Text style={{color: '#4169e1'}}>{ObjectStore.preyList.length}</Text>個會員互有好感!</Text>
      </View>
      <View>
        {renderMate}
      </View>
    </View>
  )

  //const nonpreyList = <Text>目前還沒有對你有好感的人</Text>

  return(
    <View style={{flex: 1}}>
      { ObjectStore.loading && indicator }
      {
        ObjectStore.preyList && !ObjectStore.loading && mates
      } 
    </View>
  )
}))

export { Mate }

/*
      <View style={{alignItems: 'flex-end', marginRight: 10}}>
        <Text>你目前已與<Text style={{color: '#4169e1'}}>14</Text>個會員互有好感!</Text>
      </View>
      <View>
        <Cookie name='A' onPressButton={() => {console.warn("轉到巧遇")}}><Text style={{color: '#000000'}}>你們在<Text style={{color: '#4169e1'}}>2017年5月</Text>互有好感</Text></Cookie>
        <Cookie name='B' onPressButton={() => {console.warn("轉到巧遇")}}><Text style={{color: '#000000'}}>你們在<Text style={{color: '#4169e1'}}>2017年5月</Text>互有好感</Text></Cookie>
        <Cookie name='C' onPressButton={() => {console.warn("轉到巧遇")}}><Text style={{color: '#000000'}}>你們在<Text style={{color: '#4169e1'}}>2017年5月</Text>互有好感</Text></Cookie>
      </View>

*/