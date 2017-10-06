import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import { BaconBadgeYes, BaconBadgeNo } from './BaconBadge/BaconBadge'

import Cookie from './Cookie/Cookie'

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
  titleView: {
    paddingLeft: 10,
    justifyContent: 'center'
  },
  title: {
    width: 240,
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 18,
    fontWeight: '400',
    color: '#606060',
    backgroundColor: 'transparent'
  },
  content: {
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent: 'center'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15   
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5
  },
  tags: {
    flexDirection: 'row'
  },
  button: {
    justifyContent: 'center'
   // flexDirection: 'row'
  }
}

const RecordList = ({title,time}) => {

  return(
    <View style={styles.article}>
      <View style={styles.content}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title}>{time}</Text>
        </View>
        <View style={styles.button}>
          <BaconBadgeYes key={'回顧'} text={'回顧'}/>
        </View>
      </View>
    </View>
  )
}

export default RecordList