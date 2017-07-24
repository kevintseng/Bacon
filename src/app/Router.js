import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
// authenticate scenes
import SessionCheckScene from './scenes/authenticate/SessionCheckScene'
import WelcomeScene from './scenes/authenticate/WelcomeScene'
// SignIn
import SignInOneScene from './scenes/authenticate/SignIn/SignInOneScene'
// SignUp
import SignUpOneScene from './scenes/authenticate/SignUp/SignUpOneScene'
import SignUpTwoScene from './scenes/authenticate/SignUp/SignUpTwoScene'
import SignUpThreeScene from './scenes/authenticate/SignUp/SignUpThreeScene'
import SignUpFourScene from './scenes/authenticate/SignUp/SignUpFourScene'
// Aith
import AuthScene from './scenes/authenticate/AuthScene'
// drawer scenes
import DrawerScene from './scenes/drawer/DrawerScene'
// setting scenes
import SettingIndexScene from './scenes/drawer/Setting/SettingIndexScene'
import SettingAccountScene from './scenes/drawer/Setting/SettingAccountScene'
import SettingHideScene from './scenes/drawer/Setting/SettingHideScene'

import AboutMeScene from './scenes/AboutMeScene'

// header components
import Menu from './components/Menu/Menu'
import Return from './components/Return/Return'
import Title from './components/Title/Title'

const styles = {
  navBar: {
    backgroundColor: '#fff',
    borderBottomColor: 'transparent'
  },
  navBarTitle: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    color: '#606060',
    textAlign: 'center',
    fontWeight: '500'
  }
}

export default class RouterComponent extends Component {

  getSceneStyle(props, computedProps){
    const style = {
      flex: 1,
      backgroundColor: '#fff',
      borderWidth: 0
    }
    if (computedProps.isActive) {
      style.marginTop = computedProps.hideNavBar ? 0 : 54
      style.marginBottom = computedProps.hideTabBar ? 0 : 50
    }
    return style
  }

  renderTitle() {
    return(
      <Title/>
    )
  }

  renderLeftButton() {
    return(
      <Menu/>
    )
  }

  renderBackButton() {
    return(
      <Return/>
    )
  }

  render() {
    return (
      <Router getSceneStyle={ this.getSceneStyle }>

        <Scene key='root' hideTabBar hideNavBar navigationBarStyle={ styles.navBar }>
          
          <Scene key='SessionCheck' component={ SessionCheckScene } />
          <Scene key='Welcome' component={ WelcomeScene } /> 
          <Scene key='SignIn' hideTabBar hideNavBar navigationBarStyle={ styles.navBar }>
            <Scene key='SignInOne' hideNavBar={false} renderTitle={ this.renderTitle } renderBackButton={ this.renderBackButton } component={ SignInOneScene }/>
          </Scene>
          <Scene key='SignUp' hideTabBar hideNavBar navigationBarStyle={ styles.navBar }>
            <Scene key='SignUpOne'  hideNavBar={false} renderTitle={ this.renderTitle } renderBackButton={ this.renderBackButton } component={ SignUpOneScene } />
            <Scene key='SignUpTwo' hideNavBar={false} renderTitle={ this.renderTitle } renderBackButton={ this.renderBackButton } component={ SignUpTwoScene } />
            <Scene key='SignUpThree' hideNavBar={false} renderTitle={ this.renderTitle } renderBackButton={ this.renderBackButton } component={ SignUpThreeScene } />
            <Scene key='SignUpFour' hideNavBar={false} renderTitle={ this.renderTitle } renderBackButton={ this.renderBackButton } component={ SignUpFourScene } />
          </Scene>
          <Scene key='Auth' component={ AuthScene }/>
          
          <Scene key='Drawer' component={ DrawerScene } open={false}>
            <Scene key='main' hideTabBar >
              <Scene key='AboutMe' component={ AboutMeScene } title='關於我' navigationBarStyle={ styles.navBar } titleStyle={styles.navBarTitle} renderLeftButton={ this.renderLeftButton }/>
              
              <Scene key='setting' hideTabBar hideNavBar navigationBarStyle={ styles.navBar } titleStyle={styles.navBarTitle}>
                <Scene key='SettingIndex' title='設定' hideNavBar={false} renderLeftButton={ this.renderLeftButton } component={ SettingIndexScene } />
                <Scene key='SettingAccount' title='設定' hideNavBar={false} renderBackButton={ this.renderBackButton } component={ SettingAccountScene } />
                <Scene key='SettingHide' title='設定' hideNavBar={false} renderBackButton={ this.renderBackButton } component={ SettingHideScene } />
              </Scene>

            </Scene>
          </Scene>

        </Scene>

      </Router>
    )
  }
}
