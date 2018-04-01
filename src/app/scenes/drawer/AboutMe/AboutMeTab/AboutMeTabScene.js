import React, { Component } from 'react'
import { View, InteractionManager } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'

import BaconActivityIndicator from '../../../../views/BaconActivityIndicator'

import ProfileTab from './tabs/ProfileTab/ProfileTab' 
import AlbumTab from './tabs/AlbumTab/AlbumTab' 
import PreviewTab from './tabs/PreviewTab/PreviewTab' 

const styles = {
  view: {
    flex: 1
  },
  tabBarUnderlineStyle: { 
    backgroundColor: '#d63768' 
  }
}

export default class AboutMeTabScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    /*
    Actions.refresh({
     key: 'Drawer', 
     open: false 
    })
    this.setState({
      loading: true
    })*/
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        loading: false
      })
    })
  }


  render() {
    return(
     <View style={styles.view}> 
     { this.state.loading ? <BaconActivityIndicator/> :
      <ScrollableTabView
        initialPage = {0}
        tabBarPosition='top'
        renderTabBar={() => <DefaultTabBar />}
        tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
        tabBarBackgroundColor='white'
        tabBarActiveTextColor='#d63768'
        tabBarInactiveTextColor='#606060'
        >
        <ProfileTab label='Profile' tabLabel='編輯' />
        <AlbumTab label='Album' tabLabel='相簿' />
        <PreviewTab label='Preview' tabLabel='預覽' />
      </ScrollableTabView>
      }
    </View>
    )
  }
}