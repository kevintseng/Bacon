import React, { Component } from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import { Text, FormLabel, FormInput, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Header } from '../components';
import { observer } from 'mobx-react/native';
import { FormErrorMsg } from '../components';
import { checkEmail } from '../Utils';

const { width, height } = Dimensions.get('window');

@observer
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.firebase = this.props.fire;
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

  // TODO: Add security measures to saved auth data.
  signin = async () => {
    if(this.emailCheck() && this.passwordCheck()) {
      this.setState({
        loading: true
      });
      await this.firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => {
        console.error(err);
        this.setState({
          loginErr: err.message,
          loading: false,
        });
      }); // end firebase.auth().signInWithEmailAndPassword

      const user = await this.firebase.auth().currentUser;
      if(user) {
        console.log('User has signed in successfully.');
        this.setState({
          loading: false
        });
        Actions.drawer();
      } else {
        console.log('Signing in.....user.');
      }
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
      <View style={[this.state.size, { marginTop: 0 }]}>
      <Header
        onRight={this.handleSubmit}
        rightColor='#007AFF'
        disableRight={this.state.loading}
        disableLeft={this.state.loading}
        onLeft={() => Actions.pop()}
        leftColor='#007AFF'
      />
        <View>
          <FormLabel>登入 Email</FormLabel>
          <FormInput
            autoFocus
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
