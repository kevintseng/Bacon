import React, {Component} from 'react'
import { Dimensions, Image, Modal, View, Text, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-looped-carousel'
import ImageZoom from 'react-native-image-pan-zoom'
import FastImage from 'react-native-fast-image'
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
        <FastImage style={{height, width}}  resizeMode='contain' source={{uri: photo}}/>
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
      <FastImage style={{height, width}}  resizeMode='contain' source={{uri: 'http://4.bp.blogspot.com/-47BymmC5PqE/U2quRGlwXwI/AAAAAAAAANk/M7D1aUFk-Jo/s1600/Question+Mark.jpg'}}/>
    </ImageZoom>
  )

  renderAlbum = (album) => (
    album.map( photo => (
      <TouchableOpacity activeOpacity={1} key={photo} onPress={this.props.openAlbum}>
        <FastImage style={{height: width, width}}  source={{uri: photo}}/>
      </TouchableOpacity>
    ))
  )


  renderOnePhoto = () => (
    <FastImage style={{height: width, width}}  source={{uri: 'http://4.bp.blogspot.com/-47BymmC5PqE/U2quRGlwXwI/AAAAAAAAANk/M7D1aUFk-Jo/s1600/Question+Mark.jpg'}}/>
  )

  render() {

    const { album, rightIcon, leftIcon, visible, closeAlbum, openAlbum, onPressRightIcon, onPressLeftIcon } = this.props

    return (
      <View style={{flex: 1}}>

        <Modal animationType={"fade"} onRequestClose={()=>{}} visible={ visible || false } transparent={false}>
          <Carousel
            ref={(carousel) => { this.carousel = carousel }}
            swipe
            style={{flex:1,backgroundColor: 'black'}}
            bullets
            autoplay={false}
            pageInfoTextStyle={{color: 'red'}}
            onAnimateNextPage={(p) => console.log(p)}
            bulletsStyle={{position: 'absolute',bottom: 10}}
            >
            { album.length > 0 ? this.renderAlbumZoom(album) : this.renderOnePhotoZoom() }
          </Carousel>
          <View style={{width, position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20}}>
            <View ><Text onPress={ closeAlbum } style={{color:'white',fontFamily: 'NotoSans',backgroundColor: 'transparent'}}>返回</Text></View>
            <View ><Text onPress={ this.nextphoto } style={{color:'white',fontFamily: 'NotoSans',backgroundColor: 'transparent'}}>下一張</Text></View>
          </View>
        </Modal>
 
        <Carousel
          swipe
          style={{backgroundColor: 'black',width, height: width}}
          bullets
          autoplay={false}
          pageInfoTextStyle={{color: 'red'}}
          onAnimateNextPage={(p) => console.log(p)}
          bulletsContainerPosition={{ top: 5, left: width/5*4 }}
          bulletsStyle={{position: 'absolute',top: 10}}
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