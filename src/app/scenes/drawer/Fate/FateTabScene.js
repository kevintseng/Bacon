import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

import VisitorsContainer from '../../../containers/FateTab/VisitorsContainer'
import GoodImpressionContainer from '../../../containers/FateTab/GoodImpressionContainer'
import MateContainer from '../../../containers/FateTab/MateContainer'
import CollectionContainer from '../../../containers/FateTab/CollectionContainer'

export default class FateTabScene extends Component {


  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  render() {
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
        <VisitorsContainer label='Visitors' tabLabel='來訪' />
        <GoodImpressionContainer label='GoodImpression' tabLabel='好感' />
        <MateContainer label='Mate' tabLabel='配對' />
        <CollectionContainer label='Collection' tabLabel='收藏' />
      </ScrollableTabView>
    )
  }
}

