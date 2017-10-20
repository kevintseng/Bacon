import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import { BaconBadgeYes, BaconBadgeNo } from './BaconBadge/BaconBadge'

import Cookie from './Cookie/Cookie'

const styles = {
  chat: {
    flexDirection: 'row',
    margin: 10,
    height: 105,
    borderBottomWidth: 1,
    borderColor: '#b3b3b3'
  }
}

const ChatList = ({title, onPress, avatar, tags, author}) => {

  return(
    <TouchableOpacity style={styles.chat} activeOpacity={1} onPress={ onPress }>
      <Cookie 
        disabled 
        local 
        size={90} 
        avatar={avatar} 
        name={author}
        circleBorderWidth={2}
        circleColor={'rgba(41, 255, 41,1)'}
      />
    </TouchableOpacity>
  )
}

export default ChatList
