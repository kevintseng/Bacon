import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
} from 'react-native';
import {FormLabel, FormInput, Button} from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux';

const {width, height} = Dimensions.get('window'); // eslint-disable-line

export default class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      size: {
        width,
        height
      },
      imgLoading: false,
      modalVisible: false
    };
  }

  render() {
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
          onChangeText={email => {
            this.setState({email})
          }}
          onSubmitEditing={() => {
            this.checkEmail
          }}
        />
        <FormLabel>密碼</FormLabel>
        <FormInput
          ref='passw'
          placeholder='請輸入密碼'
          secureTextEntry
          maxLength={12}
          onChangeText={password => {
            this.setState({password})
        }}/>
        <Text>{this.state.email}</Text>
        <Button
          raised
          backgroundColor='#a022ae'
          title={'登入'} />
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
              onPress={() => alert('忘記密碼')}
            />
        </View>
        {/*
          <Modal style={styles.modal} ref={'loadIndicator'} swipeToClose={true} backButtonClose={false} position={"center"}  backdropContent={BContent}>
            <Signup />
          </Modal>
        */}
      </View>
    );
  }
}
