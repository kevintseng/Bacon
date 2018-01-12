import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import { View, ActivityIndicator, InteractionManager } from 'react-native'

import ProfileContainer from './containers/ProfileContainer' 
import AlbumContainer from './containers/AlbumContainer' 
import PreviewContainer from './containers/PreviewContainer' 
import BaconActivityIndicator from '../../../views/BaconActivityIndicator'

const styles = {
  view: {
    flex: 1
  }
}

@inject('SubjectStore') @observer
export default class AboutMeTabScene extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
    this.SubjectStore.startLoading()
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.SubjectStore.finishLoading)
  }


  render() {
    return(
     <View style={styles.view}> 
     { this.SubjectStore.loading ? <BaconActivityIndicator/> :
      <ScrollableTabView
        initialPage = {0}
        tabBarPosition='top'
        renderTabBar={() => <DefaultTabBar />}
        tabBarUnderlineStyle={{ backgroundColor: '#d63768' }}
        tabBarBackgroundColor='white'
        tabBarActiveTextColor='#d63768'
        tabBarInactiveTextColor='#606060'
        //onChangeTab={}
        //ref={ (tabView) => { this.tabView = tabView } }
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