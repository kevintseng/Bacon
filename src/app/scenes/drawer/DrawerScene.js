import React, { Component } from 'react'
import Drawer from 'react-native-drawer'
import { Actions, DefaultRenderer } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react/native'
import { Dimensions } from 'react-native'
import GeoFire from 'geofire'
import Geolocation from  'Geolocation'

import Sider from '../../views/Sider/Sider'

const { width } = Dimensions.get('window')

const drawerStyles = {
  drawer: { 
    borderRightWidth: 0, 
    width
  }
}

@inject('ControlStore','SubjectStore') @observer
export default class DrawerScene extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    this.SubjectStore = this.props.SubjectStore
  }
  
  goToAboutMe() {
    Actions.aboutme({type: 'reset'})
  }

  goToMeetChance() {
    Actions.meetchance({type: 'reset'})
  }

  goToMessage() {
    //Actions.message({type: 'reset'})
  }

  goToMeetCute() {
    Actions.meetcute({type: 'reset'})
  }

  goToFate() {
    Actions.fate({type: 'reset'})
  }

  goToSetting() {
    Actions.setting({type: 'reset'})
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
            messageOnPress={ this.goToMessage }
            fateOnPress={ this.goToFate }
            settingOnPress={ this.goToSetting }
          />
        }
        tapToClose
        openDrawerOffset={0.4}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={(ratio) => ({
         main: { opacity: Math.max(0.54, 1 - ratio) }
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}
