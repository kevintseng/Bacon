import React, {Component, PropTypes} from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  Text,
} from 'react-native';
import {FormLabel, FormInput, Button} from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux';

const {width, height} = Dimensions.get('window'); //eslint-disable-line

export default class Signup2 extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      size: {
        width,
        height: 300
      },
      nickname: '',
      errMsg: false,
      disabled: true,
      placeholder: '請輸入您的大名',
      loading: false,
    };
  }

  updateNickname = (nickname) => {
    this.setState({
      nickname,
      errMsg: false,
      disabled: false,
    });
  }

  checkInputs = () => {
    let tmp = this.state.nickname.trim();
    if(tmp.length == 0) {
      this.setState({
        errMsg: '請輸入您想要使用的的名稱',
        disabled: true,
      })
    } else {
      Actions.signup3({
        email: this.props.email,
        password: this.props.password,
        nickname: this.state.nickname,
      });
    }
  }

  render() {
    return (
      <View style={this.state.size}>
        <Text>{this.props.email}</Text>
        <Text>{this.props.password}</Text>
        <Text>{this.state.nickname}</Text>
        <View style={{ marginBottom: 20 }}>
          <FormLabel>顯示名稱</FormLabel>
          {
            this.state.errMsg &&
            <Text style={{ marginLeft: 20, color: 'red', fontSize: 12 }}>
            {this.state.errMsg}
            </Text>
          }
          <FormInput
            ref='nickname'
            placeholder='請輸入大名'
            maxLength={30}
            onChangeText={this.updateNickname}
          />
        </View>
        <Button
          raised
          backgroundColor='#a022ae'
          disabled={this.state.disabled}
          title={'下一步'}
          onPress={this.checkInputs}
        />
        {
          this.state.loading && <View>
            <ActivityIndicator />
            <Button title={'back'} onPress={() => Actions.pop()}/>
          </View>
        }
      </View>
    );
  }
}
