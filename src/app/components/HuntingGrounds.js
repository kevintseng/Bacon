import React from "react"
import { View, Dimensions, ScrollView } from "react-native"
import { Collapse } from "./HuntingGrounds/Collapse"
import { BasicInfo } from "./HuntingGrounds/BasicInfo"
import { Introduce } from "./HuntingGrounds/Introduce"
import { Interests } from "./HuntingGrounds/Interests"
import { Language } from "./HuntingGrounds/Language"
import { Distance } from "./HuntingGrounds/Distance"
import { Verified } from "./HuntingGrounds/Verified"
import { Interaction } from "./HuntingGrounds/Interaction"
//import Carousel from "react-native-looped-carousel"

const { width, height } = Dimensions.get('window')

const HuntingGrounds = ({leftIcon,rightIcon,showbutton}) => {
  return(
    <View style={{flex: 1}}>
      <ScrollView style={{width, height}}>
          <View style={{width, height: width}}>
            <Collapse leftIcon={leftIcon} rightIcon={rightIcon} showbutton={showbutton}/>
          </View>
          <View>   
            <BasicInfo/>
            <Introduce/>
            <Interests/>
            <Language/>
            <Distance/>
            <Verified/>
            <Interaction/>
          </View>        
      </ScrollView>
    </View>
  )
}

export default HuntingGrounds