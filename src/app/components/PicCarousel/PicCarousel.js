import React from 'react'
import { Dimensions, Image, TouchableOpacity, View, Text, Modal } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ImageViewer from 'react-native-image-zoom-viewer'

 //const { width,height } = Dimensions.get('window')

const images = [{
    url: 'http://f9view.com/wp-content/uploads/2013/10/American-Beautiful-Girls-Wallpapers-Hollywood-Celebs-1920x1200px.jpg'
}, {
    url: 'https://i.imgur.com/FHxVpN4.jpg'
}, {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}]

const textOnPress = () => {
  //alert('onClick')
  Actions.pop()
}

const onDoubleClick = () => {
  alert('onDoubleClick')
}


const renderHeader = () => (<View style={{backgroundColor: 'black'}}><Text onPress={textOnPress} style={{color: 'white'}}>cancel</Text></View>)

//const onRequestClose = () => {
//  alert('onRequestClose')
//}

const PicCarousel = () => {

  return(
    <ImageViewer 
    renderHeader={renderHeader}
    imageUrls={images}/>

  )
}

export default PicCarousel

/*
    <View style={{flex: 1}}>
    <ImageCarousel
      renderContent={_renderContent}
    >
      <Image style={{width, height}} resizeMode={'contain'} source={{uri: 'http://f9view.com/wp-content/uploads/2013/10/American-Beautiful-Girls-Wallpapers-Hollywood-Celebs-1920x1200px.jpg'}}/>
      <Image style={{width, height}} resizeMode={'contain'} source={{uri: 'https://i.imgur.com/FHxVpN4.jpg'}}/>

    </ImageCarousel>
    </View>
*/