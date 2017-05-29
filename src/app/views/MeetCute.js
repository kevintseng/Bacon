import React from "react"
import { View, Dimensions, ScrollView } from "react-native"
import { Collapse } from "./MeetCute/Collapse"
import { BasicInfo } from "./MeetCute/BasicInfo"
import { Introduce } from "./MeetCute/Introduce"
import { Interests } from "./MeetCute/Interests"
import { Language } from "./MeetCute/Language"
import { Distance } from "./MeetCute/Distance"
import { Verified } from "./MeetCute/Verified"
//import Carousel from "react-native-looped-carousel"

const { width, height } = Dimensions.get('window')

const MeetCute = () => {
  return(
    <View>
      <ScrollView style={{width, height}}>
          <View style={{width, height: width}}>
            <Collapse/>
          </View>
          <View>   
            <BasicInfo/>
            <Introduce/>
            <Interests/>
            <Language/>
            <Distance/>
            <Verified/>
          </View>        
      </ScrollView>
    </View>
  )
}

export default MeetCute