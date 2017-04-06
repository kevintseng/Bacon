import React, { Component } from 'react';
import {
    View,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';
import { observer } from 'mobx-react/native';

const { width, height } = Dimensions.get('window');

@observer
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.db = this.props.localdb;
    this.state = {
      text: '',
    };
  }

  componentWillMount() {
    Reactotron.log('Rendering SessionCheck');
  }

  componentDidMount() {
    Reactotron.log('SessionCheck rendered');
    this.getUser();
  }

  getUser = () => {
    this.db.load({
      key: 'user',
      autoSync: false,
      syncInBackground: false,
    }).then(ret => {
      Reactotron.log('Loading localdb');
      if(ret != null) {
        Reactotron.log('Setting store.user @SessionCheck');
        this.store.setUser(ret);
        Actions.drawer();
      } else {
        Reactotron.log('SessionCheck: Rendering signin');
        Actions.signin();
      }
    }).catch(err => {
      Reactotron.log(err.message);
      switch (err.name) {
        case 'NotFoundError':
          Reactotron.log('SessionCheck: Data not found, rendering signin');
          Actions.signin();
          break;
        case 'ExpiredError':
          Reactotron.log('SessionCheck: Data expired, rendering signin');
          Actions.signin();
          break;
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
