import React from 'react';
import { Dimensions } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import { Visitors } from './Fate/Visitors'
import { GoodImpression } from './Fate/GoodImpression'
import { Mate } from './Fate/Mate'
import { Collection } from './Fate/Collection'

const { width, height } = Dimensions.get('window');
const styles = {
  wrapperStyle: {
    width,
    marginTop: 7,
    paddingTop: 52,
  }
};

const Fate = () => {
  return(
        <ScrollableTabView
          style={styles.wrapperStyle}
          tabBarPosition='overlayTop'
          renderTabBar={() => <DefaultTabBar />}
          tabBarUnderlineStyle={{ backgroundColor: '#2962FF' }}
          tabBarBackgroundColor='white'
          tabBarActiveTextColor='#2962FF'
          tabBarInactiveTextColor='grey'
          ref={(tabView) => { this.tabView = tabView; }}
          >
          <Visitors tabLabel='來訪' />
          <GoodImpression tabLabel='好感' />
          <Mate tabLabel='配對' />
          <Collection tabLabel='收藏' />
        </ScrollableTabView>
  )
}

export { Fate }