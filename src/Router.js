import React, { Component } from 'react';
// import { Router, Scene, Route } from 'react-native-mobx';
import { Router, Route, Scene, Actions } from 'react-native-router-flux';  // eslint-disable-line
import Welcome from './containers/Welcome';
import { Signup1, Signup2, Signup3 } from './components/signup';
import MeetCute from './containers/MeetCute';
import store from './store/AppStore';

// define this based on the styles/dimensions you use
const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 58;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

export default class RouterComponent extends Component {
  render() {
    return(
      <Router store={store} getSceneStyle={getSceneStyle}>
        <Scene key='root'>
          <Scene
            key='welcome'
            component={Welcome}
            title='Hookup'
            hideTabBar/>
          <Scene
            key='signup'
            hideNavBar
            hideTabBar>
            <Scene
              key='signup1'
              component={Signup1} />
            <Scene
              key='signup2'
              component={Signup2} />
            <Scene
              key='signup3'
              component={Signup3} />
          </Scene>
          <Scene
            key='meetcute'
            component={MeetCute}
            title='Hookup'
            hideTabBar />
        </Scene>
      </Router>
    );
  }
}
