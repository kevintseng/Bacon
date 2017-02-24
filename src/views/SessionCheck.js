import React, { Component, PropTypes } from 'react';
import {
    View,
    Dimensions,
    AsyncStorage,
    ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';
import { autorun } from 'mobx'; // eslint-disable-line
import { observer } from 'mobx-react/native';
import Signin from './Signin';

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
      loading: true,
    };
  }

  componentWillMount() {
    // Actions.refresh({ key: 'drawer', open: false });
    this.getUser();
  }

  getUser = async () => {
    let msg = 'getUser: ';
    try {
      AsyncStorage.getItem('userData').then((userData_string) => {
        Reactotron.log(msg.concat(userData_string));
        let userData = JSON.parse(userData_string);
        if(userData != null) {
          this.store.setUser(userData);
          Actions.main;
          return true;
        } else {
          this.setState({ loading: false });
        }
      });
    } catch(error) {
      this.setState({ loading: false });
      Reactotron.log(msg.concat(error.message));
      return false;
    }
    return false;
  }

  render() {
    return (
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: width, height: height }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
}
