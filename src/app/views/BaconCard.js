import React from 'react'
import { View, Image, Text, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView, Platform } from 'react-native'
import Carousel from 'react-native-looped-carousel'
import SquareImage from 'react-native-bacon-square-image'
import { Icon } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

const styles = {
  view: {
    backgroundColor: 'white',
    height: height - ( Platform.OS === 'ios' ? 64 : 54 )
  },
  info: {
    marginTop: 40
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
  text: {
    fontSize: 13,
    color: '#606060',
    fontFamily: 'NotoSans',
    textAlign: 'center',
  },
  icon: {
    marginRight: 5
  },
  nameAge: {
    fontSize: 18,
    color: '#606060',
    fontFamily: 'NotoSans',
    fontWeight: '500',
  }
} 

const renderAlbum = (album,onPressAlbum) => (
  album.map((photo,index) => (
    <SquareImage 
      key={photo} 
      style={styles.dimensions} 
      customImagePlaceholderDefaultStyle={styles.dimensions}
      source={{
        uri: photo
      }} 
      onPress={ () => { onPressAlbum(index) } } 
      placeholderSource={require('../../images/ico_qy_head_preload.png')}
      loadingStyle={ styles.loadingStyle }
      />
    ))
  )

const BaconCard = ({ album, verityEmail, verityPhoto, displayName, bio, age, address, langs, distance, showDistance, showBlockade, showReport, onPressReport, onPrssBlockade, onPressAlbum }) => (
  <View style={styles.view}>
      <Carousel
        swipe
        style={{backgroundColor: 'white',width, height: width}}
        bullets
        autoplay={false}
        bulletsContainerPosition={{ top: 5, left: width/5*4 }}
        bulletsStyle={{position: 'absolute',top: 10}}
      >
        { renderAlbum(album,onPressAlbum) }
      </Carousel>

      <ScrollView style={styles.info}>
        <View style={styles.nameAgeView}>
          <Image style={{marginRight: 5}} source={verityEmail ? require('../../images/ico_meet_email_1.png') : require('../../images/ico_aboutme_mail_0.png')}/>
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
          <Icon name='report' color='#D63768'/>
          <Text style={styles.text}> 檢舉</Text>
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

export default BaconCard


