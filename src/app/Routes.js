import React, { Component } from 'react'
import { Platform, View } from 'react-native'
import { Router, Scene, Actions } from 'react-native-router-flux'

// ###############authenticate################ //
import PermissionsScene from './scenes/authenticate/PermissionsScene'
import SessionCheckScene from './scenes/authenticate/SessionCheckScene'
//
import WelcomeScene from './scenes/authenticate/WelcomeScene'
// SignUp
import SignUpOneScene from './scenes/authenticate/SignUpOneScene'
import SignUpTwoScene from './scenes/authenticate/SignUpTwoScene'
import SignUpThreeScene from './scenes/authenticate/SignUpThreeScene'
import SignUpFourScene from './scenes/authenticate/SignUpFourScene'
// signin
import SignInScene from './scenes/authenticate/SignInScene'
// password
import PasswordScene from './scenes/authenticate/PasswordScene'
//
import AuthScene from './scenes/authenticate/AuthScene'
// ###############authenticate################ //

// ###############drawer################ //
// Drawer
import DrawerScene from './scenes/drawer/DrawerScene'
// MeetCute
//import MeetCuteCourtScene from './scenes/drawer/MeetCute/MeetCuteCourtScene'
import MeetCuteConfigScene from './scenes/drawer/MeetCute/MeetCuteConfigScene'
import SwiperScene from './scenes/drawer/Swiper/SwiperScene'
// AboutMe
import AboutMeTabScene from './scenes/drawer/AboutMe/AboutMeTabScene'
import AboutMeEditScene from './scenes/drawer/AboutMe/AboutMeEditScene'
import AboutMeBoardScene from './scenes/drawer/AboutMe/AboutMeBoardScene'
// MeetChance
import MeetChanceWaterFallScene from './scenes/drawer/MeetChance/MeetChanceWaterFallScene'
import MeetChanceConfigScene from './scenes/drawer/MeetChance/MeetChanceConfigScene'
// Fate
import FateTabScene from './scenes/drawer/Fate/FateTabScene'
import FateCourtScene from './scenes/drawer/Fate/FateCourtScene'
// Master
//import MasterTabScene from './scenes/drawer/Master/MasterTabScene'
//import MasterOneScene from './scenes/drawer/Master/MasterOneScene'
// Setting
import SettingIndexScene from './scenes/drawer/Setting/SettingIndexScene'
import SettingAboutScene from './scenes/drawer/Setting/SettingAboutScene'
import SettingAccountScene from './scenes/drawer/Setting/SettingAccountScene'
import SettingRemindScene from './scenes/drawer/Setting/SettingRemindScene'
import SettingHideScene from './scenes/drawer/Setting/SettingHideScene'
//
import LineCollectCourtScene from './scenes/drawer/LineCollect/LineCollectCourtScene'
import LineCollectRoutesScene from './scenes/drawer/LineCollect/LineCollectRoutesScene'
import UpgradeOneScene from './scenes/drawer/Upgrade/UpgradeOneScene'
import BonusOneScene from './scenes/drawer/Bonus/BonusOneScene'
import ChatTabScene from './scenes/drawer/Chat/ChatTabScene'
import ChatRoomScene from './scenes/drawer/Chat/ChatRoomScene'
import MatchChatRoomScene from './scenes/drawer/Chat/MatchChatRoomScene'
import VisitorChatRoomScene from './scenes/drawer/Chat/VisitorChatRoomScene'
import HelloChatRoomScene from './scenes/drawer/Chat/HelloChatRoomScene'
import UseBonusScene from './scenes/drawer/UseBonus/UseBonusScene'
//import ArticleListScene from './scenes/drawer/Article/ArticleListScene'
//import ArticleDetailScene from './scenes/drawer/Article/ArticleDetailScene'
//import TestScene from './scenes/drawer/Test/TestScene'
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

