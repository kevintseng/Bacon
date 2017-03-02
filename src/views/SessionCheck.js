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
    Reactotron.log('Rendering SessionCheck');
    this.getUser();
  }

  getUser = async () => {
    let msg = 'getUser: ';
    try {
      AsyncStorage.getItem('@HookupStore:userear').then((userData_string) => {
        this.setState({
          text: userData_string,
        });
        Reactotron.log(msg.concat(userData_string));
        let userData = JSON.parse(userData_string);
        if(userData != null) {
          this.reAuth(userData.user);
          Actions.drawer();
          // return true;
        } else {
          Reactotron.log(msg.concat('No session'));
          Actions.signin();
        }
      });
    } catch(error) {
      Reactotron.log(msg.concat('Error: ' + error.message));
      return false;
    }
    return false;
  }

  reAuth = () => {
    Reactotron.log('Todo: Re-Authenticate user here.')
      // this.fs.auth.signInWithCustomToken( 'AJly3UXmTXpoWE3NAzyXcE1MvEd-RXn3u0OqWu1sy2gxS_8BrpOqeOGo5Fq_T5PRy8uOTV8n34azJdZlEXQF6CiWo06li0HKDf2AYx-nXf5hzz5SyZmIgnla7vHvCia7SM7yRiA0za83YzwfNFEZ37Kvoivm7ONaXGVfacQbft43dcAHxPRH5XaFMLH2LoRiXPBzZ-PrsT-7HJBUp6JtJBuc7VmsbuWV_Q')
      // .then((data) => {
      //   Reactotron.log(data.toString());
      //   try {
      //     // await AsyncStorage.setItem('ReAuthenticated: ', JSON.stringify(data));
      //     // this.store.setUser(data);
      //   } catch (error) {
      //     Reactotron.log(msg.concat(error.message));
      //   }
      // })
      // .catch((err) => {
      //   this.setState({
      //     loginErr: '登入失敗, 請再確認輸入的帳號是否有誤' + err,
      //     loading: false,
      //   });
      //   Reactotron.log({code: err.code, desc: err.description});
      // });

  }

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
