import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Avatar, Badge } from 'react-native-elements'
import MKPLoadImageView from 'mkp-react-native-image-view'

const { width } = Dimensions.get('window')

const x = 5

const picWidth = (width - 4 * x)/3

const DEFAULT_IMAGE = require('./img/ico_qy_head_preload.png')

const Cookie = ({ name, size, avatar, onPress, borderColor, local, disabled, circleBorderWidth, circleColor }) => {

const circleSize = size || picWidth

const circleFixBorder = circleSize/2

const lineBreakMode ='tail'

const styles = {
  view: {
    alignItems: 'center', 
    marginLeft: size ? 0 : x, 
    //marginBottom: 10,
  },
  image: {
    width: circleSize,
    height: circleSize,
  },
  border: {
    position: 'absolute',
    width: circleSize,
    height: circleSize,
    borderRadius: circleFixBorder,
    borderWidth: circleBorderWidth || 0 ,
    borderColor: circleColor || 'transparent',
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleFixBorder,
    overflow: 'hidden',
    //borderWidth: 1,
    //borderColor: 'green',
  },
  fixCircleClipping: {
    position: 'absolute',
    top: -circleFixBorder,
    bottom: -circleFixBorder,
    right: -circleFixBorder,
    left: -circleFixBorder,
    borderRadius: circleFixBorder + circleFixBorder / 2,
    borderWidth: circleFixBorder,
    borderColor: borderColor || 'white',
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
    lineHeight: 20,
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    color: '#606060',
    backgroundColor: 'transparent',
    fontSize: 13
  }
}
  return(
    <TouchableOpacity disabled={ disabled } activeOpacity={1} style={styles.view} onPress={ onPress }>
      <View style={styles.circle} >
        { local ? 
          <MKPLoadImageView style={ styles.image } source={ avatar ? avatar : require('./img/ico_qy_head_preload.png') } defaultSource={ DEFAULT_IMAGE } />
        : <MKPLoadImageView style={ styles.image } source={ avatar ? { uri: avatar } : require('./img/ico_qy_head_preload.png') } defaultSource={ DEFAULT_IMAGE } />
        } 
        <View style={styles.fixCircleClipping} />
        <View style={styles.border} /> 
      </View>
      <Text style={ styles.text } lineBreakMode={ lineBreakMode } numberOfLines={1} >{ name }</Text>
    </TouchableOpacity>
  )
}

export default Cookie

/*

<View style={styles.fixCircleClipping} />
*/
