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
import { Header } from '../components/common/Header';
import FormErrorMsg from '../components/common/FormErrorMsg';

const {width, height} = Dimensions.get('window'); // eslint-disable-line

export default class Forgot extends Component {
  static propTypes = {
    store: PropTypes.func,
    fire: PropTypes.object,
    emailErr: PropTypes.bool || PropTypes.string,
    email: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.fs = this.props.fire;
    this.state = {
      size: {
        width,
        height
      },
      email: '',
      emailErr: false,
      loading: false,
      sent: false,
    };
  }

  onSubmit = () => {
    if(this.emailCheck()) {
      this.setState({
        loading: true
      });

      this.fs.auth.sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.setState({
          sent: true,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          emailErr: 'err.description',
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
    })
  }

  emailCheck = () => {
    if(checkEmail(this.state.email)){
      return true;
    }
    this.setState({
      emailErr: '輸入格式有誤, 請再確認.',
    });
    return false;
  }

  render() {
    autorun(() => {
      Reactotron.log(this.state);
    });

    const content =
    <View>
      <View style={{ height: 20 }} />
      <FormLabel>請輸入需要重設密碼的 Email </FormLabel>
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
      <View style={{ height: 20 }} />
      <Button
        raised
        icon={ this.state.loading ? {name: 'sync'} : {name: 'chevron-right'}}
        backgroundColor='#03A9F4'
        title={this.state.loading ? '重設密碼信寄送中...' : '送出'}
        onPress={this.onSubmit}
      />
    </View>
    ;

    return (
      <View style={this.state.size}>
        <Header
          headerText='寄送重設密碼信'
          onLeft={() => Actions.pop()}
          leftColor='#007AFF'
        />
        {
          this.state.sent ?
          <Text> 重設密碼信件已寄出. </Text> : content
        }
      </View>
    );
  }
}
