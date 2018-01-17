import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, Dimensions, ScrollView, Platform, Modal } from 'react-native'
import Carousel from 'react-native-looped-carousel'
import SquareImage from 'react-native-bacon-square-image'
import ImageZoom from 'react-native-image-pan-zoom'
import { Icon } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

const styles = {
  view: {
    backgroundColor: 'white',
    width,
    height: height - ( Platform.OS === 'ios' ? 64 : 54 )
  },
  carousel: { 
    backgroundColor: 'white',
    width, 
    height: width
  },
  carouselZoom : {
    flex:1,
    backgroundColor: 'transparent'
  },
  info: {
    width,
    marginTop: 40,
    marginBottom: 20
  },
  dimensions: {
    width, 
    height: width
  },
  loadingStyle: { 
    size: 'large', 
    color: '#b3b3b3' 
  },
  nameAgeView: {
    flexDirection: 'row', 
    alignSelf: 'center', 
    alignItems: 'center',
  },
  bioView: {
    marginTop: 10, 
    alignSelf: 'center', 
    alignItems: 'center', 
    paddingRight: 20, 
    paddingLeft: 20
  },
  distanceView: {
    marginTop: 10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    alignItems: 'center'
  },
  addressView: { 
    marginTop: 10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    alignItems: 'center'
  },
  langsView: {
    marginTop: 10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    alignItems: 'center'
  },
  blockadeView: {
    marginTop: 10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    alignItems: 'center'
  },
  reportView: {
    marginTop: 10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    alignItems: 'center'
  },
  toolView: {
    width, 
    position: 'absolute', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20
  },
  nameAge: {
    fontSize: 18,
    color: '#606060',
    fontFamily: 'NotoSans',
    fontWeight: '500',
  },
  text: {
    fontSize: 13,
    color: '#606060',
    fontFamily: 'NotoSans',
    textAlign: 'center'
  },
  icon: {
    marginRight: 5
  },
  bulletsContainerPosition: { 
    top: 5, 
    left: width/5*4 
  },
  bulletsStyle: {
    position: 'absolute',
    top: 10
  }
} 



export default class BaconCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      albumZoom: false,
    }
  }

  renderAlbum = album => (
    album.map(photo => (
      <SquareImage 
        key={photo} 
        style={styles.dimensions} 
        customImagePlaceholderDefaultStyle={styles.dimensions}
        source={{
          uri: photo
        }} 
        onPress={ this.openAlbum } 
        placeholderSource={require('../../images/ico_qy_head_preload.png')}
        loadingStyle={ styles.loadingStyle }
        />
      ))
  )

  renderAlbumZoom = album => (
    album.map((photo,index) => (
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

  openAlbum = () => {
    this.currentPage = this.carousel.getCurrentPage()
    this.setState({
      albumZoom: true
    })
  }

  closeAlbum = () => {
    this.currentPage = this.carouselZoom.getCurrentPage()
    this.setState({
      albumZoom: false
    })
  }

  nextPhoto = () => {
    this.carousel._animateNextPage()
    this.carouselZoom._animateNextPage()
  }

  render() {

    const { album, verityEmail, verityPhoto, displayName, bio, age, address, langs, distance, showDistance, showBlockade, showReport, onPressReport, onPrssBlockade } = this.props

    return(
      <View style={styles.view}>
          <Modal hardwareAccelerated animationType={'none'} onRequestClose={this.closeAlbum} visible={ this.state.albumZoom || false } transparent={false}>
            <Carousel
              ref={(carousel) => { this.carouselZoom = carousel }}
              currentPage={this.currentPage}
              style={styles.carouselZoom}
              bullets
              autoplay={false}
              bulletsStyle={styles.bulletsStyle}
            >
              { this.renderAlbumZoom(album) }
            </Carousel>
            <View style={styles.toolView}>
              <TouchableOpacity onPress={ this.closeAlbum }>
                <Image source={require('../../images/btn_meet_main.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={ this.nextPhoto }>
                <Image source={require('../../images/btn_meet_nextpic.png')}/>
              </TouchableOpacity>
            </View>
          </Modal>


        <Carousel
          ref={(carousel) => { this.carousel = carousel }}
          currentPage={this.currentPage}
          swipe
          style={styles.carousel}
          bullets
          autoplay={false}
          bulletsContainerPosition={styles.bulletsContainerPosition}
          bulletsStyle={styles.bulletsStyle}
        >
          { this.renderAlbum(album) }
        </Carousel>

        <ScrollView style={styles.info}>
          <View style={styles.nameAgeView}>
            <Image style={styles.icon} source={verityEmail ? require('../../images/ico_meet_email_1.png') : require('../../images/ico_aboutme_mail_0.png')}/>
            <Text style={styles.nameAge}>{ displayName || 'NULL' }</Text>
            <Text style={styles.nameAge}>，</Text>
            <Text style={styles.nameAge}>{ age || 'NULL' }</Text>
          </View>

          <View style={styles.bioView}>
            <Text style={styles.text}>{ bio || 'NULL' }</Text>
          </View>

          { showDistance &&
            <View style={styles.distanceView}>
              <Image style={styles.icon} source={require('../../images/ico_meet_locate.png')}/>
              <Text style={styles.text}>你們距離大約 { distance || 'NULL' } 公里</Text>
            </View>
          }

          <View style={styles.addressView}>
            <Image style={styles.icon} source={require('../../images/ico_meet_city.png')}/>
            <Text style={styles.text}>{ address || 'NULL' }</Text>
          </View>

          <View style={styles.langsView}>
            <Image style={styles.icon} source={require('../../images/ico_meet_globe.png')}/>
            <Text style={styles.text}>{ langs || 'NULL' }</Text>
          </View>

          { showReport &&
          <TouchableOpacity style={styles.reportView} onPress={onPressReport}>
            <Image style={styles.icon} source={require('../../images/btn_meet_block.png')}/>
            <Text style={styles.text}>檢舉</Text>
          </TouchableOpacity>
          }

          { showBlockade &&
          <TouchableOpacity style={styles.blockadeView} onPress={onPrssBlockade}>
            <Image style={styles.icon} source={require('../../images/btn_meet_block.png')}/>
            <Text style={styles.text}>封鎖此人</Text>
          </TouchableOpacity>
          }
        </ScrollView>
      </View>
    )
  }
}

/*

*/