import React, {Component} from 'react'
import { Dimensions, Image, Modal, View, Text, TouchableWithoutFeedback, TouchableOpacity, Platform } from 'react-native'
import Carousel from 'react-native-looped-carousel'
import ImageZoom from 'react-native-image-pan-zoom'
import FastImage from 'react-native-fast-image'
import MKPLoadImageView from 'mkp-react-native-image-view'
import { Icon } from 'react-native-elements'
// import Infos from './Infos/Infos'

const { width, height } = Dimensions.get('window')

const DEFAULT_IMAGE = require('../../images/Loading_icon.gif')

const styles = {
  view: {
    flex: 1
  },
  toolView: {
    width, 
    position: 'absolute', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20
  },
  chooseView: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    position: 'absolute',
    top: Platform.OS === 'ios' ? 370 : 320
    //top: height == 480 ? 260 : 320, right: 60
  },
  choose: {
    flex: 1,
    alignItems: 'center'
  }
}

export default class Court extends Component {

  constructor(props) {
    super(props)
    this.currentPage = 0
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
        <Image style={{height, width}} resizeMode='contain' source={{uri: photo}} />
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
      <Image style={{height, width}}  resizeMode='contain' source={require('../../images/ico_qy_head_preload.png')}/>
    </ImageZoom>
  )

  renderAlbum = (album) => (
    album.map( (photo,index) => (
      <TouchableWithoutFeedback key={photo} onPress={ () => { this.openAlbum(index) } }>
        <Image onLoad={ this.props.onLoadEnd } style={{height: width, width}} source={{uri: photo}} />
      </TouchableWithoutFeedback>
    ))
  )


  renderOnePhoto = () => (
    <TouchableWithoutFeedback onPress={this.props.openAlbum}>
      <Image style={{height: width, width}}  source={require('../../images/ico_qy_head_preload.png')} />
    </TouchableWithoutFeedback>
  )

  openAlbum = index => {
    this.currentPage = index
    this.props.openAlbum()
  }

  render() {

    const { album, rightIcon, leftIcon, visible, closeAlbum, openAlbum, onPressRightIcon, onPressLeftIcon, onRequestClose } = this.props

    return (
      <View style={styles.view}>

        <Modal hardwareAccelerated animationType={'none'} onRequestClose={onRequestClose} visible={ visible || false } transparent={false}>
          <Carousel
            ref={(carousel) => { this.carousel = carousel }}
            swipe
            //delay={0}
            currentPage={this.currentPage}
            style={{flex:1,backgroundColor: 'transparent'}}
            bullets
            autoplay={false}
            pageInfoTextStyle={{color: 'red'}}
            onAnimateNextPage={(p) => console.log(p)}
            bulletsStyle={{position: 'absolute',bottom: 10}}
            >
            { album.length > 0 ? this.renderAlbumZoom(album) : this.renderOnePhotoZoom() }
          </Carousel>
          <View style={styles.toolView}>
            <View><Icon name='heart' color='#d63768' size={50} type='evilicon' underlayColor='transparent' onPress={ closeAlbum } /></View>
            <View><Icon name='arrow-right' color='#d63768' size={50} type='evilicon' underlayColor='transparent' onPress={ this.nextphoto }/></View>
          </View>
        </Modal>

        <Carousel
          swipe
          //delay={0}
          style={{backgroundColor: 'transparent',width, height: width}}
          bullets
          autoplay={false}
          pageInfoTextStyle={{color: 'red'}}
          onAnimateNextPage={(p) => console.log(p)}
          bulletsContainerPosition={{ top: 5, left: width/5*4 }}
          bulletsStyle={{position: 'absolute',top: 10}}
        >
          { album.length > 0 ? this.renderAlbum(album) : this.renderOnePhoto() }
        </Carousel>

        <View style={styles.chooseView}>
          <TouchableOpacity style={styles.choose} onPress={ onPressLeftIcon }>
            <Image source={ leftIcon } />
          </TouchableOpacity>
          <TouchableOpacity style={styles.choose} onPress={ onPressRightIcon }>
            <Image source={ rightIcon }/>
          </TouchableOpacity>
        </View>

    </View>
  )}
}
