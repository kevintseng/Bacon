import React, { Component } from 'react';
// import { Router, Scene, Route } from 'react-native-mobx';
import { Router, Route, Scene, Actions } from 'react-native-router-flux';  // eslint-disable-line
import Firestack from 'react-native-firestack';
import { Icon } from 'react-native-elements'
import Reactotron from 'reactotron-react-native'; // eslint-disable-line
import Welcome from './views/Welcome';
import MeetCute from './views/MeetCute';
import Nearby from './views/Nearby';
import Messages from './views/Messages';
import LikesYou from './views/LikesYou';
import Visitors from './views/Visitors';
import Settings from './views/Settings';
import Profile from './views/Profile';
import Chat from './views/Chat';
import Favorites from './views/Favorites';
import { Signup1, Signup2, Signup3, Signup4 } from './views/signup';
import AppStore from './store/AppStore';
import Forgot from './views/Forgot';
import DrawerPanel from './components/DrawerPanel';


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

const firestack = new Firestack();
const appstore = new AppStore();
const menuButton = () => (
  <Icon
    name='menu'
    onPress={() => {
      Actions.refresh({ key: 'drawer', open: value => !value });
    }}
  />
);

export default class RouterComponent extends Component {
  render() {
    return(
      <Router fire={firestack} store={appstore} getSceneStyle={getSceneStyle}>
        <Scene
          key="drawer"
          component={DrawerPanel}
          open={false}
          side={'left'}
        >
          <Scene key='root'>
            <Scene
              key='welcome'
              component={Welcome}
              title='Hookup'
              hideNavBar
              hideTabBar />
            <Scene
              key='forgot'
              component={Forgot}
              title='申請重設密碼'
              hideTabBar
              hideNavBar />
            <Scene
              key='signup'
              hideNavBar
              hideTabBar
            >
              <Scene
                key='signup1'
                component={Signup1} />
              <Scene
                key='signup2'
                component={Signup2} />
              <Scene
                key='signup3'
                component={Signup3} />
              <Scene
                key='signup4'
                component={Signup4} />
            </Scene>
            <Scene
              key='meetcute'
              component={MeetCute}
              title='MeetCute'
              renderLeftButton={menuButton}
              hideTabBar
            />
            <Scene
              key='nearby'
              component={Nearby}
              title='Nearby'
              renderLeftButton={menuButton}
              hideTabBar
            />
            <Scene
              key='profile'
              component={Profile}
              title='Profile'
              renderLeftButton={menuButton}
              hideTabBar
            />
            <Scene
              key='settings'
              component={Settings}
              title='Settings'
              renderLeftButton={menuButton}
              hideTabBar
            />
            <Scene
              key='chat'
              component={Chat}
              title='Chat'
              renderLeftButton={menuButton}
              hideTabBar
            />
            <Scene
              key='favorites'
              component={Favorites}
              title='Favorites'
              renderLeftButton={menuButton}
              hideTabBar
            />
            <Scene
              key='messages'
              component={Messages}
              title='Messages'
              renderLeftButton={menuButton}
              hideTabBar
            />
            <Scene
              key='likesyou'
              component={LikesYou}
              title='LikesYou'
              renderLeftButton={menuButton}
              hideTabBar
            />
            <Scene
              key='visitors'
              component={Visitors}
              title='LikesYou'
              renderLeftButton={menuButton}
              hideTabBar
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
