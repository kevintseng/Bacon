import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, InteractionManager } from 'react-native'
import { observer, inject, Observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import ChatList from '../../../../../views/ChatList/ChatList'
import BaconActivityIndicator from '../../../../../views/BaconActivityIndicator'

const styles = {
  view: {
    flex: 1,
    marginTop: 10
  }
}

@inject('ChatStore') @observer
export default class SendChatTab extends Component {

  constructor(props) {
    super(props)
    this.ChatStore = this.props.ChatStore
  }

  onPress = (chatRoomKey,preyID,nickname,age) => {
    Actions.HelloChatRoom({ title: nickname + '，' + age, chatRoomKey: chatRoomKey, preyID: preyID })

  }

  render() {
    return(
      <View style={styles.view}>
        { this.ChatStore.chatSendLoading ? <BaconActivityIndicator/> :
        <FlatList
          removeClippedSubviews
          data={ this.ChatStore.chatSendPrey }
          numColumns={1}
          renderItem={({item}) =>
          <Observer>{
            () =>
            <ChatList 
              name={item.name}
              avatar={{uri: item.avatar}}
              onPress={ () => { this.onPress(item.key,item.prey,item.name,item.age) } }
              lastChatContent={item.lastChatContent}
              nonHandleChatCount={99}
              showBadge={item.showBadge}
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
          }
      </View>
    )
  }
}