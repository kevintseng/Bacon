import React, {Component} from 'react'
import { Dimensions, Image, Modal, View, Text, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-looped-carousel'
import SwipeCards from 'react-native-swipe-cards'
import ImageZoom from 'react-native-image-pan-zoom'
import Infos from './Infos/Infos'

const { width, height } = Dimensions.get('window')

export default class Court extends Component {

  constructor(props) {
    super(props)
    this.nope = this.props.nope
    this.yup = this.props.yup
  }

  renderCard = card => (
    <Image
      key={card.id}
      source={{uri: card.uri}}
      style={{width, height: width, borderRadius: 10}}
    /> 
  )

  onPressRightIcon = () => {
    this.refs['swiper']._goToNextCard() 
    this.nope && this.nope()
  }

  onPressLeftIcon = () => {
    this.refs['swiper']._goToNextCard() 
    this.yup && this.yup()
  }

  nextphoto = () => {
    this.carousel._animateNextPage()
  }

  renderAlbum = (photos) => (
    photos.map( photo => (
      <ImageZoom 
        key={ele.key}
        cropWidth={width}
        cropHeight={height}
        imageWidth={width}
        imageHeight={height}
      >
        <Image style={{height, width}} resizeMode={'contain'} source={{uri: ele.uri}}/>
      </ImageZoom>
    ))
  )

  renderOnePhoto = () => (
    <ImageZoom
      cropWidth={width}
      cropHeight={height}
      imageWidth={width}
      imageHeight={height}
    >
      <Image style={{height, width}} resizeMode={'contain'} source={{uri: 'https://i.imgur.com/FHxVpN4.jpg'}}/>
    </ImageZoom>
  )

  render() {

    const { cards, rightIcon, leftIcon, album, photos, closeAlbum, openAlbum } = this.props

    return (
      <View style={{flex: 1}}>

        <Modal animationType={"fade"} onRequestClose={()=>{}} visible={ album || false } transparent={false}>
          <Carousel
            ref={(carousel) => { this.carousel = carousel }}
            swipe={false}
            style={{flex:1,backgroundColor: 'black'}}
            bullets
            autoplay={false}
            pageInfoTextStyle={{color: 'red'}}
            onAnimateNextPage={(p) => console.log(p)}
            >
            { photos ? this.renderAlbum(photos) : this.renderOnePhoto() }
          </Carousel>
          <View style={{width, position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20}}>
            <View ><Text onPress={ closeAlbum } style={{color:'white',fontFamily: 'NotoSans'}}>返回</Text></View>
            <View ><Text onPress={ this.nextphoto } style={{color:'white',fontFamily: 'NotoSans'}}>下一張</Text></View>
          </View>
        </Modal>

        <View style={{width, height: width}}>
          <SwipeCards
            ref = {'swiper'}
            cards={ cards }
            renderCard={ this.renderCard }
            dragY={false}
            onClickHandler={ openAlbum }
            cardKey='id'
            stack
            stackOffsetX={0}
            stackOffsetY={0}
            smoothTransition
            showMaybe={false}
          />
        </View>

        <TouchableOpacity style={{position: 'absolute',top: 320, right: 60}} onPress={ this.onPressRightIcon }>
          <Image source={ rightIcon }/>
        </TouchableOpacity>

        <TouchableOpacity style={{position: 'absolute',top: 320, left: 60}} onPress={ this.onPressLeftIcon }>
          <Image source={ leftIcon } />
        </TouchableOpacity>

    </View>
  )}
}