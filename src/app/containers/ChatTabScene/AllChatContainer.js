import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, InteractionManager } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import ChatList from '../../views/ChatList/ChatList'

@inject('firebase','FateStore','SubjectStore') @observer
export default class AllChatContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.FateStore = this.props.FateStore
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    //
  }

  componentDidMount() {
  }

  onPress = () => {
    alert('轉到聊天室')
  }

  render() {
    return(
      <View>
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
      </View>
    )
  }
}