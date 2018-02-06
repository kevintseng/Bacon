import React, { Component } from 'react'
import { Platform, View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Router, Scene, Actions } from 'react-native-router-flux'

// ###############authenticate################ //
import PermissionsScene from './scenes/authenticate/PermissionsScene'
import SessionCheckScene from './scenes/authenticate/SessionCheckScene'
// welcome
import WelcomeScene from './scenes/authenticate/WelcomeScene'
// signup
import SignUpOneScene from './scenes/authenticate/SignUpOne/SignUpOneScene'
import SignUpTwoScene from './scenes/authenticate/SignUpTwo/SignUpTwoScene'
import SignUpThreeScene from './scenes/authenticate/SignUpThree/SignUpThreeScene'
import SignUpFourScene from './scenes/authenticate/SignUpFour/SignUpFourScene'
// signin
import SignInScene from './scenes/authenticate/SignIn/SignInScene'
// password
import PasswordScene from './scenes/authenticate/Password/PasswordScene'
// auth
import AuthScene from './scenes/authenticate/AuthScene'
// ###############authenticate################ //

// ##################drawer################### //
// drawer
import DrawerScene from './scenes/drawer/DrawerScene'
// aboutme
import AboutMeTabScene from './scenes/drawer/AboutMe/AboutMeTab/AboutMeTabScene'
import AboutMeEditScene from './scenes/drawer/AboutMe/AboutMeEdit/AboutMeEditScene'
import AboutMeNoticeScene from './scenes/drawer/AboutMe/AboutMeNotice/AboutMeNoticeScene'
// meetcute
import MeetCuteSwiperScene from './scenes/drawer/MeetCute/MeetCuteSwiper/MeetCuteSwiperScene'
import MeetCuteConfigScene from './scenes/drawer/MeetCute/MeetCuteConfig/MeetCuteConfigScene'
// meetchance
import MeetChanceWaterFallScene from './scenes/drawer/MeetChance/MeetChanceWaterFall/MeetChanceWaterFallScene'
import MeetChanceConfigScene from './scenes/drawer/MeetChance/MeetChanceConfig/MeetChanceConfigScene'
// chatroom
import InitChatRoomScene from './scenes/drawer/ChatRoom/InitChatRoomScene'
import HelloChatRoomScene from './scenes/drawer/ChatRoom/HelloChatRoomScene'
import VisitorChatRoomScene from './scenes/drawer/ChatRoom/VisitorChatRoomScene'
import MatchChatRoomScene from './scenes/drawer/ChatRoom/MatchChatRoomScene'
// chatlist
import ChatTabScene from './scenes/drawer/ChatList/ChatTab/ChatTabScene'
// fate
import FateTabScene from './scenes/drawer/Fate/FateTab/FateTabScene'
import FateCourtScene from './scenes/drawer/Fate/FateCourt/FateCourtScene'
// setting
import SettingIndexScene from './scenes/drawer/Setting/SettingIndex/SettingIndexScene'
import SettingEditScene from './scenes/drawer/Setting/SettingEdit/SettingEditScene'
// card
import ChatCardScene from './scenes/drawer/Card/ChatCard/ChatCardScene'
import MatchCardScene from './scenes/drawer/Card/MatchCard/MatchCardScene'
import PreviewCardScene from './scenes/drawer/Card/PreviewCard/PreviewCardScene'
// usebonus
import UseBonusScene from './scenes/drawer/UseBonus/UseBonusScene'
import BuyBonusScene from './scenes/drawer/BuyBonus/BuyBonusScene'
// ###############header components################ //
import BaconTitle from './views/BaconTitle/BaconTitle'
import BaconMenu from './views/BaconMenu/BaconMenu'
import BaconTool from './views/BaconTool/BaconTool'
import BaconArrow from './views/BaconArrow/BaconArrow'
import BaconNotice from './views/BaconNotice'
import BaconPreview from './views/BaconPreview/BaconPreview'
import BaconChatStatus from './views/BaconChatStatus'

const styles = {
  navBar: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  navBarTitle: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    color: '#606060',
    fontSize: 18,
  },
  baconArrow: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 4 : 0,
    left: 5,
  },
  baconTitle: {
    marginTop: Platform.OS === 'ios' ? 35 : 19,
  },
  baconMenu: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 4 : 1,
    left: 5,
  },
  baconTool: {
    position: 'absolute',
    bottom: -1,
    right: 5,
  },
}

