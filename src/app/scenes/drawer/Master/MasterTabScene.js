import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

import MasterContainer from '../../../containers/MasterTabScene/MasterContainer'
import ReservationContainer from '../../../containers/MasterTabScene/ReservationContainer'
import RecordContainer from '../../../containers/MasterTabScene/RecordContainer'

export default class MasterTabScene extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount () {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  render() {
    return(
      <ScrollableTabView
        initialPage = { this.props.initialPage || 0 }
        tabBarPosition='top'
        renderTabBar={() => <ScrollableTabBar />}
        tabBarUnderlineStyle={{ backgroundColor: '#d63768' }}
        tabBarBackgroundColor='white'
        tabBarActiveTextColor='#d63768'
        tabBarInactiveTextColor='#606060'
        //onChangeTab={}
        ref={ (tabView) => { this.tabView = tabView } }
        >
        <MasterContainer label='Master' tabLabel='達人' />
        <ReservationContainer label='Reservation' tabLabel='預約' />
        <RecordContainer label='Record' tabLabel='紀錄' />
      </ScrollableTabView>
    )
  }
}

