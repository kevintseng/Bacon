import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Cookie } from './components/Cookie'
import { observer, inject } from "mobx-react/native"

const Visitors = inject("PreyStore")(observer(({ PreyStore }) => {
  
  const renderVisitors = (PreyStore.preyList.map(prey => (<Cookie key={prey.uid} name={ prey.displayName }><Text style={{color: '#000000'}}>剛剛來訪</Text></Cookie>)))

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

  return(
    <View style={{flex: 1}}>
     { PreyStore.loading && indicator }
     {
      PreyStore.preyList && !PreyStore.loading && renderVisitors
     }
    </View>
  )
}))

export { Visitors }