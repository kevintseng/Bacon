import React, { Component, PropTypes } from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';
import { autorun } from 'mobx';
import { checkEmail } from '../components/Utils';
import FormErrorMsg from '../components/common/FormErrorMsg';

const {width, height} = Dimensions.get('window'); // eslint-disable-line

export default class Welcome extends Component {
  static propTypes = {
    store: PropTypes.func,
    fire: PropTypes.object,
    emailErr: PropTypes.bool || PropTypes.string,
    loginErr: PropTypes.bool || PropTypes.string,
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
      email: '',
      password: '',
      emailErr: false,
      loginErr: false,
      loading: false,
    };
  }

  signin = () => {
    if(this.emailCheck() && this.passwordCheck()) {
      this.setState({
        loading: true
      });
      this.fs.auth.signInWithEmail(this.state.email, this.state.password)
      .then((user) => {
        Reactotron.log('User successfully logged in', user);
        this.store.signedIn(user);
        return Actions.meetcute({type:'reset'});
      })
      .catch((err) => {
        this.setState({
          loginErr: '登入失敗, 請檢查帳號密碼.',
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
      emailErr: '請輸入您的註冊帳號所使用的Email登入.',
    });
    return false;
  }

  passwordCheck = () => {
    if(this.state.password.length < 1) {
      this.setState({
        loginErr: '請輸入密碼.',
      });
      return false;
    }
    return true;
  }

  render() {
    autorun(() => {
      Reactotron.log(this.state);
    });
    return (
      <View style={this.state.size}>
        <FormLabel>帳號 Email</FormLabel>
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
          justifyContent: 'space-between'}}>
            <Button
              title='還沒有帳號? 建立新帳號'
              color='black'
              backgroundColor='transparent'
              onPress={Actions.signup}
            />
            <Button
              title='忘記密碼?'
              color='grey'
              backgroundColor='transparent'
              onPress={Actions.forgot}
            />
        </View>
      </View>
    );
  }
}
