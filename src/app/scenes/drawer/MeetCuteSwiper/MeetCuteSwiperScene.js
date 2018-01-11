import React, { Component } from 'react'
import { Modal, View, Text, ScrollView, Dimensions, InteractionManager, Image,TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Swiper from 'react-native-deck-swiper'
import Carousel from 'react-native-looped-carousel'
import ImageZoom from 'react-native-image-pan-zoom'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import SquareImage from 'react-native-bacon-square-image'

import BaconActivityIndicator from '../../../views/BaconActivityIndicator'
import BaconCard from '../../../views/BaconCard/'

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

@inject('firebase','SubjectStore','MeetCuteStore') @observer
export default class MeetCuteSwiperScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.MeetCuteStore = this.props.MeetCuteStore
    this.state = {
      albumZoom: false
    }
    this.cardIndex = 0
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
    this.MeetCuteStore.startLoading()
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.MeetCuteStore.fetchPreys(this.SubjectStore.preySexualOrientation))
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

  onPressLeft = () => {
    this.swiper.swipeLeft()
  }

  onPressRight = () => {
    this.swiper.swipeRight()
  }

  updateGoodImpression = () => {
    this.firebase.database().ref('goodImpressionList/' + this.SubjectStore.uid + this.SubjectStore.meetCutePreys[this.cardIndex].key).set({wooner: this.SubjectStore.uid, prey: this.SubjectStore.meetCutePreys[this.cardIndex].key, time: Date.now()})    
  }

  onSwipedAll = () => {
    this.cardIndex = 0
    this.SubjectStore.setMeetCuteModal()
  }

  nextPhoto = () => {
    this.carousel._animateNextPage()
  }

  render() {

    return(
      <View style={styles.view}>
        { this.MeetCuteStore.loading ? <BaconActivityIndicator/> :
        <View style={styles.view}>
          <Modal hardwareAccelerated animationType={'none'} onRequestClose={this.closeAlbum} visible={ this.state.albumZoom || false } transparent={false}>
            <Carousel
              ref={(carousel) => { this.carousel = carousel }}
              swipe
              currentPage={this.currentPage}
              style={{flex:1,backgroundColor: 'transparent'}}
              bullets
              autoplay={false}
              pageInfoTextStyle={{color: 'red'}}
              bulletsStyle={{position: 'absolute',bottom: 10}}
            >
              { this.renderAlbumZoom( this.MeetCuteStore.preys[this.cardIndex].album ) }
            </Carousel>
            <View style={styles.toolView}>
              <TouchableOpacity onPress={ this.closeAlbum }>
                <Image source={require('../../../../images/btn_meet_main.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={ this.nextPhoto }>
                <Image source={require('../../../../images/btn_meet_nextpic.png')}/>
              </TouchableOpacity>
            </View>
          </Modal>
          <Swiper
            ref={swiper => { this.swiper = swiper}}
            cards={toJS(this.MeetCuteStore.preys)}
            renderCard={(card) => {
            return(
              <BaconCard
                album={card.album}
                onPressAlbum={this.openAlbum}
                displayName={ card.nickname }
                age={ 20 }
                showDistance
                showBlockade
                showReport
                
              />
              )
            }}
            onSwiped={(cardIndex) => {this.cardIndex = cardIndex + 1}}
            onSwipedAll={this.onSwipedAll}
            cardIndex={this.cardIndex}
            horizontalSwipe={false}
            verticalSwipe={false}
            secondCardZoom={1}
            backgroundColor={'white'}
            cardVerticalMargin={0}
            cardHorizontalMargin={0}
            zoomAnimationDuration={0}
            swipeBackCard={false}
            //showSecondCard={false}
            //infinite={true}
          />
          <View style={{flexDirection: 'row',position: 'absolute', justifyContent: 'space-around',top: height/2, width}}>
            <TouchableOpacity onPress={ this.onPressLeft }>
              <Image source={require('../../../../images/btn_meet_dislike.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={ this.onPressRight }>
              <Image source={require('../../../../images/btn_meet_like.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        }
      </View>
    )
  }
}

/*

          <Modal hardwareAccelerated animationType={'none'} onRequestClose={this.closeAlbum} visible={ this.state.albumZoom || false } transparent={false}>
            <Carousel
              ref={(carousel) => { this.carousel = carousel }}
              swipe
              currentPage={this.currentPage}
              style={{flex:1,backgroundColor: 'transparent'}}
              bullets
              autoplay={false}
              pageInfoTextStyle={{color: 'red'}}
              bulletsStyle={{position: 'absolute',bottom: 10}}
            >
              { this.renderAlbumZoom( this.MeetCuteStore.preys[this.cardIndex].album ) }
            </Carousel>
            <View style={styles.toolView}>
              <TouchableOpacity onPress={ this.closeAlbum }>
                <Image source={require('../../../../images/btn_meet_main.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={ this.nextPhoto }>
                <Image source={require('../../../../images/btn_meet_nextpic.png')}/>
              </TouchableOpacity>
            </View>
          </Modal>
*/