import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
// authenticate scenes
import SessionCheckScene from './scenes/authenticate/SessionCheckScene'
import WelcomeScene from './scenes/authenticate/WelcomeScene'
import SignInScene from './scenes/authenticate/SignInScene'

import SignUpOneScene from './scenes/authenticate/SignUp/SignUpOneScene'
import SignUpTwoScene from './scenes/authenticate/SignUp/SignUpTwoScene'
import SignUpThreeScene from './scenes/authenticate/SignUp/SignUpThreeScene'
import SignUpFourScene from './scenes/authenticate/SignUp/SignUpFourScene'
import AuthScene from './scenes/authenticate/AuthScene'

// drawer scenes
import DrawerScene from './scenes/drawer/DrawerScene'
// setting scenes
import SettingIndexScene from './scenes/drawer/Setting/SettingIndexScene'
import SettingAccountScene from './scenes/drawer/Setting/SettingAccountScene'

import AboutMeScene from './scenes/AboutMeScene'
//import TestScene from './scenes/TestScene'
// menu style
import Menu from './components/Menu'
import Return from './components/Return/Return'

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

        <Scene key='root' hideTabBar hideNavBar>
          
          <Scene key='SessionCheck' component={ SessionCheckScene } />
          <Scene key='Welcome' component={ WelcomeScene } /> 
          <Scene key='SignIn' component={ SignInScene }/>
          <Scene key='SignUp' hideTabBar hideNavBar>
            <Scene key='SignUpOne' component={ SignUpOneScene } />
            <Scene key='SignUpTwo' component={ SignUpTwoScene } />
            <Scene key='SignUpThree' component={ SignUpThreeScene } />
            <Scene key='SignUpFour' component={ SignUpFourScene } />
          </Scene>
          <Scene key='Auth' component={ AuthScene }/>
          
          <Scene key='Drawer' component={ DrawerScene } open={false}>
            <Scene key='main' hideTabBar >
              <Scene key='AboutMe' component={ AboutMeScene } title='關於我' navigationBarStyle={ styles.navBar } titleStyle={styles.navBarTitle} renderLeftButton={ this.renderLeftButton }/>
              <Scene key='setting'>
                <Scene key='SettingIndex' component={ SettingIndexScene } title='設定' navigationBarStyle={ styles.navBar } titleStyle={styles.navBarTitle} renderLeftButton={ this.renderLeftButton } />
                <Scene key='SettingAccount' component={ SettingAccountScene } title='設定' renderBackButton={ this.renderBackButton } navigationBarStyle={ styles.navBar } titleStyle={styles.navBarTitle} renderLeftButton={ this.renderLeftButton } />

              </Scene>

            </Scene>
          </Scene>

        </Scene>

      </Router>
    )
  }
}
