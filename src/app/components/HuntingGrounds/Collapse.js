import React from "react"
import { View, Image, Text } from "react-native"
import Carousel from "react-native-looped-carousel"
import { Button } from "react-native-elements"
import { observer, inject } from "mobx-react/native"

const Collapse = inject("ObjectStore")(observer(({ ObjectStore, leftIcon, rightIcon, showbutton }) => {

  //const photoURL = 'https://firebasestorage.googleapis.com/v0/b/kjyl-150415.appspot.com/o/collapse.jpg?alt=media&token=020621ab-6347-46ef-9b65-97beb6ce80f4'

  const renderButton = (
    <View style={{ flex: 1, marginLeft: 20, flexDirection: "row", alignItems: "flex-end", justifyContent: "center"}}>
      <Button icon={{ name: leftIcon, type: "evilicon", color: "#ffffff", size: 90}} backgroundColor="transparent" onPress={ObjectStore.handleLike.bind(ObjectStore)} />
      <Button icon={{ name: rightIcon, type: "evilicon", color: "#ffffff", size: 90 }} backgroundColor="transparent" onPress={ObjectStore.getNext.bind(ObjectStore)} />
    </View>
  )

  const unit = (
        <Image key={ObjectStore.photoURL} resizeMode="contain" style={{flex: 1}} source={{uri: ObjectStore.photoURL}}>
          <View style={{ flexDirection: "row", alignItems: "flex-end", marginRight: 10, marginTop: 10 }}>
            <View style={{ flex: 1 }}></View>
            <View style={{ borderWidth: 3, borderColor: "#f0f0f0", padding: 7, borderRadius: 7 }} ><Text style={{color: "#f0f0f0"}}>{ObjectStore.photos.length + 1}</Text></View>
          </View>
          { showbutton && renderButton }
        </Image>
  )

  const Collapse = ObjectStore.photos.map((photo) => ( 
        <Image key={photo.src.uri} resizeMode="contain" style={{flex: 1, alignItems: "center"}} source={{uri: photo.src.uri}}>
          <View style={{ flexDirection: "row", alignItems: "flex-end", marginRight: 10, marginTop: 10 }}>
            <View style={{ flex: 1 }}></View>
            <View style={{ borderWidth: 3, borderColor: "#f0f0f0", padding: 7, borderRadius: 7 }} ><Text style={{color: "#f0f0f0"}}>{ObjectStore.photos.length + 1}</Text></View>
          </View>
          { showbutton && renderButton }
        </Image> ))

  const renderCollapse = [unit].concat(Collapse)

  return(
    <View style={{flex: 1}}>
      <Carousel delay={2000} style={{ flex: 1 }} pageInfo autoplay={false}> 
        { renderCollapse }
      </Carousel> 
    </View>
  )
}))

export { Collapse }
