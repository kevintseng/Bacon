import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'

import VisitorsContainer from '../../../containers/FateTabScene/VisitorsContainer'
import GoodImpressionContainer from '../../../containers/FateTabScene/GoodImpressionContainer'
import MateContainer from '../../../containers/FateTabScene/MateContainer'
import CollectionContainer from '../../../containers/FateTabScene/CollectionContainer'

export default class FateTabScene extends Component {

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
        <VisitorsContainer label='Visitors' tabLabel='來訪' />
        <GoodImpressionContainer label='GoodImpression' tabLabel='好感' />
        <MateContainer label='Mate' tabLabel='配對' />
        <CollectionContainer label='Collection' tabLabel='收藏' />
      </ScrollableTabView>
    )
  }
}

