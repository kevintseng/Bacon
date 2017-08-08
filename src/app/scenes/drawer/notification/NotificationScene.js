import React, { Component } from 'react'
import { View,Text, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

import TaskContainer from '../../../containers/NotificationScene/TaskContainer'
import BulletinContainer from '../../../containers/NotificationScene/BulletinContainer'

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

export default class NotificationScene extends Component {

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    //Actions.refresh({ key: 'Drawer', open: false })
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
        renderTabBar={() => <ScrollableTabBar />}
        tabBarUnderlineStyle={{ backgroundColor: '#d63768' }}
        tabBarBackgroundColor='white'
        tabBarActiveTextColor='#d63768'
        tabBarInactiveTextColor='#606060'
        //onChangeTab={}
        ref={ (tabView) => { this.tabView = tabView } }
        >
        <TaskContainer label='Visitors' tabLabel='任務' />
        <BulletinContainer label='GoodImpression' tabLabel='公告' />
      </ScrollableTabView>
    )
  }
}

