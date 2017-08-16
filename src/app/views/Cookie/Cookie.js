import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Avatar, Badge } from 'react-native-elements'

const { width } = Dimensions.get('window')

const x = 5

const picWidth = (width - 4 * x)/3

const ADD_IMAGE = require('Bacon/src/images/addImage.png')

const Cookie = ({ name, size, avatar, onPress }) => {

const styles = {
  itemImageStyle: {
    width: size || picWidth,
    height: size || picWidth,
    marginBottom: 5,
    borderRadius: size ? size/2 : picWidth*2,
  },
  nickname: {
    height: 20
  }
}

  return(
    <View style={{alignItems: 'center', marginLeft: size ? 0 : x, marginBottom: 10}}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Image source={ avatar ? { uri: avatar } : require('./img/ico_qy_head_preload.png') } style={styles.itemImageStyle}/>
      </TouchableOpacity>
      <View style={styles.nickname}>
        <Text lineBreakMode="tail" numberOfLines={1} >{ name }</Text>
      </View>
    </View>
  )
}

export default Cookie
