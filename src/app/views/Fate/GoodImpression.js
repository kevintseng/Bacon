import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Cookie } from './components/Cookie'
import { observer, inject } from "mobx-react/native"

const GoodImpression = inject("ObjectStore")(observer(({ ObjectStore }) => {

  const renderGoodImpression = ObjectStore.preyList.map(prey => (<Cookie key={prey.uid} name={ prey.displayName } photoURL={prey.photoURL} onPressButton={ function(prey){ ObjectStore.goToMeetCute(prey) }}><Text style={{color: '#000000'}}>你們距離大約 7.9 公里</Text></Cookie>))

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

  //const nonpreyList = <Text>目前還沒有對你有好感的人</Text>

  return(
    <View style={{flex: 1}}>
      { ObjectStore.loading && indicator }
      {
        ObjectStore.preyList && !ObjectStore.loading && renderGoodImpression
      } 
    </View>
  )
}))

export { GoodImpression }
//{ ObjectStore.preyList.length == 0 && !ObjectStore.loading && nonprey }