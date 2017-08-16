import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
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
    //backgroundColor: 'red'
  },
  image: {
    width: circleSize,
    height: circleSize,
    marginBottom: 5,
    borderRadius: circleSize/2,
    overflow: 'hidden'
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
    <View style={styles.view}>
      <MKPLoadImageView hiddenProgress={true} style={ styles.image } source={ styles.avatar } defaultSource={ DEFAULT_IMAGE } onPress={ onPress }/>
      <Text style={ styles.text } lineBreakMode={ lineBreakMode } numberOfLines={1} >{ name }</Text>
    </View>
  )
}

export default Cookie
// activeOpacity={0.8} onPress={onPress}