@inject('ChatStore') @observer
export default class Routes extends Component {

  constructor(props) {
    super(props)
    this.ChatStore = this.props.ChatStore
  }

  getSceneStyle(props, computedProps) {
    const style = {
      flex: 1,
      backgroundColor: 'white',
      borderWidth: 0,
    }
    if (computedProps.isActive) {
      style.marginTop = computedProps.hideNavBar ? 0 : Platform.OS === 'ios' ? 64 : 54
      style.marginBottom = computedProps.hideTabBar ? 0 : Platform.OS === 'ios' ? 60 : 50
    }
    return style
  }

  goback = () => {
    Actions.pop()
  }

  goToWelcome = () => {
    Actions.Welcome({type: 'reset', direction: 'leftToRight'})
  }

  goToSignUpOne = () => {
    Actions.SignUpOne({type: 'reset', direction: 'leftToRight'})
  }

  goToSignUpTwo = () => {
    Actions.SignUpTwo({type: 'reset', direction: 'leftToRight'})
  }

  goToSignUpThree = () => {
    Actions.SignUpThree({type: 'reset', direction: 'leftToRight'})
  }

  goToMeetCuteConfig = () => {
    Actions.MeetCuteConfig()
  }

  goToMeetChanceConfig = () => {
    Actions.MeetChanceConfig()
  }

  goToNotification = () => {
    Actions.AboutMeNotice()
  }

  goToPreview = () => {
    Actions.PreviewCard({uid: this.ChatStore.preyID })
  }

  baconMenu = () => <View style={styles.baconMenu}><BaconMenu /></View>

  baconTitle = () => <View style={styles.baconTitle}><BaconTitle /></View>

  baconArrow = () => <View style={styles.baconArrow}><BaconArrow onPress={this.goback} /></View>

  baconArrowSignUpOne = () => <View style={styles.baconArrow}><BaconArrow onPress={this.goToWelcome} /></View>

  baconArrowSignUpTwo = () => <View style={styles.baconArrow}><BaconArrow onPress={this.goToSignUpOne} /></View>

  baconArrowSignUpThree = () => <View style={styles.baconArrow}><BaconArrow onPress={this.goToSignUpTwo} /></View>

  baconArrowSignUpFour = () => <View style={styles.baconArrow}><BaconArrow onPress={this.goToSignUpThree} /></View>

  baconArrowSignIn = () => <View style={styles.baconArrow}><BaconArrow onPress={this.goToWelcome} /></View>

  baconToolMeetCute = () => <View style={styles.baconTool}><BaconTool onPress={this.goToMeetCuteConfig} /></View>

  baconToolMeetChance = () => <View style={styles.baconTool}><BaconTool onPress={this.goToMeetChanceConfig} /></View>

  baconToolAboutMe = () => <View style={styles.baconTool}><BaconNotice onPress={this.goToNotification} /></View>

  baconToolChatRoom = () => <View style={styles.baconTool}><BaconPreview onPress={this.goToPreview} /></View>

  baconToolChatTab = () => <View style={styles.baconTool}><BaconChatStatus /></View>

