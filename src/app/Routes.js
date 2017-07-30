import React, { Component } from 'react'
import { Platform, View } from 'react-native'
import { Router, Scene } from 'react-native-router-flux'

// ###############authenticate################ //
//
import SplashScene from './scenes/SplashScene'
//
import WelcomeScene from './scenes/WelcomeScene'
// signin
import SignInScene from './scenes/signin/SignInScene'
// SignUp
import SignUpOneScene from './scenes/signup/SignUpOneScene'
import SignUpTwoScene from './scenes/signup/SignUpTwoScene'
import SignUpThreeScene from './scenes/signup/SignUpThreeScene'
import SignUpFourScene from './scenes/signup/SignUpFourScene'

//import Test from './views/BaconRoutes'
//
//import AuthScene from './scenes/authenticate/AuthScene'
// ###############authenticate################ //

// ###############drawer################ //
// Drawer
//import DrawerScene from './scenes/drawer/DrawerScene'
// MeetCute
//import MeetCuteCourtScene from './scenes/drawer/MeetCute/MeetCuteCourtScene'
// AboutMe
//import AboutMeTabScene from './scenes/drawer/AboutMe/AboutMeTabScene'
//import AboutMeEditScene from './scenes/drawer/AboutMe/AboutMeEditScene'

// MeetChance
//import MeetChanceWaterFallScene from './scenes/drawer/MeetChance/MeetChanceWaterFallScene'
//import MeetChanceCourtScene from './scenes/drawer/MeetChance/MeetChanceCourtScene'
// Fate
//import FateTabScene from './scenes/drawer/Fate/FateTabScene'
// Setting
//import SettingIndexScene from './scenes/drawer/Setting/SettingIndexScene'
//import SettingAboutScene from './scenes/drawer/Setting/SettingAboutScene'
//import SettingAccountScene from './scenes/drawer/Setting/SettingAccountScene'
//import SettingRemindScene from './scenes/drawer/Setting/SettingRemindScene'
//import SettingHideScene from './scenes/drawer/Setting/SettingHideScene'

// import TestScene from './scenes/TestScene'
// ###############drawer################ //

// ###############header components################ //
import BaconTitle from './views/BaconTitle/BaconTitle'
import BaconMenu from './views/BaconMenu/BaconMenu'
import BaconArrow from './views/BaconArrow/BaconArrow'
// ###############header components################ //

const styles = {
  navBar: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
  },
  navBarTitle: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    color: '#606060',
    fontWeight: '500',
  },
}

export default class Routes extends Component {

  getSceneStyle(props, computedProps){
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

  baconMenu = () => (<View style={{position: 'absolute',top: Platform.OS === 'ios' ? 4 : 1, left: 5}}><BaconMenu/></View>)

  baconTitle = () => (<View style={{marginTop: Platform.OS === 'ios' ? 35 : 19}}><BaconTitle/></View>)

  baconArrow = () => (<View style={{position: 'absolute',top: Platform.OS === 'ios' ? 4 : 0, left: 5}}><BaconArrow/></View>)

  render() {
    return (
      <Router getSceneStyle={ this.getSceneStyle }>
        <Scene key='root' hideTabBar hideNavBar navigationBarStyle={ styles.navBar } >

          <Scene key='Splash' component={ SplashScene } />

          <Scene key='Welcome' component={ WelcomeScene } /> 

          <Scene key='signup' hideTabBar hideNavBar navigationBarStyle={ styles.navBar }>
            <Scene key='SignUpOne'  hideNavBar={false} renderTitle={ this.baconTitle } renderBackButton={ this.baconArrow } component={ SignUpOneScene } />
            <Scene key='SignUpTwo' hideNavBar={false} renderTitle={ this.baconTitle } renderBackButton={ this.baconArrow } component={ SignUpTwoScene } />
            <Scene key='SignUpThree' hideNavBar={false} renderTitle={ this.baconTitle } renderBackButton={ this.baconArrow } component={ SignUpThreeScene } />
            <Scene key='SignUpFour' hideNavBar={false} renderTitle={ this.baconTitle } renderBackButton={ this.baconArrow } component={ SignUpFourScene } />
          </Scene>

          <Scene key='signin' hideTabBar hideNavBar navigationBarStyle={ styles.navBar }>
            <Scene key='SignIn' hideNavBar={false} renderTitle={ this.baconTitle } renderBackButton={ this.baconArrow } component={ SignInScene }/>
          </Scene>

          

        </Scene>
      </Router>
    )
  }
}

/*
<Scene key='Auth' component={ AuthScene }/>
          <Scene key='Drawer' component={ DrawerScene } open={false}>
            <Scene key='main' hideTabBar >

              <Scene key='aboutme' hideTabBar navigationBarStyle={ styles.navBar } titleStyle={styles.navBarTitle}>
                <Scene key='AboutMeTab' title='關於我'  renderLeftButton={ this.baconMenu } component={ AboutMeTabScene }/>
                <Scene key='AboutMeEdit' title='關於我' renderBackButton={ this.baconArrow } component={ AboutMeEditScene }/>
              </Scene>

              <Scene key='meetchance' hideTabBar navigationBarStyle={ styles.navBar } titleStyle={styles.navBarTitle}>
                <Scene key='MeetChanceWaterFall' title='巧遇' renderLeftButton={ this.baconMenu } component={ MeetChanceWaterFallScene } />
                <Scene key='MeetChanceCourt' title='巧遇' renderBackButton={ this.baconArrow } component={ MeetChanceCourtScene } />
              </Scene>

              <Scene key='meetcute' hideTabBar navigationBarStyle={ styles.navBar } titleStyle={styles.navBarTitle}>
                <Scene key='MeetCuteCourt' title='邂逅' renderLeftButton={ this.baconMenu } component={ MeetCuteCourtScene } />
              </Scene>

              <Scene key='fate' hideTabBar navigationBarStyle={ styles.navBar } titleStyle={styles.navBarTitle}>
                <Scene key='FateTab' title='緣分' renderLeftButton={ this.baconMenu } component={ FateTabScene } />
              </Scene>

              <Scene key='setting' hideTabBar navigationBarStyle={ styles.navBar } titleStyle={styles.navBarTitle}>
                <Scene key='SettingIndex' title='設定' renderLeftButton={ this.baconMenu } component={ SettingIndexScene } />
                <Scene key='SettingAbout' title='設定' renderBackButton={ this.baconArrow } component={ SettingAboutScene } />
                <Scene key='SettingAccount' title='設定' renderBackButton={ this.baconArrow } component={ SettingAccountScene } />
                <Scene key='SettingRemind' title='設定' renderBackButton={ this.baconArrow } component={ SettingRemindScene } />
                <Scene key='SettingHide' title='設定' renderBackButton={ this.baconArrow } component={ SettingHideScene } />
              </Scene>
              
            </Scene>
          </Scene>
*/
