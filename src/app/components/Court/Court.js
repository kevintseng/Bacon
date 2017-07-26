import React, {Component} from 'react'
import { Dimensions, TouchableOpacity, Image, Modal, View, Text, Button } from 'react-native'
import Carousel from 'react-native-looped-carousel';
import SwipeCards from 'react-native-swipe-cards';
import PhotoView from 'react-native-photo-view';
//import { DeckSwiper } from 'native-base';
 const { width, height } = Dimensions.get('window')


const data = [
  { id: 2, text: 'Amanda', age: 28, uri: 'http://pic.pimg.tw/wuntinglin/4b84e20809d8f.jpg' },
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
    <View style={{flex: 1}}>
      <Image
        source={{uri: card.uri}}
         style={{width, height: width}}

       />
    </View>

     
  )
}
  render(){
  return(
    <View style={{flex:1}}>
          <Modal animationType={"fade"} onRequestClose={()=>{}} visible={this.props.visible} transparent={false}>
            <Carousel
            style={{flex:1,backgroundColor: 'black'}}
            //arrows
          //delay={2000}
          bullets
          autoplay={false}
          //pageInfo
          bulletsContainerStyle={{position: 'absolute'}}
          pageInfoTextStyle={{color: 'red'}}
          onAnimateNextPage={(p) => console.log(p)}
            >
                  <PhotoView  androidScaleType={'fitCenter'} scale={this.state.scale} style={{height, width}} resizeMode={'contain'} source={{uri: 'http://f9view.com/wp-content/uploads/2013/10/American-Beautiful-Girls-Wallpapers-Hollywood-Celebs-1920x1200px.jpg'}}/>
                  <PhotoView  androidScaleType={'fitCenter'} scale={this.state.scale} style={{height, width}} resizeMode={'contain'} source={{uri: 'https://i.imgur.com/FHxVpN4.jpg'}}/>
      </Carousel>
                        <View style={{position: 'absolute'}}><Text onPress={()=>{this.setState({scale: 2.0})}} style={{color:'white'}}>2x</Text></View>

                  <View style={{position: 'absolute', right: 50}}><Text onPress={this.props.close} style={{color:'white'}}>Return</Text></View>

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

      <Button title='Reject' onPress={() => this.nope()}/>
     <Button title='Like' onPress={() => this.yup()}/>
    </View>
  )}
}

/*
        scale={1.5}
    minimumZoomScale={0.5}
  maximumZoomScale={3}
  androidScaleType="center"
  androidZoomTransitionDuration={1}
  onLoad={() => console.log("Image loaded!")}

  */