export default class Routes extends Component {

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
    Actions.AboutMeBoard()
  }

  goToPreview = () => {
    alert('預覽')
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

  baconToolChatRoom = () => <View style={styles.baconTool}><BaconTool onPress={this.goToPreview} /></View>

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
                <Scene key="MeetCuteSwiper" title="邂逅" renderBackButton={this.baconMenu} renderLeftButton={this.baconMenu} renderRightButton={this.baconToolMeetCute} component={SwiperScene} />
                <Scene key="MeetCuteConfig" title="邂逅" renderBackButton={this.baconArrow} component={MeetCuteConfigScene} />
              </Scene>
              
              <Scene key="AboutMe" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                <Scene key="AboutMeTab" title="關於我" renderRightButton={this.baconToolAboutMe} renderLeftButton={this.baconMenu}  component={AboutMeTabScene} />
                <Scene key="AboutMeEdit" title="關於我" renderBackButton={this.baconArrow} component={AboutMeEditScene} />
                <Scene key="AboutMeBoard" title="通知" renderBackButton={this.baconArrow} component={AboutMeBoardScene} />
              </Scene>

              <Scene key="Setting" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                <Scene key="SettingIndex" title="設定" renderLeftButton={this.baconMenu} component={SettingIndexScene} />
                <Scene key="SettingAbout" title="設定" renderBackButton={this.baconArrow} component={SettingAboutScene} />
                <Scene key="SettingAccount" title="設定" renderBackButton={this.baconArrow} component={SettingAccountScene} />
                <Scene key="SettingRemind" title="設定" renderBackButton={this.baconArrow} component={SettingRemindScene} />
                <Scene key="SettingHide" title="設定" renderBackButton={this.baconArrow} component={SettingHideScene} />
              </Scene>

              <Scene key="MeetChance" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                <Scene key="MeetChanceWaterFall" title="巧遇" renderLeftButton={this.baconMenu} renderRightButton={this.baconToolMeetChance} component={MeetChanceWaterFallScene} />
                <Scene key="MeetChanceConfig" title="巧遇" renderBackButton={this.baconArrow} component={MeetChanceConfigScene} />
              </Scene>

              <Scene key="LineCollect" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                <Scene key="LineCollectCourt" title="LineCollect" renderBackButton={this.baconArrow} component={LineCollectCourtScene} />
              </Scene>

              <Scene key="ChatTab" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="訊息" renderLeftButton={this.baconMenu} component={ChatTabScene} renderRightButton={this.baconToolChatTab}/>
              <Scene key="ChatRoom" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="訊息" renderBackButton={this.baconArrow} component={ChatRoomScene} renderRightButton={this.baconToolChatRoom}/>
              <Scene key="VisitorChatRoom" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="訊息" renderBackButton={this.baconArrow} component={VisitorChatRoomScene} renderRightButton={this.baconToolChatRoom}/>
              <Scene key="HelloChatRoom" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="訊息" renderBackButton={this.baconArrow} component={HelloChatRoomScene} renderRightButton={this.baconToolChatRoom}/>
              <Scene key="MatchChatRoom" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="訊息" renderBackButton={this.baconArrow} component={MatchChatRoomScene} renderRightButton={this.baconToolChatRoom}/>
              
            </Scene>
          </Scene>


        </Scene>
      </Router>
    )
  }
}

/*

              <Scene key="MeetCute" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                <Scene key="MeetCuteCourt" title="邂逅" renderBackButton={this.baconMenu} renderLeftButton={this.baconMenu} renderRightButton={this.baconToolMeetCute} component={MeetCuteCourtScene} />
                <Scene key="MeetCuteConfig" title="邂逅" renderBackButton={this.baconArrow} component={MeetCuteConfigScene} />
              </Scene>

              <Scene key="Fate" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                <Scene key="FateTab" title="緣分" renderLeftButton={this.baconMenu} component={FateTabScene} />
                <Scene key="FateCourt" title="緣分" renderBackButton={this.baconArrow} component={FateCourtScene} />
              </Scene>

              <Scene key="VisitorChatRoom" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="訊息" renderBackButton={this.baconArrow} component={VisitorChatRoomScene} renderRightButton={this.baconToolChatRoom}/>
              <Scene key="HelloChatRoom" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="訊息" renderBackButton={this.baconArrow} component={HelloChatRoomScene} renderRightButton={this.baconToolChatRoom}/>

              <Scene key="Swiper" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="邂逅" renderBackButton={this.baconMenu} component={SwiperScene} renderRightButton={this.baconToolChatRoom}/>

              <Scene key="Test" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="測試" renderBackButton={this.baconMenu} component={TestScene} renderRightButton={this.baconToolChatRoom}/>

              <Scene key="Line" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="訊息" renderBackButton={this.baconArrow} component={LineScene} />
              

              <Scene key="Article" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                <Scene key="ArticleList" title="專欄" renderLeftButton={this.baconMenu} component={ArticleListScene} />
                <Scene key="ArticleDetail" title="專欄" renderBackButton={this.baconArrow} component={ArticleDetailScene} />
              </Scene>

              <Scene key="Upgrade" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="會員升級" renderBackButton={this.baconArrow} component={UpgradeOneScene} />

              <Scene key="Bonus" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="Q點儲值" renderBackButton={this.baconArrow} component={BonusOneScene} />

              <Scene key="UseBonus" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="使用Q點" renderBackButton={this.baconArrow} component={UseBonusScene} />

              <Scene key="Master" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                <Scene key="MasterTab" title="達人聊天室" renderLeftButton={this.baconMenu} component={MasterTabScene} />
                <Scene key='MasterOne' title="達人簡介" renderBackButton={this.baconArrow} component={MasterOneScene} />
              </Scene>

              <Scene key="MeetCute" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                <Scene key="MeetCuteCourt" title="邂逅" renderBackButton={this.baconMenu} renderLeftButton={this.baconMenu} renderRightButton={this.baconToolMeetCute} component={MeetCuteCourtScene} />
                <Scene key="MeetCuteConfig" title="邂逅" renderBackButton={this.baconArrow} component={MeetCuteConfigScene} />
              </Scene>

              <Scene key="MeetChance" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
                <Scene key="MeetChanceWaterFall" title="巧遇" renderLeftButton={this.baconMenu} renderRightButton={this.baconToolMeetChance} component={MeetChanceWaterFallScene} />
                <Scene key="MeetChanceConfig" title="巧遇" renderBackButton={this.baconArrow} component={MeetChanceConfigScene} />
              </Scene>

              <Scene key="Swiper" hideTabBar navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} title="邂逅" renderBackButton={this.baconMenu} component={SwiperScene} renderRightButton={this.baconToolMeetCute}/>

*/