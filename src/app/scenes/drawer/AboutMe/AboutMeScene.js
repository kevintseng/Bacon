import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

import EditContainer from "../../../containers/AboutMeScene/EditContainer" 
import AlbumContainer from "../../../containers/AboutMeScene/AlbumContainer" 
import PreviewContainer from "../../../containers/AboutMeScene/PreviewContainer" 


@inject("SubjectStore") @observer
export default class AboutMeScene extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  render(){
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
        <EditContainer label='Edit' tabLabel='編輯' />
        <AlbumContainer label='Album' tabLabel='相簿' />
        <PreviewContainer label='Preview' tabLabel='預覽' />
      </ScrollableTabView>
    )
  }
}