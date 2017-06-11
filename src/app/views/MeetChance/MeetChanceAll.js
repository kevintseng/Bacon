import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native'
import { observer, inject } from "mobx-react/native"
// components
import Cookie from './MeetChanceAll/Cookie'

const { width, height } = Dimensions.get('window')

const MeetChanceAll = inject("SubjectStore","ObjectStore")(observer(({ SubjectStore, ObjectStore }) => {

  const renderCookie = ObjectStore.preyList.map((prey)=>( <Cookie name={prey.displayName} photoURL={prey.photoURL} key={prey.uid} onPressButton={ function(prey){ ObjectStore.onPressButton(prey) }}/> ))
  return(
    <View style={{width, height}}>
      <View style = {{justifyContent: 'center', alignItems: 'center'}}>
        <Cookie name={SubjectStore.displayName} photoURL={SubjectStore.photoURL} onPressButton={ SubjectStore.onPressMeetChance.bind(SubjectStore)}/> 
      </View>
      <ScrollView >
        <View style = {{flexDirection: 'row', flexWrap: 'wrap', alignItems:'flex-start', backgroundColor: "#ff0000"}}> 
          { renderCookie }
        </View>        
      </ScrollView>
    </View>
  )
}))

export default MeetChanceAll