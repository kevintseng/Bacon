import React, { Component } from 'react'
import { View,Text, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'

import TaskTab from './tabs/TaskTab'
import BulletinTab from './tabs/BulletinTab'

const styles = {
  text: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    textAlign: 'center', 
    //fontWeight: '500',
    color: '#606060',
    fontSize: 15
  }
}

export default class AboutMeNoticeScene extends Component {

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  render() {
    return(
      <ScrollableTabView
        initialPage = {0}
        tabBarPosition='top'
        renderTabBar={() => <DefaultTabBar />}
        tabBarUnderlineStyle={{ backgroundColor: '#d63768' }}
        tabBarBackgroundColor='white'
        tabBarActiveTextColor='#d63768'
        tabBarInactiveTextColor='#606060'
        //onChangeTab={}
        ref={ (tabView) => { this.tabView = tabView } }
        >
        <TaskTab label='Task' tabLabel='任務' />
        <BulletinTab label='Bulletin' tabLabel='公告' />
      </ScrollableTabView>
    )
  }
}

