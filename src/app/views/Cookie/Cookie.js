import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Avatar, Badge } from 'react-native-elements'
import MKPLoadImageView from 'mkp-react-native-image-view'

const { width } = Dimensions.get('window')

const x = 5

const picWidth = (width - 4 * x)/3

const DEFAULT_IMAGE = require('./img/ico_qy_head_preload.png')

const Cookie = ({ name, size, avatar, onPress }) => {

const circleSize = size || picWidth

const circleFixBorder = circleSize/2

const lineBreakMode ='tail'

const styles = {
  view: {
    alignItems: 'center', 
    marginLeft: size ? 0 : x, 
    marginBottom: 10,
    //backgroundColor: 'blue'
  },
  image: {
    width: circleSize,
    height: circleSize,
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    overflow: 'hidden',
  },
  fixCircleClipping: {
    position: 'absolute',
    top: -circleFixBorder,
    bottom: -circleFixBorder,
    right: -circleFixBorder,
    left: -circleFixBorder,
    borderRadius: circleSize / 2 + circleFixBorder / 2,
    borderWidth: circleFixBorder,
    borderColor: 'white',
    //backgroundColor: 'red'
  },
  indicatorProps: {
    color:'red',
    style:
    {
      margin:10,
      flex:1
    }
  },
  avatar: {
    uri: avatar
  },
  text: {
    lineHeight: 20
  }
}
  return(
    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#d63768')} onPress={ onPress }>
    <View style={styles.view}>
      <View style={styles.circle} >
        <MKPLoadImageView style={ styles.image } source={ styles.avatar } defaultSource={ DEFAULT_IMAGE } />
        <View style={styles.fixCircleClipping} />
      </View>
      <Text style={ styles.text } lineBreakMode={ lineBreakMode } numberOfLines={1} >{ name }</Text>
    </View>
    </TouchableNativeFeedback>
  )
}

export default Cookie
// onPress={ onPress }
// opacity={1} activeOpacity={0.7} onPress={ onPress }