import React, { Component } from "react"
import { Router, Scene } from "react-native-router-flux"
// authenticate scenes
import SessionCheckScene from "./scenes/authenticate/SessionCheckScene"
import WelcomeScene from "./scenes/authenticate/WelcomeScene"

import SignIn from "./views/SignIn"
import Step1 from "./views/SignUp/Step1"
import Step2 from "./views/SignUp/Step2"
import Step3Container from "./containers/SignUp/Step3Container"
import Step4 from "./views/SignUp/Step4"
import Auth from "./views/Auth"
//import SignUp from "./views/SignUp"

import Settings_B from "./views/Settings_B"

export default class RouterComponent extends Component {

  render() {
    return (
      <Router>
        <Scene key="root" hideTabBar hideNavBar>

          <Scene key="authenticate" hideTabBar hideNavBar>
            <Scene key="SessionCheck" component={ SessionCheckScene } />
            <Scene key="Welcome" component={ WelcomeScene } /> 
            <Scene key="SignIn" component={ SignIn }/>

            <Scene key="SignUp" hideTabBar hideNavBar>
              <Scene key="Step1" component={ Step1 } />
              <Scene key="Step2" component={ Step2 } />
              <Scene key="Step3" component={ Step3Container } />
              <Scene key="Step4" component={ Step4 } />
            </Scene>

            <Scene key="Auth" component={ Auth }/>

          </Scene>
          
          <Scene key="main" hideTabBar hideNavBar >
            <Scene key="settings_B" component={Settings_B} title="Settings"/>
          </Scene>

        </Scene>
      </Router>
    )
  }
}
