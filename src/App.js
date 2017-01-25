import React, { Component } from 'react';
import { Provider } from 'mobx-react/native'
import firebase from 'firebase';
import { dev_FirebaseConfig } from './configs/fbConfig'
import appStore from './store/AppStore'
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
      <Provider store={appStore}>
        <RouterComponent />
      </Provider>
    );
  }
}

export default App;
