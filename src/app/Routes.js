import React, { Component } from 'react'
import { Platform, View } from 'react-native'
import { Router, Scene } from 'react-native-router-flux'

// ###############authenticate################ //
// Auth
import SessionCheckScene from './scenes/authenticate/SessionCheckScene'
import WelcomeScene from './scenes/authenticate/WelcomeScene'
import AuthScene from './scenes/authenticate/AuthScene'
// SignIn
import SignInOneScene from './scenes/authenticate/SignIn/SignInOneScene'
// SignUp
import SignUpOneScene from './scenes/authenticate/SignUp/SignUpOneScene'
import SignUpTwoScene from './scenes/authenticate/SignUp/SignUpTwoScene'
import SignUpThreeScene from './scenes/authenticate/SignUp/SignUpThreeScene'
import SignUpFourScene from './scenes/authenticate/SignUp/SignUpFourScene'
// ###############authenticate################ //

// ###############drawer################ //
// Drawer
import DrawerScene from './scenes/drawer/DrawerScene'
// AboutMe
import AboutMeScene from './scenes/drawer/AboutMe/AboutMeScene'
// MeetChance
import MeetChanceWaterFallScene from './scenes/drawer/MeetChance/MeetChanceWaterFallScene'
import MeetChanceCourtScene from './scenes/drawer/MeetChance/MeetChanceCourtScene'
// Fate
import FateTabScene from './scenes/drawer/Fate/FateTabScene'
// Setting
import SettingIndexScene from './scenes/drawer/Setting/SettingIndexScene'
import SettingAboutScene from './scenes/drawer/Setting/SettingAboutScene'
import SettingAccountScene from './scenes/drawer/Setting/SettingAccountScene'
import SettingRemindScene from './scenes/drawer/Setting/SettingRemindScene'
import SettingHideScene from './scenes/drawer/Setting/SettingHideScene'
// ###############drawer################ //

// ###############header components################ //
import BaconTitle from './components/common/header/BaconTitle/BaconTitle'
import BaconMenu from './components/common/header/BaconMenu/BaconMenu'
import BaconArrow from './components/common/header/BaconArrow/BaconArrow'
// ###############header components################ //

const styles = {
  navBar: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
    //backgroundColor:'blue'
  },
  navBarTitle: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    color: '#606060',
    fontWeight: '500',
    //backgroundColor:'green',
  }
}

export default class Routes extends Component {

  getSceneStyle(props, computedProps){
    const style = {
      flex: 1,
      backgroundColor: 'white',
      borderWidth: 0
    }
    if (computedProps.isActive) {
      style.marginTop = computedProps.hideNavBar ? 0 : Platform.OS === 'ios' ? 64 : 54
      style.marginBottom = computedProps.hideTabBar ? 0 : Platform.OS === 'ios' ? 60 : 50
    }
    return style
  }

  baconMenu = () => (<View style={{position: 'absolute',top: Platform.OS === 'ios' ? 4 : 1, left: 5}}><BaconMenu/></View>)

  baconTitle = () => (<View style={{marginTop: Platform.OS === 'ios' ? 35 : 19}}><BaconTitle/></View>)

  baconArrow = () => (<View style={{position: 'absolute',top: Platform.OS === 'ios' ? 4 : 0, left: 5}}><BaconArrow/></View>)

  render() {
    return (
      <Router getSceneStyle={ this.getSceneStyle }>
        <Scene key='root' hideTabBar hideNavBar navigationBarStyle={ styles.navBar } >
          <Scene key='SessionCheck' component={ SessionCheckScene } />
          <Scene key='Welcome' component={ WelcomeScene } /> 
          <Scene key='SignIn' hideTabBar hideNavBar navigationBarStyle={ styles.navBar }>
            <Scene key='SignInOne' hideNavBar={false} renderTitle={ this.baconTitle } renderBackButton={ this.baconArrow } component={ SignInOneScene }/>
          </Scene>
          <Scene key='SignUp' hideTabBar hideNavBar navigationBarStyle={ styles.navBar }>
            <Scene key='SignUpOne'  hideNavBar={false} renderTitle={ this.baconTitle } renderBackButton={ this.baconArrow } component={ SignUpOneScene } />
            <Scene key='SignUpTwo' hideNavBar={false} renderTitle={ this.baconTitle } renderBackButton={ this.baconArrow } component={ SignUpTwoScene } />
            <Scene key='SignUpThree' hideNavBar={false} renderTitle={ this.baconTitle } renderBackButton={ this.baconArrow } component={ SignUpThreeScene } />
            <Scene key='SignUpFour' hideNavBar={false} renderTitle={ this.baconTitle } renderBackButton={ this.baconArrow } component={ SignUpFourScene } />
          </Scene>
          <Scene key='Auth' component={ AuthScene }/>

          <Scene key='Drawer' component={ DrawerScene } open={false}>
            <Scene key='main' hideTabBar >
              <Scene key='AboutMe' component={ AboutMeScene } title='關於我' navigationBarStyle={ styles.navBar } titleStyle={styles.navBarTitle} renderLeftButton={ this.baconMenu }/>
              <Scene key='setting' hideTabBar hideNavBar navigationBarStyle={ styles.navBar } titleStyle={styles.navBarTitle}>
                <Scene key='SettingIndex' title='設定' hideNavBar={false} renderLeftButton={ this.baconMenu } component={ SettingIndexScene } />
                <Scene key='SettingAbout' title='設定' hideNavBar={false} renderBackButton={ this.baconArrow } component={ SettingAboutScene } />
                <Scene key='SettingAccount' title='設定' hideNavBar={false} renderBackButton={ this.baconArrow } component={ SettingAccountScene } />
                <Scene key='SettingRemind' title='設定' hideNavBar={false} renderBackButton={ this.baconArrow } component={ SettingRemindScene } />
                <Scene key='SettingHide' title='設定' hideNavBar={false} renderBackButton={ this.baconArrow } component={ SettingHideScene } />
              </Scene>
              <Scene key='meetchance' hideTabBar hideNavBar navigationBarStyle={ styles.navBar } titleStyle={styles.navBarTitle}>
                <Scene key='MeetChanceWaterFall' title='巧遇' hideNavBar={false} renderLeftButton={ this.baconMenu } component={ MeetChanceWaterFallScene } />
                <Scene key='MeetChanceCourt' title='巧遇' hideNavBar={false} renderBackButton={ this.baconArrow } component={ MeetChanceCourtScene } />
              </Scene>
              <Scene key='FateTab' title='緣分' navigationBarStyle={ styles.navBar } titleStyle={styles.navBarTitle} hideNavBar={false} renderLeftButton={ this.baconMenu } component={ FateTabScene } />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    )
  }
}
