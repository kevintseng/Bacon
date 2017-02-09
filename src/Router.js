import React, { Component } from 'react';
import { Router, Scene } from 'react-native-mobx';
import Welcome from './containers/Welcome';
import Signup from './containers/Signup';
import Signup2 from './containers/Signup2';
import Signup3 from './containers/Signup3';

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
            initial={true}
            key='signup2'
            component={Signup2}
            title='常在城市'
            onRight={()=>alert("Right button")} rightTitle="下一步"
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
