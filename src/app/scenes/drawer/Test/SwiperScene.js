import React, { Component } from 'react'
import { Modal, View, Text, ActivityIndicator, ScrollView, Dimensions, BackHandler, ToastAndroid, Button, Image, TouchableWithoutFeedback } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Swiper from 'react-native-deck-swiper'
import Carousel from 'react-native-looped-carousel'
import ImageZoom from 'react-native-image-pan-zoom'
import { Icon } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

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
  }
}
//@inject('firebase','SubjectStore','FateStore','ControlStore') @observer
export default class SwiperScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      albumZoom: false
    }
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentDidMount() {
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  renderAlbum = album => (
    album.map((photo,index) => (
      <TouchableWithoutFeedback key={photo} onPress={() => { this.openAlbum(index) }}>
        <Image style={{height: width, width}} source={{uri: photo}} />
      </TouchableWithoutFeedback>
    ))
  )

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

  nextphoto = () => {
    this.carousel._animateNextPage()
  }

  openAlbum = index => {
    this.currentPage = index
    this.setState({
      albumZoom: true
    })
  }

  closeAlbum = () => {
    this.setState({
      albumZoom: false
    })
  }

  render() {
    return(
      <View style={{flex: 1}}>

        <Modal hardwareAccelerated animationType={'none'} onRequestClose={this.closeAlbum} visible={ this.state.albumZoom } transparent={false}>
          <Carousel
            ref={(carousel) => { this.carousel = carousel }}
            swipe
            currentPage={this.currentPage}
            style={{flex:1,backgroundColor: 'transparent'}}
            bullets
            autoplay={false}
            pageInfoTextStyle={{color: 'red'}}
            onAnimateNextPage={(p) => console.log(p)}
            bulletsStyle={{position: 'absolute',bottom: 10}}
            >
            { this.renderAlbumZoom(['http://i.imgur.com/EZzLnn9.jpg','http://s2.buzzhand.net/uploads/18/1/1012342/15011382632136.jpg']) }
          </Carousel>
          <View style={styles.toolView}>
            <View><Icon name='heart' color='#d63768' size={50} type='evilicon' underlayColor='transparent' onPress={ this.closeAlbum } /></View>
            <View><Icon name='arrow-right' color='#d63768' size={50} type='evilicon' underlayColor='transparent' onPress={ this.nextphoto }/></View>
          </View>
        </Modal>

        <Swiper
          ref={swiper => { this.swiper = swiper}}
          cards={[['http://i.imgur.com/EZzLnn9.jpg','http://s2.buzzhand.net/uploads/18/1/1012342/15011382632136.jpg']]}
          renderCard={(card) => {
            return (
              <View style={{flex: 1}}>
                <Carousel
                  swipe
                  style={{backgroundColor: 'transparent',width, height: width}}
                  bullets
                  autoplay={false}
                  pageInfoTextStyle={{color: 'red'}}
                  onAnimateNextPage={(p) => console.log(p)}
                  bulletsContainerPosition={{ top: 5, left: width/5*4 }}
                  bulletsStyle={{position: 'absolute',top: 10}}
                >
                  { this.renderAlbum(card) }
                </Carousel>
              </View>
              )
            }}
          cardIndex={0}
          horizontalSwipe={false}
          verticalSwipe={false}
        >
          <Button
            onPress={() => { this.swiper.swipeLeft() }}
            title="Press me Hate">
          </Button>
          <Button
            onPress={() => { this.swiper.swipeRight() }}
            title="Press me Like">
          </Button>
        </Swiper>
      </View>
    )
  }
}