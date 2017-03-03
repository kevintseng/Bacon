import React, { Component } from 'react';
// import { Router, Scene, Route } from 'react-native-mobx';
import { Router, Switch, Scene, Modal, Actions, ActionConst } from 'react-native-router-flux';  // eslint-disable-line
import Firestack from 'react-native-firestack'; // eslint-disable-line
import { observer } from 'mobx-react/native'; // eslint-disable-line
import { autorun } from 'mobx'; // eslint-disable-line
import { Icon } from 'react-native-elements' // eslint-disable-line
import Reactotron from 'reactotron-react-native'; // eslint-disable-line
import ErrorView from './components/ErrorView'; // eslint-disable-line
import MeetCute from './views/MeetCute'; // eslint-disable-line
import Nearby from './views/Nearby'; // eslint-disable-line
import Messages from './views/Messages'; // eslint-disable-line
import LikesYou from './views/LikesYou'; // eslint-disable-line
import Visitors from './views/Visitors'; // eslint-disable-line
import Settings from './views/Settings'; // eslint-disable-line
import Signin from './views/Signin'; // eslint-disable-line
import SessionCheck from './views/SessionCheck'; // eslint-disable-line
import Profile from './views/Profile'; // eslint-disable-line
import Chat from './views/Chat'; // eslint-disable-line
import Favorites from './views/Favorites'; // eslint-disable-line
import { Signup1, Signup2, Signup3, Signup4 } from './views/signup'; // eslint-disable-line
import DrawerPanel from './components/DrawerPanel';
import AppStore from './store/AppStore'; // eslint-disable-line
import Forgot from './views/Forgot'; // eslint-disable-line
import { FirebaseConfig } from './Configs';

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

firestack.configure(FirebaseConfig).then(() => Reactotron.log('Server configured and ready'));
firestack.on('debug', msg => Reactotron.log('Receved server debug message' + msg));


// TODO: Find a way to tie Firestack and mobx store to achieve auto sync
const appstore = new AppStore();

const menuButton = () => (
  <Icon
    name='menu'
    color='#000'
    onPress={() => Actions.refresh({key: 'drawer', open: value => !value }) }
  />
);

@observer
export default class RouterComponent extends Component {
  componentWillMount() {
    firestack.auth.listenForAuth((u) => {
      Reactotron.log('listenForAuth');
      Reactotron.log(u);
    });
  }

  componentWillUnmount() {
    firestack.auth.unlistenForAuth();
  }

  render() {

    return(
      <Router
        fire={firestack}
        store={appstore}
        getSceneStyle={getSceneStyle} >
        <Scene key='modal' component={Modal} >
          <Scene key='root' hideNavBar>
            <Scene key='sessioncheck' component={SessionCheck} />
            <Scene key='signin' component={Signin} />
            <Scene key='forgot' component={Forgot} title='申請重設密碼' hideNavBar={false} />
            <Scene key='signup' hideNavBar>
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
            <Scene key='drawer' component={DrawerPanel} open={false} >
              <Scene key='main' tabs hideNavBar={false}>
                <Scene key='meetcute'
                  component={MeetCute}
                  title='MeetCute'
                  renderLeftButton={menuButton}
                  />
                <Scene key='nearby'
                  component={Nearby}
                  title='Nearby'
                  renderLeftButton={menuButton}
                  />
                <Scene key='favorites'
                  component={Favorites}
                  title='Favorites'
                  renderLeftButton={menuButton} />
                <Scene key='messages'
                  component={Messages}
                  title='Messages'
                  renderLeftButton={menuButton} />
                <Scene key='likesyou'
                  component={LikesYou}
                  title='LikesYou'
                  renderLeftButton={menuButton} />
                <Scene key='visitors'
                  component={Visitors}
                  title='LikesYou'
                  renderLeftButton={menuButton} />
                <Scene key='settings'
                  component={Settings}
                  title='Settings'
                  renderLeftButton={menuButton}
                  />
                <Scene key='profile'
                  component={Profile}
                  title='Profile'
                  renderLeftButton={menuButton}
                  />
              </Scene>
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
