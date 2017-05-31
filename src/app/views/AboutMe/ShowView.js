import React from 'react'
import { Dimensions } from 'react-native'
//import { Actions } from 'react-native-router-flux'
//import { observer } from 'mobx-react/native'

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import Profile from './Show/Profile'
//import Gallery from './Show/Gallery'
//import Report from './Show/Report'


const { width } = Dimensions.get('window');
const styles = {
  wrapperStyle: {
    width,
    marginTop: 7,
    paddingTop: 52,
  }
}

const ShowView = () => {
  
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
    <Profile tabLabel='我的檔案'/>
    </ScrollableTabView>
  )
}

export default ShowView

/*
          <Profile
            store={this.store}
            fire={this.firebase}
            storage={this.storage}
            tabLabel='我的檔案'
            />
          <Gallery
            store={this.store}
            fire={this.firebase}
            storage={this.storage}
            tabLabel='個人相簿'
            />
          <Report
            store={this.store}
            fire={this.firebase}
            storage={this.storage}
            tabLabel='互動分析'
            />
            */
