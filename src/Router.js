import React, { Component } from 'react';
import { Router, Scene } from 'react-native-mobx';
import Welcome from './containers/Welcome';
import Signup from './containers/Signup';
import Signup2 from './containers/Signup2';
import Signup3 from './containers/Signup3';

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
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
            key='welcome'
            component={Welcome}
            title='Hookup'
            hideTabBar/>
          <Scene
            key='signup'
            component={Signup}
            title='建立新帳號'
            hideTabBar/>
          <Scene
            key='signup2'
            component={Signup2}
            title='設定顯示名稱'
            hideTabBar/>
          <Scene
            key='signup3'
            component={Signup3}
            title='選擇個人性向'
            hideTabBar/>
        </Scene>
      </Router>
    );
  }
}
