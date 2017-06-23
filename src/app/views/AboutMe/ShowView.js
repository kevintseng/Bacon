import React from 'react'
//import { Dimensions, PixelRatio } from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
// views
import Profile from './Show/Profile'
import PhotoBrowserExample from './Show/PhotoBrowserExample'
import Report from './Show/Report'

//const { width, height } = Dimensions.get('window');
//const pixelRatio = PixelRatio.get()
const styles = {
  wrapperStyle: {
    marginTop: 7,
    paddingTop: 52
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
      <PhotoBrowserExample tabLabel='個人相簿'/>
      <Report tabLabel='互動分析'/>
    </ScrollableTabView>
  )
}

export default ShowView