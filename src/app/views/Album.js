import React from 'react'
import { Image, FlatList, Dimensions, TouchableOpacity, Button, View, Modal, Text } from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom'
import LinearGradient from 'react-native-linear-gradient'

const { width, height } = Dimensions.get('window')

const picWidth = width/3

const colors = ['#f4a764', '#d63768']

const styles = {
  text: {
    color: '#606060',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    //fontWeight: '500',
  }
}

const Album = ({source, photos, photoOnPress, photoOnLongPress, footerOnPress, photoOnPressModal, onRequestPhotoOnPressModal}) => {
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
            <Image style={{height, width}} resizeMode={'contain'} source={{uri: source}}/>
          </ImageZoom>
          <View style={{width, position: 'absolute', padding: 20}}>
              <View ><Text onPress={ onRequestPhotoOnPressModal } style={{color:'white'}}>返回</Text></View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={ photos } 
        numColumns={3}
        renderItem={({item}) => (
        <TouchableOpacity onPress={ () => { photoOnPress(item.uri) } } onLongPress={ photoOnLongPress } >
          <Image style={{width: picWidth, height: picWidth}} source={{uri: item.uri}} />
        </TouchableOpacity>
        )} 
      />
      <TouchableOpacity onPress={ footerOnPress } >
        <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.5, y: 0.0}} colors={colors}>
          <View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center',paddingTop: 10, paddingBottom: 10}}>
            <Text style={ styles.text }>新增相片</Text>
          </View>
        </LinearGradient> 
       </TouchableOpacity>
    </View>
  )
}

export default Album