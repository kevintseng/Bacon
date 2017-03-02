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
import { autorun } from 'mobx'; // eslint-disable-line
import { observer } from 'mobx-react/native';

const { width, height } = Dimensions.get('window'); // eslint-disable-line

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
      size: {
        width,
        height
      },
      text: '',
    };
  }

  componentWillMount() {
    // Actions.refresh({ key: 'drawer', open: false });
    Reactotron.debug('Rendering SessionCheck');
    this.getUser();
  }

  getUser = () => {
    let msg = 'getUser: ';
    try {
      AsyncStorage.getItem('@HookupStore:user').then((userData_string) => {
        Reactotron.debug(msg.concat(userData_string));
        let userData = JSON.parse(userData_string);
        if(userData != null) {
          this.store.setUser(userData);
          Actions.drawer();
          // AsyncStorage.getItem('@HookupStore:token').then((token) => {
          //   if(token != null) {
          //     // this.reAuth(token);
          //   } else {
          //     Reactotron.warn('No token found');
          //     Actions.signin();
          //   }
          // })
        } else {
          Reactotron.warn(msg.concat('No session stored.'));
          Actions.signin();
        }
      });
    } catch(error) {
      Reactotron.error(msg.concat('Unable to access data storage: ' + error.message));
    }
  }

  // reAuth = (token) => {
  //   Reactotron.debug('Using token: ' + token);
  //   this.fs.auth.reauthenticateWithCredentialForProvider('Firebase', token, '').then((user) => {
  //     this.store.setUser(user); // user object
  //     Reactotron.debug('this.store.user set');
  //     Reactotron.debug(this.store.user);
  //     AsyncStorage.setItem('@HookupStore:user', JSON.stringify(this.store.user)); // String
  //     Reactotron.debug('HookupStore:user updated: ' + JSON.stringify(this.store.user));
  //     Actions.drawer();
  //   }).catch((err) => {
  //     Reactotron.error(err);
  //     Reactotron.error({'error': err.name, 'rawDescription': err.rawDescription});
  //     Actions.signin();
  //   });
  // }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: width, height: height }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
}
//AJly3UXmTXpoWE3NAzyXcE1MvEd-RXn3u0OqWu1sy2gxS_8BrpOqeOGo5Fq_T5PRy8uOTV8n34azJdZlEXQF6CiWo06li0HKDf2AYx-nXf5hzz5SyZmIgnla7vHvCia7SM7yRiA0za83YzwfNFEZ37Kvoivm7ONaXGVfacQbft43dcAHxPRH5XaFMLH2LoRiXPBzZ-PrsT-7HJBUp6JtJBuc7VmsbuWV_Q
// <TextInput style={{ marginTop: 100, height: 500, width: 250 }} multiline maxLength={300} value={this.state.text} placeholder={this.state.text}/>
