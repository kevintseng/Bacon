import React, { Component } from 'react';
// import { dev_FirebaseConfig } from './config'
import RouterComponent from './Router';
import Firestack from 'react-native-firestack';

class App extends Component {
  constructor() {
    super();
    // Initialize Firebase
    // const firebaseConfig = dev_FirebaseConfig;
    const configurationOptions = {
      debug: true,
    };
    const firestack = new Firestack(configurationOptions);
  }

  render() {
    return (
      <RouterComponent />
    );
  }
}

export default App;
