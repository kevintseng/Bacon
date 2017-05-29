import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Cookie } from './components/Cookie'
import { observer, inject } from "mobx-react/native"
import { autorun } from 'mobx'

const GoodImpression = inject("prey")(observer(({ prey }) => {

  const renderGoodImpression = prey.preyList.map(prey => (<Cookie key={prey.uid} name={ prey.displayName }><Text style={{color: '#000000'}}>你們距離大約 7.9 公里</Text></Cookie>))

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

  //autorun(() => { console.warn("AAAA") })

  return(
    <View style={{flex: 1}}>
      { prey.loading && indicator }
      {
        prey.preyList && !prey.loading && renderGoodImpression
      }
    </View>
  )
}))

export { GoodImpression }