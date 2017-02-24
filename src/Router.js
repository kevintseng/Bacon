import React, { Component } from 'react';
// import { Router, Scene, Route } from 'react-native-mobx';
import { Router, Switch, Scene, Modal, Actions, ActionConst } from 'react-native-router-flux';  // eslint-disable-line
import Firestack from 'react-native-firestack';
import { observer } from 'mobx-react/native';
import { autorun } from 'mobx'; // eslint-disable-line
import { Icon } from 'react-native-elements'
import Reactotron from 'reactotron-react-native'; // eslint-disable-line
import DrawerPanel from './components/DrawerPanel';
import ErrorView from './components/ErrorView';
import MeetCute from './views/MeetCute';
import Nearby from './views/Nearby';
import Messages from './views/Messages';
import LikesYou from './views/LikesYou';
import Visitors from './views/Visitors';
import Settings from './views/Settings';
import Signin from './views/Signin';
import Profile from './views/Profile';
import Chat from './views/Chat';
import Favorites from './views/Favorites';
import { Signup1, Signup2, Signup3, Signup4 } from './views/signup';
import AppStore from './store/AppStore';
import Forgot from './views/Forgot';

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

@observer
export default class RouterComponent extends Component {
  render() {
    autorun(() => {
      Reactotron.log('view'.concat(appstore.view));
    });
    return(
      <Router
        fire={firestack}
        store={appstore}
        getSceneStyle={getSceneStyle} >
        <Scene key='modal' component={Modal} >
          <Scene key="root" hideNavBar>
            <Scene key='signin' component={Signin} />
            <Scene key='forgot' schema='modal' component={Forgot} title='申請重設密碼' hideNavBar={false} />
            <Scene key='signup'>
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
            <Scene key="main" tabs={true} type={ActionConst.REPLACE}>
              <Scene key='meetcute'
                component={MeetCute}
                title='MeetCute'
                renderLeftButton={menuButton} />
              <Scene key='nearby'
                component={Nearby}
                title='Nearby'
                renderLeftButton={menuButton} />
            </Scene>
            <Scene key="errorview" component={ErrorView} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

// <Scene key="welcome" component={Welcome} title="Hookup" type='replace' initial />
// <Scene key='forgot' component={Forgot} title='申請重設密碼' />
// <Scene key='signup'>
//   <Scene
//     key='signup1'
//     component={Signup1} />
//   <Scene
//     key='signup2'
//     component={Signup2} />
//   <Scene
//     key='signup3'
//     component={Signup3} />
//   <Scene
//     key='signup4'
//     component={Signup4} />
// </Scene>
// <Scene key="drawer"
//   component={DrawerPanel}
//   open={false}
//   side={'right'} >
//   <Scene key="main" tabs={true} type="reset">
//     <Scene key='meetcute'
//       component={MeetCute}
//       title='MeetCute'
//       renderLeftButton={menuButton} />
//     <Scene key='nearby'
//       component={Nearby}
//       title='Nearby'
//       renderLeftButton={menuButton} />
//     <Scene key='profile'
//       component={Profile}
//       title='Profile'
//       renderLeftButton={menuButton} />
//     <Scene key='settings'
//       component={Settings}
//       title='Settings'
//       renderLeftButton={menuButton} />
//     <Scene key='chat'
//       component={Chat}
//       title='Chat'
//       renderLeftButton={menuButton} />
//     <Scene key='favorites'
//       component={Favorites}
//       title='Favorites'
//       renderLeftButton={menuButton} />
//     <Scene key='messages'
//       component={Messages}
//       title='Messages'
//       renderLeftButton={menuButton} />
//     <Scene key='likesyou'
//       component={LikesYou}
//       title='LikesYou'
//       renderLeftButton={menuButton} />
//     <Scene key='visitors'
//       component={Visitors}
//       title='LikesYou'
//       renderLeftButton={menuButton} />
//   </Scene>
// </Scene>
