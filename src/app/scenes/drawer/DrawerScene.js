import React, { Component } from 'react'
import Drawer from 'react-native-drawer'
import { BackHandler, ToastAndroid, Dimensions } from 'react-native'
import { Actions, DefaultRenderer } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react/native'
import RNExitApp from 'react-native-exit-app'

import Sider from '../../views/Sider/Sider'

const { width } = Dimensions.get('window')

const drawerStyles = {
  drawer: {
    borderRightWidth: 0,
    width,
  },
}

@inject('firebase', 'ControlStore', 'SubjectStore', 'LineStore') @observer
export default class DrawerScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.ControlStore = this.props.ControlStore
    this.SubjectStore = this.props.SubjectStore
    this.LineStore = this.props.LineStore
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      RNExitApp.exitApp()
    }
    this.lastBackPressed = Date.now()
    ToastAndroid.show('再按一次離開程式', ToastAndroid.SHORT)
    return true
  }

  goToAboutMe = () => {
    Actions.AboutMe({type: 'reset'})
  }

  goToMeetChance = () => {
    Actions.MeetChance({type: 'replace'})
  }

  goToMeetCute = () => {
    Actions.MeetCute({type: 'replace'})
  }
  
  goToChat = () => {
    Actions.ChatTab({type: 'replace'})
  }

  goToFate = () => {
    Actions.FateTab({type: 'replace'})
  }

  //goToArticle = () => {
  //  Actions.Article({type: 'replace'})
  //}

  goToSetting = () => {
    Actions.Setting({type: 'replace'})
  }

  render() {
    const state = this.props.navigationState
    const children = state.children

    return (
      <Drawer
        //ref='navigation'
        ref={ref => this.ControlStore.setDrawer(ref)}
        type='overlay'
        styles={ drawerStyles }
        //onOpen={() => Actions.refresh({ key: state.key, open: true })}
        //onClose={() => Actions.refresh({ key: state.key, open: false })}
        open={ state.open }
        useInteractionManager={true}
        content={
          <Sider
            warningTop={ this.ControlStore.signUpDataUploadIndicator }
            warningBottom={ this.ControlStore.avatarUploadIndicator }
            avatar={ this.SubjectStore.avatar }
            displayName={ this.SubjectStore.nickname }
            displayNameOnPress={ this.goToAboutMe }
            meetChanceOnPress={ this.goToMeetChance }
            meetCuteOnPress={ this.goToMeetCute }
            chatOnPress={ this.goToChat }
            fateOnPress={ this.goToFate }
            //articleOnPress={ this.goToArticle }
            settingOnPress={ this.goToSetting }
            //masterOnPress={ this.gotToMster }
            showFateBadge={this.SubjectStore.showFateBadge}
            fateBadgeCount={this.SubjectStore.fateBadgeCount}
          />
        }
        tapToClose
        openDrawerOffset={0.4}
        panCloseMask={0.2}
        negotiatePan
        tweenEasing={'linear'}
        tweenDuration={250}
        //tweenHandler={(ratio) => ({
        // main: { opacity: Math.max(0.54, 1 - ratio) }
        //})}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}
