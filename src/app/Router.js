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
import Settings_B from './views/Settings_B'

// menu
import Menu from './components/Menu'

export default class RouterComponent extends Component {

  getSceneStyle(props, computedProps){
    const style = {
      flex: 1,
      backgroundColor: "#fff",
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      shadowRadius: null
    };
    if (computedProps.isActive) {
      style.marginTop = computedProps.hideNavBar ? 0 : 54;
      style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style
  }

  leftButton(){
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
          
          <Scene key='Drawer' component={DrawerScene} open={false}>
            <Scene key='main' hideTabBar >
              <Scene key='settings_B' component={Settings_B} title='Settings' renderLeftButton={ this.leftButton }/>
            </Scene>
          </Scene>

        </Scene>

      </Router>
    )
  }
}
