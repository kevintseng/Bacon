import React, { Component } from 'react';
import { Provider } from 'mobx-react/native'
import firebase from 'firebase';
import { dev_FirebaseConfig } from './config'
import store from './stores'
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
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}

export default App;
