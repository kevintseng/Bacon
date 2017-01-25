import React, { Component } from 'react';
import { Text } from 'react-native';
import { Router, Scene } from 'react-native-mobx';
import Welcome from './containers/Welcome';

export default class RouterComponent extends Component {
  render() {
    return(
      <Welcome />
    );
  }
}

// <Router>
//   <Scene key="root">
//     <Scene
//       key="welcome"
//       component={Welcome}
//       title="Welcome"
//     />
//   </Scene>
// </Router>
