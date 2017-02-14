import React, { Component } from 'react';
import firebase from 'firebase';
import { dev_FirebaseConfig } from './config'
import RouterComponent from './Router';

class App extends Component {
  constructor() {
    super();
    // Initialize Firebase
    const firebaseConfig = dev_FirebaseConfig;
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <RouterComponent />
    );
  }
}

export default App;
