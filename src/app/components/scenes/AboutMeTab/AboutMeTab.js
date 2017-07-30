import React from 'react'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

import Edit from '../../common/aboutme/Edit/Edit'
import Album from '../../common/aboutme/Album/Album'
import Preview from '../../common/aboutme/Preview/Preview'

const AboutMeTab = () => {

  return(
    <ScrollableTabView
      initialPage = {0}
      tabBarPosition='top'
      renderTabBar={() => <ScrollableTabBar />}
      tabBarUnderlineStyle={{ backgroundColor: '#d63768' }}
      tabBarBackgroundColor='white'
      tabBarActiveTextColor='#d63768'
      tabBarInactiveTextColor='#606060'
      //onChangeTab={}
      ref={ (tabView) => { this.tabView = tabView } }
      >
      <Edit label='Edit' tabLabel='編輯' />
      <Album label='Album' tabLabel='相簿' />
      <Preview label='Preview' tabLabel='預覽' />
    </ScrollableTabView>
  )
}

export default AboutMeTab
