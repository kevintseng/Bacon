import React from "react"
import { View, Image } from "react-native"
import Carousel from "react-native-looped-carousel"
import { Button } from "react-native-elements"
import { observer, inject } from "mobx-react/native"

/*
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
const render = ({ photoURL }) => {
  return(
    <Image key={photoURL} resizeMode="contain" style={{flex: 1}} source={{uri: photoURL}}>
      <View style={{ flex: 1, marginLeft: 10, marginBottom: 20, flexDirection: "row", alignItems: "flex-end", justifyContent: "center"}}>
        <Button icon={{ name: "heart", type: "evilicon", color: "#ff0000", size: 70 }} backgroundColor="transparent" onPress={this} />
        <Button icon={{ name: "close-o", type: "evilicon", color: "#ff0000", size: 70 }} backgroundColor="transparent" onPress={this} />
      </View>
    </Image>
  )
}
//const { image, view } = styles
*/
const Collapse = inject("prey")(observer(({ prey }) => {

  //const renderFunc = render.bind(getNext)

  //const test = [{src:{uri:'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/14523254_10205912479689697_9039309889239665813_n.jpg?oh=d5c8c264afd125e35eafd4627cac6cca&oe=597CD498'}},{src:{uri:'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/14523254_10205912479689697_9039309889239665813_n.jpg?oh=d5c8c264afd125e35eafd4627cac6cca&oe=597CD498'}}]
  const photoURL = 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/14523254_10205912479689697_9039309889239665813_n.jpg?oh=d5c8c264afd125e35eafd4627cac6cca&oe=597CD498'


  const unit = (
           <Image key={photoURL} resizeMode="contain" style={{flex: 1}} source={{uri: photoURL}}>
          <View style={{ flex: 1, marginLeft: 10, marginBottom: 10, flexDirection: "row", alignItems: "flex-end", justifyContent: "center"}}>
            <Button icon={{ name: "check", type: "evilicon", color: "#ffffff", size: 90}} backgroundColor="transparent" onPress={prey.handleLike} />
            <Button icon={{ name: "close-o", type: "evilicon", color: "#ffffff", size: 90 }} backgroundColor="transparent" onPress={prey.getNext} />
          </View>
        </Image>
  )

  const renderCollapse = prey.photos.map((photo) => ( 
       <Image key={photo.src.uri} resizeMode="contain" style={{flex: 1}} source={{uri: photo.src.uri}}>
          <View style={{ flex: 1, marginLeft: 10, marginBottom: 10, flexDirection: "row", alignItems: "flex-end", justifyContent: "center"}}>
            <Button icon={{ name: "check", type: "evilicon", color: "#ffffff", size: 90}} backgroundColor="transparent" onPress={prey.handleLike} />
            <Button icon={{ name: "close-o", type: "evilicon", color: "#ffffff", size: 90 }} backgroundColor="transparent" onPress={prey.getNext} />
          </View>
        </Image> ))

  return(
    <View style={{flex: 1}}>
      <Carousel delay={2000} style={{ flex: 1, backgroundColor: "#ff1493" }} pageInfo autoplay={false}> 
        { renderCollapse.length > 0 ? renderCollapse : unit }
      </Carousel> 
    </View>
  )
}))

export { Collapse }
