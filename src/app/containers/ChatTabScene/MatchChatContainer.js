import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, InteractionManager } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import ChatList from '../../views/ChatList/ChatList'

const styles = {
  view: {
    marginTop: 10
  }
}

@inject('ChatStore') @observer
export default class MatchChatContainer extends Component {

  constructor(props) {
    super(props)
    this.ChatStore = this.props.ChatStore
  }

  componentWillMount() {
    this.ChatStore.setChatMatchRealPrey()
  }

  componentDidMount() {
  }

  onPress = (chatRoomKey,preyId,nickname,age) => {
    this.ChatStore.setChatRoomKey(chatRoomKey,preyId)
    this.goToChatRoom(nickname,age)
  }

  goToChatRoom = (nickname,age) => {
    //this.ChatStore.setFrom('match')
    Actions.ChatRoom({title: nickname + '，' + age})
  }

  render() {
    return(
      <View style={styles.view}>
        <FlatList
          removeClippedSubviews
          data={ this.ChatStore.chatMatchPrey }
          numColumns={1}
          renderItem={({item}) =>
            <ChatList 
              name={item.name}
              avatar={item.avatar}
              onPress={ () => { this.onPress(item.key,item.prey,item.name,item.age) } }
              lastChatContent={item.lastChatContent}
              nonHandleChatCount={99}
              showBadge={item.showBadge}
              showTag={item.showTag}
              online={item.online}
              userState={item.userState}
              userStateColor={item.userStateColor}
              />
           }
        />
      </View>
    )
  }
}


/*

        <ChatList
          name={'Dora Li'}
          avatar={{uri: 'http://img.appledaily.com.tw/images/ReNews/20170115/640_86387ec286267a13d6d6d0e82606b39d.jpg'}}
          onPress={ this.onPress }
          lastChatContent={'誰答腔我就罵誰'}
          nonHandleChatCount={99}
          showBadge
          showTag
          online
          userState={'平淡中'}
          userStateColor={'#FFD306'}
        />
        <ChatList
          name={'大笨蛋'}
          avatar={{uri: 'https://cdn2.ettoday.net/images/2322/2322944.jpg'}}
          onPress={ this.onPress }
          lastChatContent={'真的很想很想你'}
          nonHandleChatCount={2}
          showBadge
          showTag
          userState={'忙碌中'}
          userStateColor={'#FF8040'}
        />
*/