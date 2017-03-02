import React, { Component, PropTypes } from 'react';
import {
    View,
    Dimensions,
    Text,
    Image,
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';
import { autorun } from 'mobx'; // eslint-disable-line
import { checkEmail } from '../components/Utils';
import FormErrorMsg from '../components/FormErrorMsg';

const {width, height} = Dimensions.get('window'); // eslint-disable-line

export default class Forgot extends Component {
  static propTypes = {
    store: PropTypes.object,
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

  componentWillMount() {
    Reactotron.debug('Rendering Forgot');
  }

  onSubmit = () => {
    if(this.emailCheck()) {
      this.setState({
        loading: true
      });

      this.fs.auth.sendPasswordResetWithEmail(this.state.email)
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
      emailErr: '這不是有效的email, 請再確認',
    });
    return false;
  }

  render() {
    const sent = (
      <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
        <Image
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'transparent',
            marginRight: 10,
          }}
          source={require('../images/email_sent.png')}
        />
        <Text>重設密碼信已寄出</Text>
        <Button
          style={{ marginTop: 20 }}
          backgroundColor='transparent'
          color='#007AFF'
          title={'回上一頁'}
          onPress={() => Actions.pop()}
        />
      </View>
    );

    const content = (
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
          backgroundColor='#03A9F4'
          title={this.state.loading ? '重設密碼信寄送中...' : '送出'}
          onPress={this.onSubmit}
        />
      </View>
    );

    return (
      <View style={this.state.size}>
        { this.state.sent ? sent: content }
      </View>
    );
  }
}
