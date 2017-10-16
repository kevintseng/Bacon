import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'

import AllContainer from '../../../containers/LineTabScene/AllContainer'
import UnreadContainer from '../../../containers/LineTabScene/UnreadContainer'
import VisitorContainer from '../../../containers/LineTabScene/VisitorContainer'


@inject('firebase','SubjectStore','LineStore') @observer
export default class LineTabScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.LineStore = this.props.LineStore
  }

  componentWillMount () {
    Actions.refresh({ key: 'Drawer', open: false })
    // console.log("ConvList: ", this.LineStore.conversations)
  }

  componentDidMount () {

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
        <AllContainer label='All' tabLabel='所有訊息' />
        <UnreadContainer label='Unread' tabLabel='未讀訊息' />
        <VisitorContainer label='Visitor' tabLabel='來訪訊息' />
      </ScrollableTabView>
    )
  }
}
