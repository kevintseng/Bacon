import React from "react"
import { View, Dimensions, ScrollView } from "react-native"
import { Collapse } from "./Index/Collapse"
import { BasicInfo } from "./Index/BasicInfo"
import { Introduce } from "./Index/Introduce"
import { Interests } from "./Index/Interests"
import { Language } from "./Index/Language"
import { Distance } from "./Index/Distance"
import { Verified } from "./Index/Verified"
//import Carousel from "react-native-looped-carousel"

const { width, height } = Dimensions.get('window')

//console.warn(width)
//const PHOTO_URLS = 
//['https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/14523254_10205912479689697_9039309889239665813_n.jpg?oh=d5c8c264afd125e35eafd4627cac6cca&oe=597CD498',
//'https://scontent-tpe1-1.xx.fbcdn.net/v/t31.0-8/14991236_10205971680689685_610830410193140380_o.jpg?oh=01075df4eddf07bfa4967dbbd851e05a&oe=59BDAD66']
//const photoURL = 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/14523254_10205912479689697_9039309889239665813_n.jpg?oh=d5c8c264afd125e35eafd4627cac6cca&oe=597CD498'
const Index = () => {
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

export { Index }

/*

<Picture width={width} photoURL={ADD_IMAGE}></Picture>
/*
          <Carousel delay={2000} style={{ flex: 1, backgroundColor: "#ff1493" }} pageInfo autoplay={false} onAnimateNextPage={(p) => console.log(p)} >
            <Image resizeMode="contain" style={{flex: 1}} source={{uri: ADD_IMAGE}}/>
            <Image resizeMode="contain" style={{flex: 1}} source={{uri: ADD_IMAGE}}/>
          </Carousel>
*/