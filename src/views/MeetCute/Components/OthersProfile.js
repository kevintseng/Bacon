import React from "react"
import { View, Dimensions, ScrollView } from "react-native"
import { Picture } from "./Picture"
import { DisplayName } from "./DisplayName"
import { Introduce } from "./Introduce"
import { Interests } from "./Interests"
import { Language } from "./Language"
import { Distance } from "./Distance"
import { Verified } from "./Verified"
//import Carousel from "react-native-looped-carousel"

const { width, height } = Dimensions.get('window')

//console.warn(width)
//const PHOTO_URLS = 
//['https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/14523254_10205912479689697_9039309889239665813_n.jpg?oh=d5c8c264afd125e35eafd4627cac6cca&oe=597CD498',
//'https://scontent-tpe1-1.xx.fbcdn.net/v/t31.0-8/14991236_10205971680689685_610830410193140380_o.jpg?oh=01075df4eddf07bfa4967dbbd851e05a&oe=59BDAD66']
const photoURL = 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/14523254_10205912479689697_9039309889239665813_n.jpg?oh=d5c8c264afd125e35eafd4627cac6cca&oe=597CD498'
const OthersProfile = ({data, getNext}) => {
  return(
    <View style={{width, height}}>
      <ScrollView style={{backgroundColor: '#d2b48c'}}>
          <View style={{backgroundColor: '#4169e1', width, height: width}}>
            <Picture photoURL={photoURL}/>
          </View>
          <View style={{backgroundColor: '#008000'}}>   
            <DisplayName data={data} getNext={getNext}/>
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

export { OthersProfile }
//<Picture width={width} photoURL={ADD_IMAGE}></Picture>
/*
          <Carousel delay={2000} style={{ flex: 1, backgroundColor: "#ff1493" }} pageInfo autoplay={false} onAnimateNextPage={(p) => console.log(p)} >
            <Image resizeMode="contain" style={{flex: 1}} source={{uri: ADD_IMAGE}}/>
            <Image resizeMode="contain" style={{flex: 1}} source={{uri: ADD_IMAGE}}/>
          </Carousel>
*/