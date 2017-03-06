import React, { Component, PropTypes } from 'react';
import {
    View,
    Dimensions,
    AsyncStorage,
    ActivityIndicator,
    TextInput, // eslint-disable-line
} from 'react-native'; // eslint-disable-line
import { Actions } from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';
import { observer } from 'mobx-react/native';

const { width, height } = Dimensions.get('window');

@observer
export default class Welcome extends Component {
  static propTypes = {
    store: PropTypes.object,
    fire: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
    this.state = {
      text: '',
    };
  }

  componentWillMount() {
    Reactotron.debug('Rendering SessionCheck');
    this.getUser();
  }

  getUser = async () => {
    try {
      AsyncStorage.getItem('@HookupStore:user').then((userData_string) => {
        Reactotron.debug('Local storage has no user data');
        let userData = JSON.parse(userData_string);
        if(userData != null) {
          this.store.setUser(userData);
          Actions.drawer();
        } else {
          Reactotron.debug('Rendering signin');
          Actions.signin();
        }
      });
    } catch(error) {
      Reactotron.error('Unable to access local storage: ' + error.message);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: width, height: height }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
}
