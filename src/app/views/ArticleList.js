import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
//import { BaconBadgeYes, BaconBadgeNo } from './BaconBadge/BaconBadge'
import { Badge } from 'react-native-elements'

import Cookie from './Cookie/Cookie'

const DEFAULT_IMAGE = require('./Cookie/img/ico_qy_head_preload.png')

const styles = {
  article: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 10, 
    marginRight: 10,
    height: 100,
    borderBottomWidth: 1,
    borderColor: '#b3b3b3'
  },
  image: {
    width: 90,
    height: 90
  },
  title: {
    width: 250,
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 18,
    fontWeight: '500',
    color: '#606060',
    backgroundColor: 'transparent'
  },
  content: {
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15   
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5,
    //backgroundColor: 'red',
    alignItems: 'center'
  },
  tags: {
    //backgroundColor: 'blue',
    flexDirection: 'row'
  },
  badgeView: {
    marginRight: 3
  },
  badge: {
    backgroundColor: '#D63768',
    //height: 17,
    //width: 58 
  },
  badgeText: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    backgroundColor: 'transparent',
    //fontSize: 11,
  },
  cookie: {
    paddingBottom: 5,
    paddingRight: 5
  }
}

const ArticleList = ({source,title,onPress,avatar,tags,author}) => {

  const showTags = () => ( 
    tags.map( tag => (
      //<BaconBadgeYes key={tag} text={tag}/>
      <View key={tag} style={styles.badgeView}>
        <Badge value={tag} containerStyle={ styles.badge } textStyle={styles.badgeText}/>
      </View>
    ))
  )

  return(
    <TouchableOpacity style={styles.article} onPress={ onPress }>
      <Image style={styles.image} source={source} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.bottom}>
          <View style={styles.tags}>
          {
            showTags()
          }
          </View>
          <View style={styles.cookie}>
            <Cookie local size={30} avatar={avatar} name={author}/>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ArticleList