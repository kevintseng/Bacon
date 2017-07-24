import React from 'react'
import { Dimensions } from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import Visitors from '../Visitors/Visitors'
import GoodImpression from '../GoodImpression/GoodImpression'
import Mate from '../Mate/Mate'
import Collection from '../Collection/Collection'

const { width } = Dimensions.get('window')
const styles = {
  wrapperStyle: {
    width,
    marginTop: 7,
    paddingTop: 52,
  }
}

const FateTab = () => {

  return(
    <ScrollableTabView
      initialPage = {0}
      style={styles.wrapperStyle}
      tabBarPosition='overlayTop'
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
