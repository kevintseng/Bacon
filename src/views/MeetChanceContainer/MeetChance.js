import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native'
import { Cookie } from './MeetChance/Cookie'

const { width, height } = Dimensions.get('window')

const MeetChance = () => {
  return(
    <View>
      <ScrollView style={{width, height}}>
          <View style = {{backgroundColor: "#e6e6fa"}}>
            <Cookie/>
          </View>
          <View style = {{flexDirection: 'row', flexWrap: 'wrap', alignItems:'flex-start', backgroundColor: "#ff0000"}}> 
            <Cookie/>
            <Cookie/>  
            <Cookie/>  
            <Cookie/>
            <Cookie/>  
            <Cookie/>
            <Cookie/>
            <Cookie/>
            <Cookie/>
            <Cookie/>
            <Cookie/>
            <Cookie/>
            <Cookie/>
            <Cookie/>
            <Cookie/>
            <Cookie/>
            <Cookie/>
            <Cookie/>
            <Cookie/>
            <Cookie/>
          </View>        
      </ScrollView>
    </View>
  )
}

export { MeetChance }