  render() {
    return (
      <Router getSceneStyle={this.getSceneStyle} duration={0}>
        <Scene key="root" hideTabBar hideNavBar navigationBarStyle={styles.navBar} >

          <Scene key="Permissions" component={PermissionsScene} />

          <Scene key="SessionCheck" component={SessionCheckScene} />

          <Scene key="Welcome" component={WelcomeScene} />

          <Scene key="signup" hideTabBar hideNavBar navigationBarStyle={styles.navBar}>
            <Scene key="SignUpOne" hideNavBar={false} renderTitle={this.baconTitle} renderBackButton={this.baconArrowSignUpOne} component={SignUpOneScene} />
            <Scene key="SignUpTwo" hideNavBar={false} renderTitle={this.baconTitle} renderBackButton={this.baconArrowSignUpTwo} component={SignUpTwoScene} />
            <Scene key="SignUpThree" hideNavBar={false} renderTitle={this.baconTitle} renderBackButton={this.baconArrowSignUpThree} component={SignUpThreeScene} />
            <Scene key="SignUpFour" hideNavBar={false} renderTitle={this.baconTitle} renderBackButton={this.baconArrowSignUpFour} component={SignUpFourScene} />
          </Scene>

          <Scene key="signin" hideTabBar hideNavBar navigationBarStyle={styles.navBar}>
            <Scene key="SignIn" hideNavBar={false} renderTitle={this.baconTitle} renderBackButton={this.baconArrowSignIn} component={SignInScene} />
          </Scene>

          <Scene key="password" hideTabBar hideNavBar navigationBarStyle={styles.navBar}>
            <Scene key="Password" hideNavBar={false} renderTitle={this.baconTitle} renderBackButton={this.baconArrowSignIn} component={PasswordScene} />
          </Scene>

          <Scene key="Auth" component={AuthScene} />

          <Scene key="Drawer" component={DrawerScene} open={false}>
            <Scene key="main" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>

              <Scene key="MeetCute" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                <Scene key="MeetCuteSwiper" title="邂逅" renderBackButton={this.baconMenu} renderLeftButton={this.baconMenu} renderRightButton={this.baconToolMeetCute} component={MeetCuteSwiperScene} />
                <Scene key="MeetCuteConfig" title="邂逅" renderBackButton={this.baconArrow} component={MeetCuteConfigScene} />
              </Scene>

              <Scene key="MeetChance" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                <Scene key="MeetChanceWaterFall" title="巧遇" renderBackButton={this.baconMenu} renderLeftButton={this.baconMenu} renderRightButton={this.baconToolMeetChance} component={MeetChanceWaterFallScene} />
                <Scene key="MeetChanceConfig" title="巧遇" renderBackButton={this.baconArrow} component={MeetChanceConfigScene} />
              </Scene>

              <Scene key="AboutMe" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                <Scene key="AboutMeTab" title="關於我" renderRightButton={this.baconToolAboutMe} renderLeftButton={this.baconMenu}  component={AboutMeTabScene} />
                <Scene key="AboutMeEdit" title="關於我" renderBackButton={this.baconArrow} component={AboutMeEditScene} />
                <Scene key="AboutMeNotice" title="通知" renderBackButton={this.baconArrow} component={AboutMeNoticeScene} />
              </Scene>

              <Scene key="Setting" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                <Scene key="SettingIndex" title="設定" renderLeftButton={this.baconMenu} component={SettingIndexScene} />
                <Scene key="SettingEdit" title="設定" renderBackButton={this.baconArrow} component={SettingEditScene} />
              </Scene>

              <Scene key="FateTab" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}  title="緣分" renderLeftButton={this.baconMenu} component={FateTabScene} />
              <Scene key="ChatTab" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="訊息" renderLeftButton={this.baconMenu} component={ChatTabScene} renderRightButton={this.baconToolChatTab}/>

              <Scene key="InitChatRoom" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="訊息" renderBackButton={this.baconArrow} component={InitChatRoomScene} renderRightButton={this.baconToolChatRoom}/>
              <Scene key="VisitorChatRoom" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="訊息" renderBackButton={this.baconArrow} component={VisitorChatRoomScene} renderRightButton={this.baconToolChatRoom}/>
              <Scene key="HelloChatRoom" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="訊息" renderBackButton={this.baconArrow} component={HelloChatRoomScene} renderRightButton={this.baconToolChatRoom}/>
              <Scene key="MatchChatRoom" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="訊息" renderBackButton={this.baconArrow} component={MatchChatRoomScene} renderRightButton={this.baconToolChatRoom}/>

              <Scene key="PreviewCard" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="預覽" renderBackButton={this.baconArrow} component={PreviewCardScene} />
              <Scene key="ChatCard" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="ChatCardScene" renderBackButton={this.baconArrow} component={ChatCardScene} />
              <Scene key="MatchCard" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="MatchCardScene" renderBackButton={this.baconArrow} component={MatchCardScene} />

              <Scene key="UseBonus" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="使用Ｑ點" renderBackButton={this.baconArrow} component={UseBonusScene} />
              <Scene key="BuyBonus" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="Ｑ點儲值" renderBackButton={this.baconArrow} component={BuyBonusScene} />

              
            </Scene>
          </Scene>


        </Scene>
      </Router>
    )
  }
}