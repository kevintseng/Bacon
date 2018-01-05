import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import { ActivityIndicator, View, InteractionManager } from 'react-native'
import { observer, inject } from 'mobx-react'

import VisitorsContainer from '../../../containers/FateTabScene/VisitorsContainer'
import GoodImpressionContainer from '../../../containers/FateTabScene/GoodImpressionContainer'
import MateContainer from '../../../containers/FateTabScene/MateContainer'
import CollectionContainer from '../../../containers/FateTabScene/CollectionContainer'

@inject('firebase','FateStore','SubjectStore') @observer
export default class FateTabScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.FateStore = this.props.FateStore
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount () {
    Actions.refresh({ key: 'Drawer', open: false })
    this.FateStore.cleanModal()
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.task)
  }

  task = async () => {
    await this.fetchVisitors()
    this.FateStore.setModal()
  }

  onChangeTab = (index) => {
    switch(index) {
      case 0:
        this.fetchVisitors()
        break;
      case 1:
         this.fetchGoodImpressions()
        break;
      case 2:
        //console.warn('抓配對')
        break;
      case 3:
        //console.warn('抓收藏')
        break;
      default:
      //
    }
  }

  fetchVisitors = () => {
    let visitors = new Array
    return this.firebase.database().ref('visitorList/' + this.SubjectStore.uid).once('value',child => {
      const usersPromise = Object.keys(child.val()).map(uid => this.firebase.database().ref('users/' + uid).once('value'))
      Promise.all(usersPromise)
      .then(data => {
        visitors = data.map(snap => {
          return {
            key: snap.key,
            nickname: snap.val().nickname,
            avatar: snap.val().avatar,
            birthday: snap.val().birthday,
            time: child.val()[snap.key]
          }
        })
        this.FateStore.setVisitorsPreys(visitors)
      })
    })
  }

  fetchGoodImpressions = () => {
    let goodImpressions = new Array
    return this.firebase.database().ref('goodImpressionList/' + this.SubjectStore.uid).once('value',child => {
      const usersPromise = Object.keys(child.val()).map(uid => this.firebase.database().ref('users/' + uid).once('value'))
      Promise.all(usersPromise)
      .then(data => {
        goodImpressions = data.map(snap => {
          return {
            key: snap.key,
            nickname: snap.val().nickname,
            avatar: snap.val().avatar,
            birthday: snap.val().birthday,
            latitude: snap.val().latitude,
            longitude: snap.val().longitude
          }
        })
        this.FateStore.setGoodImpressionsPreys(goodImpressions)
      })
    })
  }

  render() {
    return(
     <View style={{flex: 1}}>
        { this.FateStore.modal ?
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
        initialPage = { this.props.initialPage || 0 }
        tabBarPosition='top'
        renderTabBar={() => <DefaultTabBar />}
        tabBarUnderlineStyle={{ backgroundColor: '#d63768' }}
        tabBarBackgroundColor='white'
        tabBarActiveTextColor='#d63768'
        tabBarInactiveTextColor='#606060'
        onChangeTab={tab => {
          this.onChangeTab(tab.i)
        }}
        ref={ (tabView) => { this.tabView = tabView } }
        >
        <VisitorsContainer label='Visitors' tabLabel='來訪' />
        <GoodImpressionContainer label='GoodImpression' tabLabel='好感' />
        <MateContainer label='Mate' tabLabel='配對' />
        <CollectionContainer label='Collection' tabLabel='收藏' />
      </ScrollableTabView>
      }
    </View>
    )
  }
}

