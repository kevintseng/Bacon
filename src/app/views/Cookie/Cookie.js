import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
//import FastImage from 'react-native-fast-image'
//import { Avatar, Badge } from 'react-native-elements'
//import MKPLoadImageView from 'mkp-react-native-image-view'
import CircleImage from 'react-native-bacon-circle-image'

//const DEFAULT_IMAGE = require('./img/ico_qy_head_preload.png')

const Cookie = ({ name, size, avatar, onPress, borderColor, local, disabled, circleBorderWidth, circleColor }) => {

const { width } = Dimensions.get('window')

const x = 5

const picWidth = (width - 4 * x)/3

const circleSize = size || picWidth

//const circleFixBorder = circleSize/2

//const lineBreakMode ='tail'

  return(
    <CircleImage
      radius={ circleSize/2 }
      //borderColor={borderColor}
      //circleBorderWidth={circleBorderWidth}
      //circleColor={circleColor}
      onPress={onPress}
      placeholderSource={require('./img/ico_qy_head_preload.png')}
      loadingStyle={{ size: 'small', color: '#b3b3b3' }}
      source={{uri:avatar}}
      disabled={disabled}
      //isShowActivity={false}
    />
  )
}

export default Cookie

/*

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

    <TouchableOpacity disabled={ disabled } activeOpacity={1} style={styles.view} onPress={ onPress }>
      <View style={styles.circle} >
        { local ? 
          <ImageLoad style={ styles.image } placeholderStyle={styles.image} loadingStyle={{ size: 'small', color: '#d63768' }} placeholderSource={require('./img/ico_qy_head_preload.png')} source={ avatar ? avatar : require('./img/ico_qy_head_preload.png') } defaultSource={ DEFAULT_IMAGE } />
        : <ImageLoad style={ styles.image } placeholderStyle={styles.image} loadingStyle={{ size: 'small', color: '#d63768' }} placeholderSource={require('./img/ico_qy_head_preload.png')} source={ avatar ? { uri: avatar } : require('./img/ico_qy_head_preload.png') } defaultSource={ DEFAULT_IMAGE } />
        } 
        <View style={styles.fixCircleClipping} />
        <View style={styles.border} /> 
      </View>
      <Text style={ styles.text } lineBreakMode={ lineBreakMode } numberOfLines={1} >{ name }</Text>
    </TouchableOpacity>
*/
