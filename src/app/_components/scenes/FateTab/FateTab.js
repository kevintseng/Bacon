import React from 'react'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

import Visitors from '../../common/fate/Visitors/Visitors'
import GoodImpression from '../../common/fate/GoodImpression/GoodImpression'
import Mate from '../../common/fate/Mate/Mate'
import Collection from '../../common/fate/Collection/Collection'

const FateTab = () => {

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
      <Visitors label='Visitors' tabLabel='來訪' />
      <GoodImpression label='GoodImpression' tabLabel='好感' />
      <Mate label='Mate' tabLabel='配對' />
      <Collection label='Collection' tabLabel='收藏' />
    </ScrollableTabView>
  )
}

export default FateTab
