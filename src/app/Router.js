import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
// authenticate scenes
import SessionCheckScene from './scenes/authenticate/SessionCheckScene'
import WelcomeScene from './scenes/authenticate/WelcomeScene'
import SignInScene from './scenes/authenticate/SignInScene'
import SignUpOneScene from './scenes/authenticate/SignUpOneScene'
import SignUpTwoScene from './scenes/authenticate/SignUpTwoScene'
import SignUpThreeScene from './scenes/authenticate/SignUpThreeScene'
import SignUpFourScene from './scenes/authenticate/SignUpFourScene'
import AuthScene from './scenes/authenticate/AuthScene'

// drawer scenes
import DrawerScene from './scenes/drawer/DrawerScene'

import SettingScene from './scenes/SettingScene'
import AboutMeScene from './scenes/AboutMeScene'

// menu style
import Menu from './components/Menu'

const styles = {
  navigationBar: {
    backgroundColor: '#fff',
    borderWidth: 0
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

  renderLeftButton(){
    return(
      <Menu/>
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
              <Scene key='AboutMe' component={ AboutMeScene } title='關於我' navigationBarStyle={ styles.navigationBar } renderLeftButton={ this.renderLeftButton }/>
              <Scene key='Setting' component={ SettingScene } title='設定' navigationBarStyle={ styles.navigationBar } renderLeftButton={ this.renderLeftButton }/>

            </Scene>
          </Scene>

        </Scene>

      </Router>
    )
  }
}
