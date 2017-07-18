import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FormInput } from 'react-native-elements';

const styles = {
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#606060',
    textAlign: 'center'
  },
  buttonTextSingUp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#606060',
    textAlign: 'center'
  },
  buttonTextSingIn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  }
}

export default class Signin_B extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.fire
    this.state = {
      email: '',
      password: '',
      loginStatus: null
    };
  }

  onEmailChange(email) {
    this.setState({
      email: email.trim()
    })
  }

  onPasswordChange(password) {
    this.setState({
      password: password.trim()
    });
  }

  onPressSingIn = () => {
    this.setState({
      loginStatus: '登入中'
    })
    this.firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      switch(errorCode) {
        case 'auth/wrong-password':
          this.setState({
            loginStatus: '密碼錯誤',
          })
          break
        case 'auth/user-not-found':
          this.setState({
            loginStatus: '無此使用者',
          })
          break
        default:
          this.setState({
            loginStatus: errorMessage,
          })
          break
      } 
      console.log(error)
    })
  }

  render(){
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between',marginTop: 20}}>

      <View style={{marginBottom: 100}}>
       <Image source={require('../../images/ico_titlebar_logo.png')}/>
      </View>

      <View style={{alignItems: 'center', paddingBottom: 15}}>
        <View>
          <Image source={require('../../images/ico_reg_mail.png')}/>
        </View>
        <View style={{paddingBottom: 15}}>
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
        </View>
        <View>
          <Image source={require('../../images/ico_logo_pass.png')}/>
        </View>
        <View>
          <FormInput
            ref='passw'
            placeholder='請輸入密碼'
            secureTextEntry
            maxLength={12}
            value={this.state.password}
            onChangeText={password =>
              this.onPasswordChange(password)}
            />
        </View>
        { this.state.loginStatus && <View><Text style={{color: 'blue'}}>{this.state.loginStatus}</Text></View> }
      </View>

      <View style={{marginBottom: 20}}>
        <TouchableOpacity onPress={this.onPressSingIn}> 
          <Image style={{justifyContent: 'center'}} source={require('../../images/btn_gredient.png')}>
            <Text style={styles.buttonTextSingIn}>登入</Text>
          </Image>
        </TouchableOpacity>
      </View>

      <View>
        <Text onPress={()=>{alert('忘記密碼？申請密碼重設')}}>忘記密碼？申請密碼重設</Text>
      </View>

      <View style={{marginTop: 20}}>
        <Image source={require('../../images/pic_index_wave.png')} />
      </View>

    </View>
  )}
}
/*
 { this.state.emailErr && <View><Text>{this.state.emailErr}</Text></View> }
          {
            this.state.loginErr &&   <View><Text>{this.state.loginErr}</Text></View>
          }
*/
//export default Signin_B
