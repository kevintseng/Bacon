import React from "react"
import { View, Image } from "react-native"
import Carousel from "react-native-looped-carousel"
import { Button } from "react-native-elements"
import { observer, inject } from "mobx-react/native"

const Collapse = inject("ObjectStore")(observer(({ ObjectStore }) => {

  const photoURL = 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/14523254_10205912479689697_9039309889239665813_n.jpg?oh=d5c8c264afd125e35eafd4627cac6cca&oe=597CD498'


  const unit = (
           <Image key={photoURL} resizeMode="contain" style={{flex: 1}} source={{uri: photoURL}}>
          <View style={{ flex: 1, marginLeft: 10, marginBottom: 10, flexDirection: "row", alignItems: "flex-end", justifyContent: "center"}}>
            <Button icon={{ name: "check", type: "evilicon", color: "#ffffff", size: 90}} backgroundColor="transparent" onPress={ObjectStore.handleLike.bind(ObjectStore)} />
            <Button icon={{ name: "close-o", type: "evilicon", color: "#ffffff", size: 90 }} backgroundColor="transparent" onPress={ObjectStore.getNext.bind(ObjectStore)} />
          </View>
        </Image>
  )

  const renderCollapse = ObjectStore.photos.map((photo) => ( 
       <Image key={photo.src.uri} resizeMode="contain" style={{flex: 1}} source={{uri: photo.src.uri}}>
          <View style={{ flex: 1, marginLeft: 10, marginBottom: 10, flexDirection: "row", alignItems: "flex-end", justifyContent: "center"}}>
            <Button icon={{ name: "check", type: "evilicon", color: "#ffffff", size: 90}} backgroundColor="transparent" onPress={ObjectStore.handleLike.bind(ObjectStore)} />
            <Button icon={{ name: "close-o", type: "evilicon", color: "#ffffff", size: 90 }} backgroundColor="transparent" onPress={ObjectStore.getNext.bind(ObjectStore)} />
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
