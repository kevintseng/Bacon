import React from "react"
import { View, Image, Dimensions, Text } from "react-native"
import { Button } from "react-native-elements"
import { observer, inject } from "mobx-react/native"
import ImageCarousel from 'react-native-image-carousel'


const { width, height } = Dimensions.get('window')

const Collapse = inject("ObjectStore")(observer(({ ObjectStore, leftIcon, rightIcon, showbutton, rightIconColor }) => {

  //const photoURL = 'https://firebasestorage.googleapis.com/v0/b/kjyl-150415.appspot.com/o/collapse.jpg?alt=media&token=020621ab-6347-46ef-9b65-97beb6ce80f4'

  const renderButton = (
    <View style={{ width, position: 'absolute', top: (height/2) - 53, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
      <Button icon={{ name: leftIcon, type: "evilicon", color: "#ffffff", size: 90}} backgroundColor="transparent" onPress={ObjectStore.handleLike.bind(ObjectStore)} />
      <Button icon={{ name: rightIcon, type: "evilicon", color: rightIconColor, size: 90 }} backgroundColor="transparent" onPress={ObjectStore.getNext.bind(ObjectStore)} />
    </View>
  )

  const renderPhotoCount = (
    <View style={{ position: 'absolute', bottom: (height/2) - 10 , flexDirection: "row", alignItems: "flex-end" }}>
      <View style={{ flex: 1 }}></View>
      <View style={{ marginRight: 10, borderWidth: 3, borderColor: "#f0f0f0", padding: 7, borderRadius: 7 }} ><Text style={{color: "#f0f0f0"}}>{ObjectStore.photos.length + 1}</Text></View>
    </View>
  )

  const unit = (
    <Image key={ObjectStore.photoURL} resizeMode={"contain"} style={{flex: 1,width, height: width}} source={{uri: ObjectStore.photoURL}}/>
  )

  const Collapse = ObjectStore.photos.map((photo) => ( 
    <Image key={photo.src.uri} resizeMode={"contain"} style={{flex: 1,width, height: width}} source={{uri: photo.src.uri}}/>
  ))

  const renderCollapse = [unit].concat(Collapse)

  return(
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: "#000000"}}>
      <ImageCarousel style={{ flex: 1}}> 
        { renderCollapse }
      </ImageCarousel> 
      { renderPhotoCount }
      { showbutton && renderButton }
    </View>
  )
}))

export { Collapse }
