import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Cookie } from './components/Cookie'
import { observer, inject } from "mobx-react/native"
import { CheckBox } from 'react-native-elements'

const Collection = inject("ObjectStore")(observer(({ ObjectStore }) => {

  const calculateAge = (birthday) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime()
    const ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  const renderCollection = ObjectStore.preyList.map(prey => (
    <Cookie key={prey.uid} name={ prey.displayName } ages={ calculateAge(prey.birthday) } photoURL={prey.photoURL} onPressButton={ function onPressButton(){ ObjectStore.goToMeetChanceSingle(prey) }}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: '#000000', paddingTop: 17}}>你們距離大約 7.9 公里</Text>
        <CheckBox
          iconRight
          containerStyle={{backgroundColor: "#ffffff", borderWidth: 0}}
          checked={false}
        />
      </View>
    </Cookie>
    )
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

  const collection = (
    <View>
      <View style={{alignItems: 'flex-end', marginRight: 10}}>
        <Text>目前收藏數<Text style={{color: '#4169e1'}}>{ObjectStore.preyList.length}</Text>/20</Text>
        <Text onPress={()=>{alert('提高我的收藏上限')}} style={{color: '#4169e1'}}>提高我的收藏上限</Text>
      </View>
      <View>
        {renderCollection}
      </View>
    </View>
  )

  return(
    <View style={{flex: 1}}>
      { ObjectStore.loading && indicator }
      {
        ObjectStore.preyList && !ObjectStore.loading && collection
      }
    </View>
  )
}))

export { Collection }