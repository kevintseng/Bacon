import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native'
import { observer, inject } from "mobx-react/native"
// components
import Cookie from './MeetChanceAll/Cookie'

const { width, height } = Dimensions.get('window')

const MeetChanceAll = inject("SubjectStore","ObjectStore")(observer(({ SubjectStore, ObjectStore }) => {

  const renderCookie = ObjectStore.preyList.map((prey)=>( <Cookie key={prey.uid} name={prey.displayName} photoURL={prey.photoURL} onPressButton={ function onPressButton(){ ObjectStore.onPressButton(prey) } }/> ))
  return(
    <View style={{width}}>
      <View style = {{justifyContent: 'center', alignItems: 'center'}}>
        <Cookie name={SubjectStore.displayName} photoURL={SubjectStore.photoURL} onPressButton={ ObjectStore.onPressAboutMe }/> 
      </View>
      <ScrollView>
        <View style = {{flexDirection: 'row', flexWrap: 'wrap', alignItems:'flex-start'}}> 
          { renderCookie }
        </View>        
      </ScrollView>
    </View>
  )
}))

export default MeetChanceAll