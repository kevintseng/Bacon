import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'

import MatchChatContainer from '../../../containers/ChatTabScene/MatchChatContainer'
import VisitorsChatContainer from '../../../containers/ChatTabScene/VisitorsChatContainer'
import SendChatContainer from '../../../containers/ChatTabScene/SendChatContainer'

export default class ChatTabScene extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount () {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  render() {
    return(
      <ScrollableTabView
        initialPage = { this.props.initialPage || 0 }
        tabBarPosition='top'
        renderTabBar={() => <DefaultTabBar />}
        tabBarUnderlineStyle={{ backgroundColor: '#d63768' }}
        tabBarBackgroundColor='white'
        tabBarActiveTextColor='#d63768'
        tabBarInactiveTextColor='#606060'
        //onChangeTab={}
        ref={ (tabView) => { this.tabView = tabView } }
        >
        <MatchChatContainer label='MatchChat' tabLabel='好友訊息' />
        <VisitorsChatContainer label='VisitorsChat' tabLabel='來訪訊息' />
        <SendChatContainer label='SendChat' tabLabel='已發招呼' />
      </ScrollableTabView>
    )
  }
}

