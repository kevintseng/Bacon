import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import { View, ActivityIndicator, InteractionManager } from 'react-native'

import ProfileContainer from './containers/ProfileContainer' 
import AlbumContainer from './containers/AlbumContainer' 
import PreviewContainer from './containers/PreviewContainer' 


@inject('SubjectStore') @observer
export default class AboutMeTabScene extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
    this.SubjectStore.cleanProfileModal()
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.task)
  }

  componentWillUnmount() {
    //console.warn('解除了')
  }

  task = () => {
    //await this.sleep(260)
    this.SubjectStore.openProfileModal()
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  render(){
    return(
     <View style={{flex: 1}}>
        { this.SubjectStore.profileModal ?
        <View style={{flex: 1,justifyContent: 'center'}}>
          <ActivityIndicator
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              paddingBottom: 110
            }}
            size="large"
            color='#d63768'
          />
        </View> :
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
        <ProfileContainer label='Edit' tabLabel='編輯' />
        <AlbumContainer label='Album' tabLabel='相簿' />
        <PreviewContainer label='Preview' tabLabel='預覽' />
      </ScrollableTabView>
      }
    </View>
    )
  }
}