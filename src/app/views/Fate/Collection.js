import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Cookie } from './components/Cookie'
import { observer, inject } from "mobx-react/native"

const Collection = inject("PreyStore")(observer(({ PreyStore }) => {

  const renderGoodImpression = PreyStore.preyList.map(prey => (<Cookie key={prey.uid} name={ prey.displayName }><Text style={{color: '#000000'}}>你們距離大約 7.9 公里</Text></Cookie>))

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
        PreyStore.preyList && !PreyStore.loading && renderGoodImpression
      }
    </View>
  )
}))

export { Collection }