import React, {Component} from 'react'
import { Dimensions, Image, Modal, View, Text, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-looped-carousel'
//import SwipeCards from 'react-native-swipe-cards'
import ImageZoom from 'react-native-image-pan-zoom'
import Infos from './Infos/Infos'

const { width, height } = Dimensions.get('window')


export default class Court extends Component {

  constructor(props) {
    super(props)
  }

  nextphoto = () => {
    this.carousel._animateNextPage()
  }

  renderAlbumZoom = (album) => (
    album.map( photo => (
      <ImageZoom 
        key={photo}
        cropWidth={width}
        cropHeight={height}
        imageWidth={width}
        imageHeight={height}
      >
        <Image style={{height, width}} resizeMode={'contain'} source={{uri: photo}}/>
      </ImageZoom>
    ))
  )

  renderOnePhotoZoom = () => (
    <ImageZoom
      cropWidth={width}
      cropHeight={height}
      imageWidth={width}
      imageHeight={height}
    >
      <Image style={{height, width}} resizeMode={'contain'} source={{uri: 'https://cdn.shopify.com/s/files/1/1285/0147/products/sign2-032a.png?v=1477683540'}}/>
    </ImageZoom>
  )

  renderAlbum = (album) => (
    album.map( photo => (
      <TouchableOpacity activeOpacity={1} key={photo} onPress={this.props.openAlbum}>
        <Image style={{height: width, width}} resizeMode={'contain'} source={{uri: photo}}/>
      </TouchableOpacity>
    ))
  )


  renderOnePhoto = () => (
    <Image style={{height: width, width}} resizeMode={'contain'} source={{uri: 'https://cdn.shopify.com/s/files/1/1285/0147/products/sign2-032a.png?v=1477683540'}}/>
  )

  render() {

    const { album, rightIcon, leftIcon, visible, closeAlbum, openAlbum, onPressRightIcon, onPressLeftIcon } = this.props

    return (
      <View style={{flex: 1}}>

        <Modal animationType={"fade"} onRequestClose={()=>{}} visible={ visible || false } transparent={false}>
          <Carousel
            ref={(carousel) => { this.carousel = carousel }}
            swipe
            style={{flex:1,backgroundColor: 'transparent'}}
            bullets
            autoplay={false}
            pageInfoTextStyle={{color: 'red'}}
            onAnimateNextPage={(p) => console.log(p)}
            >
            { album.length > 0 ? this.renderAlbumZoom(album) : this.renderOnePhotoZoom() }
          </Carousel>
          <View style={{width, position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20}}>
            <View ><Text onPress={ closeAlbum } style={{color:'white',fontFamily: 'NotoSans'}}>返回</Text></View>
            <View ><Text onPress={ this.nextphoto } style={{color:'white',fontFamily: 'NotoSans'}}>下一張</Text></View>
          </View>
        </Modal>

                

          <Carousel
            swipe
            style={{backgroundColor: 'transparent',width, height: width}}
            bullets
            autoplay={false}
            pageInfoTextStyle={{color: 'red'}}
            onAnimateNextPage={(p) => console.log(p)}
            >
            { album.length > 0 ? this.renderAlbum(album) : this.renderOnePhoto() }
          </Carousel>

        <TouchableOpacity style={{position: 'absolute',top: 320, right: 60}} onPress={ onPressRightIcon }>
          <Image source={ rightIcon }/>
        </TouchableOpacity>

        <TouchableOpacity style={{position: 'absolute',top: 320, left: 60}} onPress={ onPressLeftIcon }>
          <Image source={ leftIcon } />
        </TouchableOpacity>

    </View>
  )}
}