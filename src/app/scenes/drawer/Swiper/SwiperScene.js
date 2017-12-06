import React, { Component } from 'react'
import { Modal, View, Text, ScrollView, Dimensions, InteractionManager, BackHandler, ToastAndroid, Button, Image, TouchableWithoutFeedback,TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Swiper from 'react-native-deck-swiper'
import Carousel from 'react-native-looped-carousel'
import ImageZoom from 'react-native-image-pan-zoom'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import SquareImage from 'react-native-bacon-square-image'
import Infos from '../../../views/Infos/Infos'
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

@inject('firebase','SubjectStore','MeetCuteStore') @observer
export default class SwiperScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      albumZoom: false
    }
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
    this.SubjectStore.setMeetCutePreys()
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

  //block = () => {
    //console.warn(this.SubjectStore.uid)
  //  this.firebase.database().ref('meetCuteList/' + this.SubjectStore.sexualOrientation + '/K1wBpaqDOyXpaxIQ93Nwx3VlDbk2/' +this.SubjectStore.uid).remove()
  //}

  render() {

    return(
      <View style={{flex: 1}}>
        { this.SubjectStore.meetCuteModal ?
        <View style={{flex: 1,justifyContent: 'center'}}>
          <ActivityIndicator
            size={'large'}
          />
        </View> :
        <View style={{flex: 1}}>
          <Swiper
            ref={swiper => { this.swiper = swiper}}
            cards={toJS(this.SubjectStore.meetCutePreys)}
            renderCard={(card) => {
            return(
              <View style={{flex: 1}}>
                { console.log(card) }
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
            onSwipedAll={() => {alert('沒了')}}
            cardIndex={this.cardIndex}
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
                <Modal hardwareAccelerated animationType={'none'} onRequestClose={this.closeAlbum} visible={ this.state.albumZoom || false } transparent={false}>
                  <Carousel
                    //ref={(carousel) => { this.carousel = carousel }}
                    swipe
                    currentPage={this.currentPage}
                    style={{flex:1,backgroundColor: 'transparent'}}
                    bullets
                    autoplay={false}
                    pageInfoTextStyle={{color: 'red'}}
                    bulletsStyle={{position: 'absolute',bottom: 10}}
                    >
                    { this.renderAlbumZoom( card.album ) }
                  </Carousel>
                  <View style={styles.toolView}>
                    <View><Icon name='heart' color='#d63768' size={50} type='evilicon' underlayColor='transparent' onPress={ this.closeAlbum } /></View>
                    <View><Icon name='arrow-right' color='#d63768' size={50} type='evilicon' underlayColor='transparent' onPress={ this.nextphoto }/></View>
                  </View>
                </Modal>
*/