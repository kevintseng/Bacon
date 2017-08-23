import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import { BaconBadgeYes, BaconBadgeNo } from './BaconBadge/BaconBadge'

const DEFAULT_IMAGE = require('./Cookie/img/ico_qy_head_preload.png')

const styles = {
  article: {
    flexDirection: 'row',
    margin: 10,
    height: 100,
    borderBottomWidth: 1,
    borderColor: '#b3b3b3'
  },
  image: {
    width: 90,
    height: 90
  },
  title: {
    width: 240,
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 18,
    fontWeight: '500',
    color: '#606060',
  },
  content: {
    paddingLeft: 10,
    justifyContent: 'space-between'
  }
}

const ArticleList = ({source,title,onPress}) => {

  return(
    <TouchableOpacity style={styles.article} onPress={ onPress }>
      <Image style={styles.image} source={{uri: source}} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <BaconBadgeYes text='熱門'/>
      </View>
    </TouchableOpacity>
  )
}

export default ArticleList