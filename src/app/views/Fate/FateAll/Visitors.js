import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Cookie } from './components/Cookie'
import { observer, inject } from "mobx-react/native"

const Visitors = inject("ObjectStore")(observer(({ ObjectStore }) => {
  
  const calculateAge = (birthday) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime()
    const ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  const renderVisitors = (ObjectStore.preyList.map(prey => (
    <Cookie key={prey.uid} name={ prey.displayName } ages={ calculateAge(prey.birthday) } photoURL={prey.photoURL} onPressButton={ function onPressButton(){ ObjectStore.goToMeetChanceSingle(prey) }}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: '#000000', paddingTop: 17}}>剛剛來訪</Text>
      </View>
    </Cookie>))
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

  const visitors = (
    <View>
      {renderVisitors}
    </View>
  )

  return(
    <View style={{flex: 1}}>
     { ObjectStore.loading && indicator }
     {
      ObjectStore.preyList && !ObjectStore.loading && visitors
     }
    </View>
  )
}))

export { Visitors }