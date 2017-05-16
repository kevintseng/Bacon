import React from "react"
import { View, Image, Text } from "react-native"
import Carousel from "react-native-looped-carousel"
import { Button } from "react-native-elements"

const styles = {
  view:{
    //height: 1000,
    //backgroundColor: "#deb887"
    flex: 1,
    alignItems: 'stretch'    
  },
  image:{
    flex: 1,
    //backgroundColor: "#DCDCDC",
    //position: "absolute",
    //width: 100,
    //height: 320
  }
}
const render = (photoURL) => {
  return(
    <Image key={photoURL} resizeMode="contain" style={{flex: 1}} source={{uri: photoURL}}>
      <View style={{ flex: 1, marginLeft: 10, marginBottom: 20, flexDirection: "row", alignItems: "flex-end", justifyContent: "center"}}>
        <Button icon={{ name: "heart", type: "evilicon", color: "#ff0000", size: 70 }} backgroundColor="transparent" />
        <Button icon={{ name: "close-o", type: "evilicon", color: "#ff0000", size: 70 }} backgroundColor="transparent" />
      </View>
    </Image>
  )
}
//const { image, view } = styles

const Picture = ({ PHOTO_URLS }) => {

  return(
    <View style={{flex: 1}}>
      <Carousel delay={2000} style={{ flex: 1, backgroundColor: "#ff1493" }} pageInfo autoplay={false} onAnimateNextPage={(p) => console.log(p)} >
        {PHOTO_URLS.map(render)}
      </Carousel> 
    </View>
  )
}

export { Picture }

    //<View style={[{ backgroundColor: '#BADA55' }, { width, height: 320 }]}><Text>1</Text></View>
