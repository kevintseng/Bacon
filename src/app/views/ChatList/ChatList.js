import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import { Badge } from 'react-native-elements'

//import { BaconBadgeYes, BaconBadgeNo } from '../BaconBadge/BaconBadge'

import Cookie from '../Cookie/Cookie'

const styles = {
  chat: {
    flexDirection: 'row',
    margin: 10,
    height: 105,
    borderBottomWidth: 1,
    borderColor: '#b3b3b3'
  },
  cookie: {
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20
  },
  contentView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    //backgroundColor: 'red'
  },
  tagView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 10
    //backgroundColor: 'blue'
  },
  nameText: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 18,
    fontWeight: '500',
    color: '#606060',
    backgroundColor: 'transparent'
  },
  lastChatContent: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    //fontSize: 18,
    //fontWeight: '500',
    color: '#B3B3B3',
    backgroundColor: 'transparent'    
  },
  image: {
    paddingTop: 5,
    height: 25,
    width: 40,
    alignItems: 'center',
    //backgroundColor: 'blue'
  },
  nonHandleChat: {
    backgroundColor: 'red',
    height: 17,
    width: 40
  },
  showBadge: {
    //
  },
  hidenBadge: {
    opacity: 0,
  }
}

const ChatList = ({name, avatar, onPress, lastChatContent,nonHandleChatCount,showBadge,showTag }) => {

  return(
    <TouchableOpacity style={styles.chat} activeOpacity={1} onPress={ onPress }>
      <View style={styles.cookie}>
        <Cookie 
          disabled 
          local 
          size={90} 
          avatar={avatar} 
          circleBorderWidth={2}
          circleColor={'rgba(41, 255, 41,1)'}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.contentView}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.lastChatContent}>{lastChatContent}</Text>
        </View>
        <View style={styles.tagView}>
          <View style={showBadge ? styles.showBadge : styles.hidenBadge}>
            <Badge value={nonHandleChatCount} containerStyle={ styles.nonHandleChat }/>
          </View>
          <View style={styles.image}>
            { showTag && <Image source={require('./img/ico_chat_flag.png')}/> }
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ChatList
