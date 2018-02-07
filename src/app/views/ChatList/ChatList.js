import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import { Badge } from 'react-native-elements'
import CircleImage from 'react-native-bacon-circle-image'

//import { BaconBadgeYes, BaconBadgeNo } from '../BaconBadge/BaconBadge'

import Cookie from '../Cookie/Cookie'

const styles = {
  chat: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    //height: 105,
    //borderBottomWidth: 1,
    //borderColor: '#b3b3b3'
  },
  cookie: {
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 10,
    //backgroundColor: 'blue'
  },
  contentView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 30,
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
    color: '#B3B3B3',
    backgroundColor: 'transparent',
    paddingTop: 5,
    fontSize: 13   
  },
  image: {
    paddingTop: 10,
    height: 25,
    width: 38,
    alignItems: 'center',
    //backgroundColor: 'blue'
  },
  nonHandleChat: {
    backgroundColor: 'red',
    height: 17,
    width: 38
  },
  nonHandleChatText: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    backgroundColor: 'transparent',
    fontSize: 11, 
  },
  showBadge: {
    //
  },
  hidenBadge: {
    opacity: 0,
  },
  userState: {
    position: 'absolute',
    right: -13,
    bottom: 4 
  },
  userStateBadge: {
    backgroundColor: 'blue',
    height: 17,
    width: 58    
  },
  userStateBadgeText: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    backgroundColor: 'transparent',
    fontSize: 11,
  }
}

const getUserState = statusCode => {
  switch (statusCode) {
    case 0:
      return ""
    case 1:
      return "放空中"
    case 2:
      return "忙碌中"
    case 3:
      return "低潮中"
    default:
      return ""
  } 
}

const getUserStateColor = statusCode => {
  switch (statusCode) {
    case 0:
      return "transparent"
    case 1:
      return "#FFD306"
    case 2:
      return "#ff7f50"
    case 3:
      return "#4682b4"
    default:
      return "transparent"
  } 
}

const ChatList = ({name, avatar, onPress, online, lastChatContent,nonHandleChatCount,showBadge,showCutLine,userState,userStateColor, chatStatus }) => {

  return(
    <TouchableOpacity style={styles.chat} activeOpacity={1} onPress={ onPress }>
      <View style={styles.cookie}>
        <CircleImage 
          disabled 
          //local 
          radius={40} 
          source={avatar}
          circleBorderWidth={online ? 2 : 0}
          circleColor={'rgba(41, 255, 41,1)'}
        />
        <View style={styles.userState}>
          <Badge value={getUserState(chatStatus)} containerStyle={ [styles.userStateBadge,{ backgroundColor: getUserStateColor(chatStatus) || 'blue'}] } textStyle={styles.userStateBadgeText}/>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.contentView}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.lastChatContent}>{lastChatContent}</Text>
        </View>
        <View style={styles.tagView}>
          <View style={showBadge ? styles.showBadge : styles.hidenBadge}>
            <Badge value={nonHandleChatCount} containerStyle={ styles.nonHandleChat } textStyle={styles.nonHandleChatText}/>
          </View>
          <View style={styles.image}>
            { showCutLine && <Image source={require('./img/ico_chat_flag.png')}/> }
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ChatList
