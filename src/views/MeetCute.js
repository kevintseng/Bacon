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

//console.warn(width)
//const PHOTO_URLS = 
//['https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/14523254_10205912479689697_9039309889239665813_n.jpg?oh=d5c8c264afd125e35eafd4627cac6cca&oe=597CD498',
//'https://scontent-tpe1-1.xx.fbcdn.net/v/t31.0-8/14991236_10205971680689685_610830410193140380_o.jpg?oh=01075df4eddf07bfa4967dbbd851e05a&oe=59BDAD66']
//const photoURL = 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/14523254_10205912479689697_9039309889239665813_n.jpg?oh=d5c8c264afd125e35eafd4627cac6cca&oe=597CD498'
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

/*

<Picture width={width} photoURL={ADD_IMAGE}></Picture>
/*
          <Carousel delay={2000} style={{ flex: 1, backgroundColor: "#ff1493" }} pageInfo autoplay={false} onAnimateNextPage={(p) => console.log(p)} >
            <Image resizeMode="contain" style={{flex: 1}} source={{uri: ADD_IMAGE}}/>
            <Image resizeMode="contain" style={{flex: 1}} source={{uri: ADD_IMAGE}}/>
          </Carousel>
*/