import React from 'react'
import { Image, FlatList, Dimensions, TouchableOpacity, Button, View, Modal, Text } from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom'

const { width, height } = Dimensions.get('window')

const picWidth = width/3

const Album = ({photos, photoOnPress, photoOnLongPress, footerOnPress, photoOnPressModal, onRequestPhotoOnPressModal}) => {
  return(
    <View style={{flex: 1}}>
      <Modal animationType={"fade"} onRequestClose={ onRequestPhotoOnPressModal } visible={ photoOnPressModal } transparent={false}>
        <View style={{flex:1, backgroundColor: 'black'}}>
          <ImageZoom
            cropWidth={width}
            cropHeight={height}
            imageWidth={width}
            imageHeight={height}
          >
            <Image style={{height, width}} resizeMode={'contain'} source={{uri: 'https://pic.pimg.tw/wuntinglin/4b84e20809d8f.jpg'}}/>
          </ImageZoom>
          <View style={{width, position: 'absolute'}}>
              <View ><Text onPress={ onRequestPhotoOnPressModal } style={{color:'white'}}>Return</Text></View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={ photos } 
        numColumns={3}
        renderItem={({item}) => (
        <TouchableOpacity onPress={ photoOnPress } onLongPress={ photoOnLongPress } >
          <Image style={{width: picWidth, height: picWidth}} source={{uri: item.uri}} />
        </TouchableOpacity>
        )} 
      />
      <Button color="#d63768" title='新增照片' onPress={ footerOnPress } />
    </View>
  )
}

export default Album