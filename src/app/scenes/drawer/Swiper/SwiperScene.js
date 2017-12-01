import React, { Component } from 'react'
import { Modal, View, Text, ScrollView, Dimensions, InteractionManager, BackHandler, ToastAndroid, Button, Image, TouchableWithoutFeedback,TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Swiper from 'react-native-deck-swiper'
import Carousel from 'react-native-looped-carousel'
import ImageZoom from 'react-native-image-pan-zoom'
import { Icon } from 'react-native-elements'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import SquareImage from 'react-native-bacon-square-image'
import Infos from '../../../views/Infos/Infos'
import FastImage from 'react-native-fast-image';

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

const aa = ['http://news.cts.com.tw/photo/cts/201703/20170316-329467_bm.jpg','http://img.chinatimes.com/newsphoto/2016-05-18/656/20160518003819.jpg']

@inject('firebase','SubjectStore','MeetCuteStore') @observer
export default class SwiperScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.MeetCuteStore = this.props.MeetCuteStore
    this.cardIndex = 0
    this.state = {
      albumZoom: false
    }
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
    //BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentDidMount() {
    //InteractionManager.runAfterInteractions(this.task)
  }

  componentWillUnmount() {
    //BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  renderAlbum = album => (
    album.map((photo,index) => (
      <SquareImage 
        key={photo} 
        style={{width, height: width}} 
        customImagePlaceholderDefaultStyle={{ width, height: width }}
        source={{uri: photo}} 
        onPress={() => { this.openAlbum(index) }} 
        placeholderSource={require('../../../../images/ico_qy_head_preload.png')}
        loadingStyle={{ size: 'large', color: '#b3b3b3' }}
      />
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

  render() {

    return(
      <View style={{flex: 1}}>
        { this.MeetCuteStore.modal ?
        <View style={{flex: 1,justifyContent: 'center'}}>
          <ActivityIndicator
            size={'large'}
          />
        </View> :
        <View style={{flex: 1}}>
          <Swiper
            ref={swiper => { this.swiper = swiper}}
            cards={toJS(this.MeetCuteStore.newPreys)}
            renderCard={(card) => {
            return(
              <View style={{flex: 1}}>
              <Carousel
                swipe
                style={{backgroundColor: 'white',width, height: width}}
                bullets
                autoplay={false}
                bulletsContainerPosition={{ top: 5, left: width/5*4 }}
                bulletsStyle={{position: 'absolute',top: 10}}
              >
                { this.renderAlbum(card.album) }
              </Carousel>
                <View style={{alignSelf: 'center',paddingTop: 40}}>
                  <Infos
                    showBlockade
                    showReportUser
                    showDistance
                    //verityEmail={ this.MeetCuteStore.emailVerified }
                    //verityPhoto={ this.MeetCuteStore.photoVerified }
                    displayName={ card.nickname }
                    //bio={ this.MeetCuteStore.bio }
                    //age={ this.MeetCuteStore.age }
                    //langs={ this.MeetCuteStore.languagesToString }
                    //distance={ this.MeetCuteStore.distance }
                    //onReportUserPressed= { this.reportPressed }
                    //address={ this.MeetCuteStore.address }
                    //onPrssBlockade={ this.onPrssBlockade }
                  />
                </View>
              </View>
              )
            }}
            onSwiped={(cardIndex) => {this.cardIndex = cardIndex + 1}}
            //onSwiped={() => {console.log(this.swiper)}}
            cardIndex={0}
            horizontalSwipe={false}
            verticalSwipe={false}
            secondCardZoom={1}
            backgroundColor={'white'}
            cardVerticalMargin={0}
            cardHorizontalMargin={0}
            zoomAnimationDuration={0}
            //showSecondCard={false}
            //swipeBackCard={false}
          />
          <View style={{flexDirection: 'row',position: 'absolute', justifyContent: 'space-around',top: height/2, width}}>
            <TouchableOpacity onPress={ () => { this.swiper.swipeLeft() } }>
              <Image source={require('../../../../images/btn_meet_dislike.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => { this.swiper.swipeRight() } }>
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
        { this.MeetCuteStore.modal ?
        <View style={{flex: 1,justifyContent: 'center'}}>
          <ActivityIndicator
            size={'large'}
          />
        </View> :
        <View style={{flex: 1}}>
               <View style={{flex: 1}}>
                <PreloadedImage 
                  //key={photo} 
                  style={{width, height: width}} 
                  customImagePlaceholderDefaultStyle={{ width, height: width }}
                  source={{uri: this.MeetCuteStore.newPreys[this.MeetCuteStore.index].album[0]}} 
                  name={toJS(this.MeetCuteStore.newPreys[this.MeetCuteStore.index].album)[0].name}
                  //onPress={() => { this.openAlbum(index) }} 
                  placeholderSource={require('../../../../images/ico_qy_head_preload.png')}
                  loadingStyle={{ size: 'large', color: '#b3b3b3' }}
                />
                <View style={{alignSelf: 'center',paddingTop: 40}}>
                  <Infos
                    showBlockade
                    showReportUser
                    showDistance
                    //verityEmail={ this.MeetCuteStore.emailVerified }
                    //verityPhoto={ this.MeetCuteStore.photoVerified }
                    displayName={ this.MeetCuteStore.newPreys[this.MeetCuteStore.index].nickname }
                    //bio={ this.MeetCuteStore.bio }
                    //age={ this.MeetCuteStore.age }
                    //langs={ this.MeetCuteStore.languagesToString }
                    //distance={ this.MeetCuteStore.distance }
                    //onReportUserPressed= { this.reportPressed }
                    //address={ this.MeetCuteStore.address }
                    //onPrssBlockade={ this.onPrssBlockade }
                  />
                </View>
              </View>
          <View style={{flexDirection: 'row',position: 'absolute', justifyContent: 'space-around',top: height/2, width}}>
            <TouchableOpacity onPress={ this.onPressLeft  }>
              <Image source={require('../../../../images/btn_meet_dislike.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={ this.onPressRight }>
              <Image source={require('../../../../images/btn_meet_like.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        }
*/