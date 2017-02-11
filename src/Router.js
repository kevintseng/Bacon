import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-mobx';
// import { Actions } from 'react-native-router-flux';  // eslint-disable-line
import Welcome from './containers/Welcome';
import Signup from './containers/Signup';
import Signup2 from './containers/Signup2';
import Signup3 from './containers/Signup3';
import MeetCute from './containers/MeetCute';

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
    style.marginTop = computedProps.hideNavBar ? 20 : 58;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

export default class RouterComponent extends Component {
  render() {
    return(
      <Router getSceneStyle={getSceneStyle}>
        <Scene key='root'>
          <Scene
            key='signup2'
            component={Signup2}
            title='常在城市'
            rightTitle='下一步'
            onRight={() => Actions.signup3()}
            hideTabBa />
          <Scene
            key='welcome'
            component={Welcome}
            title='Hookup'
            hideTabBar/>
          <Scene
            key='signup'
            component={Signup}
            title='建立基本資料'
            hideTabBar/>
          <Scene
            key='signup3'
            component={Signup3}
            title='性向喜好'
            hideTabBar/>
          <Scene
            key='meetcute'
            component={MeetCute}
            title='Hookup'
            hideTabBar/>
        </Scene>
      </Router>
    );
  }
}
