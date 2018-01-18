import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, InteractionManager } from 'react-native'
import { observer, inject, Observer } from 'mobx-react'
import { toJS } from 'mobx'

import { Actions } from 'react-native-router-flux'

import ChatList from '../../../../../views/ChatList/ChatList'

const styles = {
  view: {
    marginTop: 10
  }
}

@inject('ChatStore') @observer
export default class MatchChatTab extends Component {

  constructor(props) {
    super(props)
    this.ChatStore = this.props.ChatStore
  }

  componentWillMount() {
    //console.warn('開始了A')
    //this.ChatStore.setChatMatchRealPrey()
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    //console.warn('解除了A')
  }

  onPress = (chatRoomKey,preyID,nickname,age) => {
    Actions.MatchChatRoom({title: nickname + '，' + age,chatRoomKey: chatRoomKey,preyID: preyID})
  }

  render() {
    return(
      <View style={styles.view}>
        <FlatList
          removeClippedSubviews
          data={ this.ChatStore.chatMatchPrey }
          numColumns={1}
          //extraData={toJS(this.ChatStore.chatMatchPrey)}
          renderItem={({item}) =>
            <Observer>{
              () =>
              <ChatList 
                name={item.name}
                avatar={{uri: item.avatar}}
                onPress={ () => { this.onPress(item.key,item.prey,item.name,item.age) } }
                lastChatContent={item.lastChatContent}
                nonHandleChatCount={item.nonHandleChatCount}
                showBadge={item.nonHandleChatCount > 0}
                showTag={item.showTag}
                online={item.online}
                chatStatus={item.chatStatus}
                //userState={item.userState}
                //userStateColor={item.userStateColor}
                />
              }
            </Observer>
          }
        />
      </View>
    )
  }
}


/*

          <Observer>{
            () => <ChatList 
              name={item.name}
              avatar={{uri: item.avatar}}
              onPress={ () => { this.onPress(item.key,item.prey,item.name,item.age) } }
              lastChatContent={item.lastChatContent}
              nonHandleChatCount={item.nonHandleChatCount}
              showBadge={item.nonHandleChatCount > 0}
              showTag={item.showTag}
              online={item.online}
              userState={item.userState}
              userStateColor={item.userStateColor}
              />
            }
            </Observer>
*/