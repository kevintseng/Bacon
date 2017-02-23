import React, { Component, PropTypes } from 'react';
import {
    View,
    Dimensions,
    AsyncStorage,
} from 'react-native';
import { Text, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';
import { autorun } from 'mobx'; // eslint-disable-line
import { observer } from 'mobx-react/native';
import { checkEmail } from '../components/Utils';
import FormErrorMsg from '../components/FormErrorMsg';

const { width, height } = Dimensions.get('window');

@observer
export default class Welcome extends Component {
  static propTypes = {
    store: PropTypes.object,
    fire: PropTypes.object,
    email: PropTypes.string,
    password: PropTypes.string,
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
      email: 'tgpsstar@gmail.com',
      password: '123456',
      emailErr: false,
      loginErr: false,
      loading: false,
    };
  }

  signin = async () => {
    let msg = 'singin: ';
    if(this.emailCheck() && this.passwordCheck()) {
      this.setState({
        loading: true
      });
      this.fs.auth.signInWithEmail(this.state.email, this.state.password)
      .then(async (data) => {
        try {
          await AsyncStorage.setItem('userData', JSON.stringify(data));
          this.store.signIn(data);
          Reactotron.log('AppStore: ' + JSON.stringify(this.store.user));
        } catch (error) {
          Reactotron.log(msg.concat(error.message));
        }
        return Actions.meetcute({type:'reset'});
      })
      .catch((err) => {
        this.setState({
          loginErr: '登入失敗, 請再確認輸入的帳號是否有誤',
          loading: false,
        });
        Reactotron.log({code: err.code, desc: err.description});
      });
    }
  }

  onEmailChange = email => {
    this.setState({
      email: email.trim(),
      emailErr: false,
      loginErr: false,
    })
  }

  onPasswordChange = password => {
    this.setState({
      password: password.trim(),
      loginErr: false,
    });
  }

  emailCheck = () => {
    if(checkEmail(this.state.email)){
      return true;
    }
    this.setState({
      emailErr: '這不是有效的email, 請再確認',
    });
    return false;
  }

  passwordCheck = () => {
    if(this.state.password.length < 1) {
      this.setState({
        loginErr: '請輸入密碼',
      });
      return false;
    }
    return true;
  }

  render() {
    return (
      <View style={[this.state.size, { marginTop: 20 }]}>
        <View>
          <Text h3> 歡迎使用 Hookup </Text>
          <FormLabel>登入 Email</FormLabel>
          <FormInput
            autoFocus={true}
            autoCorrect={false}
            placeholder='sample@email.com'
            returnKeyType={'next'}
            keyboardType={'email-address'}
            value={this.state.email}
            maxLength={60}
            onChangeText={email => this.onEmailChange(email)}
          />

          {
            this.state.emailErr && <FormErrorMsg>{this.state.emailErr}</FormErrorMsg>
          }

          <FormLabel>密碼</FormLabel>
          <FormInput
            ref='passw'
            placeholder='請輸入密碼'
            secureTextEntry
            maxLength={12}
            value={this.state.password}
            onChangeText={password =>
              this.onPasswordChange(password)}
            />
          {
            this.state.loginErr &&   <FormErrorMsg>{this.state.loginErr}</FormErrorMsg>
          }
          <View style={{ height: 10 }} />
          <Button
            raised
            icon={ this.state.loading ? {name: 'sync'} : {name: 'chevron-right'}}
            backgroundColor='#03A9F4'
            title={this.state.loading ? '登入中...' : '登入'}
            onPress={this.signin}
          />
          <View stye={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'}}
          >
            <Button
              title='您還不是會員嗎? 馬上免費加入'
              color='black'
              backgroundColor='transparent'
              onPress={Actions.signup}
            />
            <Button
              title='忘記密碼? 申請密碼重設'
              color='grey'
              backgroundColor='transparent'
              onPress={Actions.forgot}
            />
          </View>
        </View>
      </View>
    );
  }
}
