import React, { Component } from "react"
import { Router, Scene } from "react-native-router-flux"
// authenticate scenes
import SessionCheckScene from "./scenes/authenticate/SessionCheckScene"
import WelcomeScene from "./scenes/authenticate/WelcomeScene"
import SignInScene from "./scenes/authenticate/SignInScene"
import SignUpOneScene from "./scenes/authenticate/SignUpOneScene"
import SignUpTwoScene from "./scenes/authenticate/SignUpTwoScene"
import SignUpThreeScene from "./scenes/authenticate/SignUpThreeScene"
import SignUpFourScene from "./scenes/authenticate/SignUpFourScene"
import AuthScene from "./scenes/authenticate/AuthScene"

import Settings_B from "./views/Settings_B"

export default class RouterComponent extends Component {

  render() {
    return (
      <Router>
        <Scene key="root" hideTabBar hideNavBar>

          <Scene key="authenticate" hideTabBar hideNavBar>
            <Scene key="SessionCheck" component={ SessionCheckScene } />
            <Scene key="Welcome" component={ WelcomeScene } /> 
            <Scene key="SignIn" component={ SignInScene }/>
            <Scene key="SignUp" hideTabBar hideNavBar>
              <Scene key="SignUpOne" component={ SignUpOneScene } />
              <Scene key="SignUpTwo" component={ SignUpTwoScene } />
              <Scene key="SignUpThree" component={ SignUpThreeScene } />
              <Scene key="SignUpFour" component={ SignUpFourScene } />
            </Scene>
            <Scene key="Auth" component={ AuthScene }/>
          </Scene>
          
          <Scene key="main" hideTabBar hideNavBar >
            <Scene key="settings_B" component={Settings_B} title="Settings"/>
          </Scene>

        </Scene>
      </Router>
    )
  }
}
