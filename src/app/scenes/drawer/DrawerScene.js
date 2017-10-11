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

@inject('firebase', 'ControlStore', 'SubjectStore') @observer
export default class DrawerScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.ControlStore = this.props.ControlStore
    this.SubjectStore = this.props.SubjectStore
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

  goToLine = () => {
    Actions.LineList({type: 'replace'})
  }

  goToConvs = () => {
    Actions.Convs({type: 'replace'})
  }

  goToMeetCute = () => {
    Actions.MeetCute({type: 'replace'})
  }

  goToFate = () => {
    Actions.Fate({type: 'replace'})
  }

  goToArticle = () => {
    Actions.Article({type: 'replace'})
  }

  goToSetting = () => {
    Actions.Setting({type: 'replace'})
  }

  gotToMster = () => {
    Actions.Master({type: 'replace'})
  }

  render() {
    const state = this.props.navigationState
    const children = state.children

    return (
      <Drawer
        ref='navigation'
        type='overlay'
        styles={ drawerStyles }
        onOpen={() => Actions.refresh({ key: state.key, open: true })}
        onClose={() => Actions.refresh({ key: state.key, open: false })}
        open={ state.open }
        content={
          <Sider
            warningTop={ this.ControlStore.signUpDataUploadIndicator }
            warningBottom={ this.ControlStore.avatarUploadIndicator }
            avatar={ this.SubjectStore.avatar }
            displayName={ this.SubjectStore.nickname }
            displayNameOnPress={ this.goToAboutMe }
            meetchanceOnPress={ this.goToMeetChance }
            meetcueOnPress={ this.goToMeetCute }
            messageOnPress={ this.goToLine }
            lineOnPress={ this.goToConvs }
            fateOnPress={ this.goToFate }
            articleOnPress={ this.goToArticle }
            settingOnPress={ this.goToSetting }
            masterOnPress={ this.gotToMster }
          />
        }
        tapToClose
        openDrawerOffset={0.4}
        panCloseMask={0.2}
        negotiatePan
        //tweenHandler={(ratio) => ({
        // main: { opacity: Math.max(0.54, 1 - ratio) }
        //})}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}
