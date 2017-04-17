import React, { Component } from 'react';
import {
    View,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { observer } from 'mobx-react/native';

const { width, height } = Dimensions.get('window');

@observer
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.firebase = this.props.fire;
    this.store = this.props.store;
    this.db = this.props.localdb;

  }

  componentWillMount() {
    console.log('Rendering SessionCheck');
    this.getUser();
  }

  componentDidMount() {
    console.log('SessionCheck rendered');
  }

  getUser = () => {
    this.db.load({
      key: 'user',
      autoSync: false,
      syncInBackground: false,
    }).then(ret => {
      console.log('User existed in LocalDB: ');
      console.log(ret);
      if(ret) {
        this.store.setUser(ret);
        Actions.drawer();
      } else {
        console.log('SessionCheck: Rendering signin');
        Actions.signin();
      }
    }).catch(err => {
      console.log(err.message);
      switch (err.name) {
        case 'NotFoundError':
          console.log('SessionCheck: Data not found, rendering signin');
          Actions.signin();
          break;
        case 'ExpiredError':
          console.log('SessionCheck: Data expired, rendering signin');
          Actions.signin();
          break;
        default:
          console.log(err.name);
          Actions.signin();
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width, height }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
}
