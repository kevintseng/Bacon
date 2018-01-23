import React from 'react'
import { Image, FlatList, Dimensions, TouchableOpacity, Button, View, Modal, Text } from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom'
import LinearGradient from 'react-native-linear-gradient'
import SquareImage from 'react-native-bacon-square-image'

const { width, height } = Dimensions.get('window')

const picWidth = width/3

const colors = ['#f4a764', '#d63768']

const styles = {
  view: {
    flex: 1
  },
  text: {
    color: '#606060',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    backgroundColor: 'transparent'
  },
  pic : {
    width: picWidth, 
    height: picWidth
  },
  avator: {
    position: 'absolute', 
    left: 5, 
    top: 5
  },
  linearView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10, 
    paddingBottom: 10
  },
  imageZoom: {
    flex:1, 
    backgroundColor: 'black'
  },
  touchView: {
    width,
    position: 'absolute', 
    bottom: 0, 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  touch: {
    padding: 20
  },
  loadingStyle: { 
    size: 'large', 
    color: '#b3b3b3' 
  }
}

const Album = ({source, photos, photoOnPress, footerOnPress, visible, onPressLeftButton, onPressMiddleButton, onPressRightButton}) => {
  return(
    <View style={styles.view}>
      <Modal animationType={"fade"} onRequestClose={ onPressLeftButton } visible={ visible } transparent={false}>
        <View style={styles.imageZoom}>
          <ImageZoom
            cropWidth={width}
            cropHeight={height}
            imageWidth={width}
            imageHeight={height}
          >
            <Image style={{height, width}} resizeMode={'contain'} source={{uri: source}}/>
          </ImageZoom>
          <View style={styles.touchView}>
            <TouchableOpacity style={styles.touch} onPress={ onPressLeftButton }>
              <Image source={require('./img/btn_album_back.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch} onPress={ onPressMiddleButton }>
              <Image source={require('./img/ico_aboutme_profilepic.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch} onPress={ onPressRightButton }>
              <Image source={require('./img/ico_album_delete.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        removeClippedSubviews
        data={ photos } 
        numColumns={3}
        renderItem={({item}) => {
          if (item.avatar) {
            return(
            <TouchableOpacity onPress={ () => { photoOnPress(item.key) } } onLongPress={ photoOnLongPress } >
              <SquareImage 
                style={styles.pic} 
                customImagePlaceholderDefaultStyle={styles.pic} 
                loadingStyle={ styles.loadingStyle } 
                source={{uri: item.uri}} 
                placeholderSource={require('../../../images/ico_qy_head_preload.png')}
                onPress={() => { photoOnPress(item.key)}}
              />
              <Image 
                style={styles.avator} 
                source={require('./img/ico_aboutme_profilepic.png')}
              />
            </TouchableOpacity>)
          } else {
            return(
            <TouchableOpacity onPress={ () => { photoOnPress(item.key) } } onLongPress={ photoOnLongPress } >
              <SquareImage 
                style={styles.pic} 
                customImagePlaceholderDefaultStyle={styles.pic} 
                loadingStyle={ styles.loadingStyle } 
                source={{uri: item.uri}} 
                placeholderSource={require('../../../images/ico_qy_head_preload.png')}
                onPress={() => { photoOnPress(item.key)}}
              />
            </TouchableOpacity>)
          }
        }} 
      />
      <TouchableOpacity onPress={ footerOnPress } >
        <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.5, y: 0.0}} colors={colors}>
          <View style={styles.linearView}>
            <Text style={ styles.text }>新增相片</Text>
          </View>
        </LinearGradient> 
       </TouchableOpacity>
    </View>
  )
}

export default Album