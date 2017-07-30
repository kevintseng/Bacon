import React, {Component} from 'react'
import { Dimensions, Image, Modal, View, Text, Button, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-looped-carousel'
import SwipeCards from 'react-native-swipe-cards'
import ImageZoom from 'react-native-image-pan-zoom'

const { width, height } = Dimensions.get('window')


const data = [
  { id: 2, text: 'Amanda', age: 28, uri: 'https://pic.pimg.tw/wuntinglin/4b84e20809d8f.jpg' },
  { id: 3, text: 'Emma', age: 29, uri: 'https://i.imgur.com/FHxVpN4.jpg' },

];
//visible,open,close
export default class Court extends Component {

constructor(props) {
  super(props);

  this.state = {
    scale: 1.0
  };
}

yup = () => {
    //console.log(this.refs['swiper'])
this.refs['swiper']._goToNextCard()  }

nope = () => {
    //console.log(this.refs['swiper'])
this.refs['swiper']._goToNextCard() }

renderCard = (card) => {
  return (
 
      <Image
      key={card.id}
        source={{uri: card.uri}}
         style={{width, height: width}}

       />
  

     
  )
}
  render(){
  return(
    <View style={{flex:1}}>
          <Modal animationType={"fade"} onRequestClose={()=>{}} visible={this.props.visible} transparent={false}>
            <Carousel
            ref={(carousel) => { this.carousel = carousel }}
            swipe={false}
            style={{flex:1,backgroundColor: 'black'}}
            //arrows
          //delay={2000}
          bullets
          //bulletsContainerStyle={{justifyContent:'flex-end', backgroundColor:'white'}}
          //bulletStyle={{backgroundColor: 'red'}}
          autoplay={false}
          //pageInfo
          //bulletsContainerStyle={{position: 'absolute'}}
          pageInfoTextStyle={{color: 'red'}}
          onAnimateNextPage={(p) => console.log(p)}
            >
            <ImageZoom key={1}
            cropWidth={width}
            cropHeight={height}
                            imageWidth={width}
                       imageHeight={height}
            >
              <Image style={{height, width}} resizeMode={'contain'} source={{uri: 'https://pic.pimg.tw/wuntinglin/4b84e20809d8f.jpg'}}/>
            </ImageZoom>
                      <ImageZoom key={2}
            cropWidth={width}
            cropHeight={height}
            imageWidth={width}
            imageHeight={height}
            >
                  <Image style={{height, width}} resizeMode={'contain'} source={{uri: 'https://i.imgur.com/FHxVpN4.jpg'}}/>
            </ImageZoom>
      </Carousel>
      <View style={{width, position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20}}>
          <View ><Text onPress={this.props.close} style={{color:'white',fontFamily: 'NotoSans'}}>返回</Text></View>
          <View ><Text onPress={() => {this.carousel._animateNextPage()}} style={{color:'white',fontFamily: 'NotoSans'}}>下一張</Text></View>
      </View>


      </Modal>
      <SwipeCards
        ref = {'swiper'}
        cards={data}
        renderCard={this.renderCard}
        dragY={false}
        onClickHandler={this.props.open}
        cardKey='id'
        stack
        stackOffsetX={0}
        stackOffsetY={0}
        smoothTransition
        showMaybe={false}

      />
      <TouchableOpacity style={{position: 'absolute',top: 320, left: 60}} onPress={() => this.nope()}>
        <Image source={require('./img/btn_meet_dislike.png')}/>
      </TouchableOpacity>

      <TouchableOpacity style={{position: 'absolute',top: 320, right: 60}} onPress={() => this.yup()}>
        <Image source={require('./img/btn_meet_like.png')}/>
      </TouchableOpacity>

      <View style={{position: 'absolute',top: 400, flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
        <Image style={{marginRight: 5}}source={require('./img/ico_meet_email_1.png')}/>
        <Image style={{marginRight: 5}}source={require('./img/ico_meet_picture_1.png')}/>
        <Text style={{fontSize: 20,color: '#606060',fontFamily: 'NotoSans'}}>Pauline</Text>
        <Text style={{fontSize: 20,color: '#606060',fontFamily: 'NotoSans'}}>, </Text>
        <Text style={{fontSize: 20,color: '#606060',fontFamily: 'NotoSans'}}>38</Text>
      </View>

      <View style={{position: 'absolute',top: 440, alignSelf: 'center', alignItems: 'center'}}><Text style={{fontSize: 10,color: '#606060'}}>好看的千篇一律，有趣的靈魂卻是萬里挑一</Text></View>
    
      <View style={{position: 'absolute',top: 460, flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
        <Image style={{marginRight: 5}}source={require('./img/ico_meet_globe.png')}/>
        <Text style={{fontSize: 10,color: '#606060',fontFamily: 'NotoSans'}}>中文(流利), 英文(普通)</Text>
      </View>

      <View style={{position: 'absolute',top: 480, flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
        <Image style={{marginRight: 5}}source={require('./img/ico_meet_locate.png')}/>
        <Text style={{fontSize: 10,color: '#606060',fontFamily: 'NotoSans'}}>你們距離大約7.9公里</Text>
      </View>

    </View>
  )}
}

/*

            cropWidth={width}
            cropHeight={height}
                            imageWidth={width}
                       imageHeight={height}
        scale={1.5}
    minimumZoomScale={0.5}
  maximumZoomScale={3}
  androidScaleType="center"
  androidZoomTransitionDuration={1}
  onLoad={() => console.log("Image loaded!")}
native-base
  */
