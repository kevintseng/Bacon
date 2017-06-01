import React from 'react';
import { Dimensions } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import { Visitors } from './Fate/Visitors'
import { GoodImpression } from './Fate/GoodImpression'
import { Mate } from './Fate/Mate'
import { Collection } from './Fate/Collection'
import { observer, inject } from "mobx-react/native"

const { width } = Dimensions.get('window');
const styles = {
  wrapperStyle: {
    width,
    marginTop: 7,
    paddingTop: 52,
  }
};

const Fate = inject("ObjectStore")(observer(({ ObjectStore }) => {

  return(
    <ScrollableTabView
      style={styles.wrapperStyle}
      tabBarPosition='overlayTop'
      renderTabBar={() => <DefaultTabBar />}
      tabBarUnderlineStyle={{ backgroundColor: '#2962FF' }}
      tabBarBackgroundColor='white'
      tabBarActiveTextColor='#2962FF'
      tabBarInactiveTextColor='grey'
      onChangeTab={ ({ ref })=> { ObjectStore["fetchPreyListsBy" + ref.props.label]() } }
      ref={ (tabView) => { this.tabView = tabView} }
      >
      <Visitors label='Visitors' tabLabel='來訪' />
      <GoodImpression label='GoodImpression' tabLabel='好感' />
      <Mate label='Mate' tabLabel='配對' />
      <Collection label='Collection' tabLabel='收藏' />
    </ScrollableTabView>
  )
}))

export default Fate